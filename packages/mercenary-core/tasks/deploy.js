// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html
// http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const AWS = require('aws-sdk');
const ora = require('ora');
const docker = require('./docker');

const cwd = process.cwd();

// Get the values from the host project's config file
const config = require(path.join(cwd, 'config.js')).deploy;

// Get the values from the host project's package.json
const packagePath = path.join(cwd, 'package.json');
const packageData = fs.readFileSync(packagePath, { encoding: 'utf8' });
const packageJson = JSON.parse(packageData);

// AWS constants
const accessKeyId = config.aws.iam.accessKeyId;
const secretAccessKey = config.aws.iam.secretAccessKey;
const region = config.aws.elasticBeanstalk.region;
const ebApplicationName = config.aws.elasticBeanstalk.applicationName;
const ebEnvironmentName = config.aws.elasticBeanstalk.environmentName;
const s3Bucket = config.aws.s3.bucket;
const containerPort = 3325;

// File paths
const templatesDir = path.join(__dirname, '../templates');
const dockerFile = path.join(cwd, './Dockerfile');
const dockerIgnore = path.join(cwd, './.dockerignore');
const dockerAwsJsonDest = path.join(cwd, './Dockerrun.aws.json');
const ebExtensionsSrc = path.join(templatesDir, './ebextensions');
const ebExtensionsDest = path.join(cwd, './.ebextensions');
const publicDir = path.join(cwd, './public');

// AWS SDK
AWS.config.region = region;
AWS.config.update({ accessKeyId, secretAccessKey });
const s3 = new AWS.S3();
const elasticbeanstalk = new AWS.ElasticBeanstalk();

/*
Push a new tag to git
 */
function pushGitTag(version) {
  try {
    cp.execSync(`git tag v${version} && git push origin v${version}`, { stdio: 'ignore' });
  } catch (error) {
    // no-op
  }
}

function getCommitHash() {
  let commit = 'no-git';

  try {
    commit = cp.execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    // no-op
  }

  return commit;
}

// The name to use when creating the application bundle to send to Elastic Beanstalk
function getVersionLabel(semver, commitHash) {
  const timestamp = Date.now();

  return `v${semver}__#${commitHash}__t${timestamp}`;
}

// Copy the AWS EB docker config template into the host project
function generateDockerConfig() {
  const dockerAwsJson = {
    AWSEBDockerrunVersion: '1',
    Ports: [{ ContainerPort: `${containerPort}` }],
  };
  fs.writeFileSync(dockerAwsJsonDest, JSON.stringify(dockerAwsJson));
}

// Configure Elastic Beanstalk to use HTTPS only
function generateEBConfig() {
  cp.execSync(`cp -R "${ebExtensionsSrc}" "${ebExtensionsDest}"`);
}

// Create the bundle zip
function createAppBundle(versionLabel) {
  const bundleName = `${versionLabel}.zip`;
  cp.execSync(`zip -r ${bundleName} . -x ".git/*" -x "node_modules/*"`);
  const bundleBits = fs.readFileSync(bundleName);

  return { bundleName, bundleBits };
}

// Upload app bundle zip to S3
async function uploadToS3({ bucket, key, data }) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: bucket,
      Key: key,
      Body: data,
    }, (s3Error, s3Response) => {
      if (s3Error) {
        reject(s3Error);
        return;
      }

      resolve({
        bucket: s3Response.Bucket,
        key: s3Response.Key,
      });
    });
  });
}

// Create a new application version in Elastic Beanstalk
async function createAppVersion({ bucket, key, versionLabel }) {
  return new Promise((resolve, reject) => {
    elasticbeanstalk.createApplicationVersion({
      ApplicationName: ebApplicationName,
      Process: true,
      SourceBundle: {
        S3Bucket: bucket,
        S3Key: key,
      },
      VersionLabel: `${versionLabel}`, // must be a string
    }, (ebError) => {
      if (ebError) {
        reject(ebError);
        return;
      }

      resolve();
    });
  });
}

// Point the Elastic Beanstalk environment to the new version
async function updateEBEnv(versionLabel) {
  return new Promise((resolve, reject) => {
    elasticbeanstalk.updateEnvironment({
      EnvironmentName: ebEnvironmentName,
      VersionLabel: `${versionLabel}`, // must be a string
    }, (deployError) => {
      if (deployError) {
        reject(deployError);
        return;
      }

      resolve();
    });
  });
}

// Send deployment message to Slack
function sendSlackMessage({ semver, commitHash }) {
  const payload = {
    text: `
      A new deployment has been initiated.
      Application: ${ebApplicationName}
      Environment: ${ebEnvironmentName}
      Version: ${semver}
      Commit: ${commitHash}
    `,
  };

  cp.exec(`curl -X POST -H 'Content-type: application/json' \
  --data '${JSON.stringify(payload)}' \
  ${config.slackWebHookUrl}`);
}

// Clean up the workspace
function clean(bundleName) {
  cp.execSync(`rm "${bundleName}"`);
  cp.execSync(`rm "${dockerFile}"`);
  cp.execSync(`rm "${dockerIgnore}"`);
  cp.execSync(`rm "${dockerAwsJsonDest}"`);
  cp.execSync(`rm -rf "${ebExtensionsDest}"`);
  cp.execSync(`rm -rf "${publicDir}"`);
}

module.exports = async function deploy() {
  const spinner = ora().start();

  const semver = packageJson.version;
  const commitHash = getCommitHash();
  const versionLabel = getVersionLabel(semver, commitHash);

  spinner.text = 'Creating Docker files';
  docker();

  spinner.text = 'Setting up AWS Docker configuration file';
  generateDockerConfig();

  spinner.text = 'Creating Elastic Beanstalk configuration files';
  generateEBConfig();

  spinner.text = 'Creating application bundle';
  const { bundleName, bundleBits } = createAppBundle(versionLabel);

  spinner.text = 'Uploading application bundle to S3';
  const { bucket, key } = await uploadToS3({
    bucket: s3Bucket,
    key: bundleName,
    data: bundleBits,
  });

  spinner.text = 'Adding new Elastic Beanstalk application version';
  await createAppVersion({ bucket, key, versionLabel });

  spinner.text = 'Updating ElasticBeanstalk environment';
  await updateEBEnv(versionLabel);

  if (config.slackWebHookUrl) {
    spinner.text = 'Sending Slack notification';
    sendSlackMessage({ semver, commitHash });
  }

  spinner.text = 'Cleaning up workspace';
  clean(bundleName);

  spinner.text = 'Pushing git tags';
  pushGitTag(semver);

  spinner.succeed(`Version ${versionLabel} deployed to ${ebEnvironmentName}`);
};
