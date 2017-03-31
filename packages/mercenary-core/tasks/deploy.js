// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html
// http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const AWS = require('aws-sdk');
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
const templatesDir = path.join(__dirname, '../docker');
const dockerFile = path.join(cwd, './Dockerfile');
const dockerIgnore = path.join(cwd, './.dockerignore');
const dockerAwsJsonDest = path.join(cwd, './Dockerrun.aws.json');
const ebExtensionsSrc = path.join(templatesDir, './ebextensions');
const ebExtensionsDest = path.join(cwd, './.ebextensions');
const publicDir = path.join(cwd, './public');

/*
Push a new tag to git
 */
function pushGitTag(version) {
  cp.execSync(`git tag v${version} && git push origin v${version}`);
}

module.exports = function deploy() {
  // The name to use when creating the application bundle to send to Elastic Beanstalk
  const timestamp = Date.now();
  const commit = cp.execSync('git rev-parse --short HEAD').toString().trim();
  const semver = packageJson.version;
  const versionLabel = `v${semver}__#${commit}__t${timestamp}`;

  // AWS SDK
  AWS.config.region = region;
  AWS.config.update({ accessKeyId, secretAccessKey });
  const s3 = new AWS.S3();
  const elasticbeanstalk = new AWS.ElasticBeanstalk();

  /*
  Run Invisible Framework's docker task
   */
  console.log('Creating Docker files...');
  docker();

  /*
  Create the AWS docker configuration file
   */
  console.log('Setting up AWS Docker configuration file...');
  const dockerAwsJson = {
    AWSEBDockerrunVersion: '1',
    Ports: [{ ContainerPort: `${containerPort}` }],
  };
  fs.writeFileSync(dockerAwsJsonDest, JSON.stringify(dockerAwsJson));

  /*
  Configure Elastic Beanstalk to use HTTPS only
   */
  console.log('Creating Elastic Beanstalk configuration files...');
  cp.execSync(`cp -R "${ebExtensionsSrc}" "${ebExtensionsDest}"`);

  /*
  Create the bundle zip
   */
  console.log('Creating application bundle...');
  const bundleName = `${versionLabel}.zip`;
  cp.execSync(`zip -r ${bundleName} . -x ".git/*" -x "node_modules/*"`);
  const bundleBits = fs.readFileSync(bundleName);

  /*
  Upload the bundle zip to S3
   */
  console.log('Uploading application bundle to S3...');
  s3.upload({
    Bucket: s3Bucket,
    Key: bundleName,
    Body: bundleBits,
  }, (s3Error, s3Response) => {
    if (s3Error) {
      console.log(s3Error);
      return;
    }

    const bucket = s3Response.Bucket;
    const key = s3Response.Key;

    /*
    Create a new application version in Elastic Beanstalk
     */
    console.log('Adding new Elastic Beanstalk application version...');
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
        console.log(ebError);
        return;
      }

      /*
      Point the Elastic Beanstalk environment to the new version
       */
      console.log('Updating ElasticBeanstalk environment...');
      elasticbeanstalk.updateEnvironment({
        EnvironmentName: ebEnvironmentName,
        VersionLabel: `${versionLabel}`, // must be a string
      }, (deployError) => {
        if (deployError) {
          console.log(deployError);
          return;
        }

        /*
        Success
         */
        console.log(`\nVersion ${versionLabel} deployed to ${ebEnvironmentName}\n`);


        /*
        Push git tag
         */
        pushGitTag(semver);


        /*
        Send message to Slack
         */
        if (!config.slackWebHookUrl) {
          return;
        }

        console.log('\nSending Slack notification...');

        const payload = {
          text: `
            A new deployment has been initiated.
            Application: ${ebApplicationName}
            Environment: ${ebEnvironmentName}
            Version: ${semver}
            Commit: ${commit}
          `,
        };

        cp.exec(`curl -X POST -H 'Content-type: application/json' \
        --data '${JSON.stringify(payload)}' \
        ${config.slackWebHookUrl}`);
      });
    });
  });

  /*
  Clean up the workspace
   */
  cp.execSync(`rm "${bundleName}"`);
  cp.execSync(`rm "${dockerFile}"`);
  cp.execSync(`rm "${dockerIgnore}"`);
  cp.execSync(`rm "${dockerAwsJsonDest}"`);
  cp.execSync(`rm -rf "${ebExtensionsDest}"`);
  cp.execSync(`rm -rf "${publicDir}"`);
};
