/* eslint-disable import/no-unresolved */
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html
// http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
const fs = require('fs');
const join = require('path').join;
const execSync = require('child_process').execSync;
const ora = require('ora');
const AWS = require('aws-sdk');
const build = require('./build');
const docker = require('./docker').dockerFiles;

const cwd = process.cwd();

// Get the values from the host project's config file
const config = require(join(cwd, 'config.js'));
const deploy = config.deploy;
const staticPaths = config.static;

// Get the values from the host project's package.json
const packagePath = join(cwd, 'package.json');
const packageData = fs.readFileSync(packagePath, { encoding: 'utf8' });
const packageJson = JSON.parse(packageData);

// AWS constants
const accessKeyId = deploy.aws.iam.accessKeyId;
const secretAccessKey = deploy.aws.iam.secretAccessKey;
const region = deploy.aws.elasticBeanstalk.region;
const ebApplicationName = deploy.aws.elasticBeanstalk.applicationName;
const ebEnvironmentName = deploy.aws.elasticBeanstalk.environmentName;
const s3Bucket = deploy.aws.s3.bucket;
const containerPort = 3325;

// File paths
const publicDir = join(cwd, './public');
const dockerFile = join(cwd, './Dockerfile');
const dockerIgnore = join(cwd, './.dockerignore');
const dockerAwsJsonDest = join(cwd, './Dockerrun.aws.json');
const ebExtensionsDest = join(cwd, './.ebextensions');

// AWS SDK
AWS.config.update({ accessKeyId, secretAccessKey, region });
const s3 = new AWS.S3();
const elasticbeanstalk = new AWS.ElasticBeanstalk();

// Get the short hash of the current git revision
function getCommitHash() {
  let commit = 'no-git';

  try {
    commit = execSync('git rev-parse --short HEAD').toString().trim();
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

// Create the bundle zip
function createAppBundle(versionLabel) {
  const bundleName = `${versionLabel}.zip`;

  execSync(`zip -r ${bundleName} . -x ".git/*" -x "node_modules/*"`);

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

  execSync(`curl --silent -X POST -H 'Content-type: application/json' \
  --data '${JSON.stringify(payload)}' \
  ${deploy.slackWebHookUrl}`);
}

// Clean up the workspace
function clean(bundleName) {
  execSync(`rm "${bundleName}"`);
  execSync(`rm "${dockerFile}"`);
  execSync(`rm "${dockerIgnore}"`);
  execSync(`rm "${dockerAwsJsonDest}"`);
  execSync(`rm -rf "${ebExtensionsDest}"`);
  execSync(`rm -rf "${publicDir}"`);
}

module.exports = async () => {
  const semver = packageJson.version;
  const commitHash = getCommitHash();
  const versionLabel = getVersionLabel(semver, commitHash);

  const spinner = ora().start();

  spinner.text = 'Building client application';
  if (staticPaths && staticPaths.length) {
    await build({
      silent: true,
      static: true,
    });
  } else {
    build({ silent: true });
  }

  spinner.text = 'Creating Docker files';
  docker();

  spinner.text = 'Setting up AWS Docker configuration file';
  generateDockerConfig();

  spinner.text = 'Creating application bundle';
  const { bundleName, bundleBits } = createAppBundle(versionLabel);

  spinner.text = 'Uploading application bundle to S3';
  const { bucket, key } = await uploadToS3({
    bucket: s3Bucket,
    key: bundleName,
    data: bundleBits,
  });

  try {
    spinner.text = 'Adding new Elastic Beanstalk application version';
    await createAppVersion({ bucket, key, versionLabel });

    spinner.text = 'Updating ElasticBeanstalk environment';
    await updateEBEnv(versionLabel);
  } catch (error) {
    spinner.text = 'Cleaning up workspace';
    clean(bundleName);

    spinner.fail(`Failed to deploy version ${versionLabel}`);
    console.log('');
    console.log(error.message);
    console.log('');

    return;
  }

  if (deploy.slackWebHookUrl) {
    spinner.text = 'Sending Slack notification';
    sendSlackMessage({ semver, commitHash });
  }

  spinner.text = 'Cleaning up workspace';
  clean(bundleName);

  spinner.succeed(`Version ${versionLabel} deployed to ${ebApplicationName} / ${ebEnvironmentName}`);
  console.log('');
};
