/* eslint-disable import/no-unresolved */
const ora = require('ora');
const AWS = require('aws-sdk');

const accessKeyId = '';
const secretAccessKey = '';
const region = 'us-east-1';

const securityGroupName = 'HTTP and HTTPS open';

AWS.config.update({ accessKeyId, secretAccessKey, region });
const ec2 = new AWS.EC2();

async function createSecurityGroup() {
  return new Promise((resolve) => {
    ec2.createSecurityGroup({
      Description: securityGroupName,
      GroupName: securityGroupName,
    }, (err, data) => {
      console.log(err);
      console.log(data);

      resolve(data.GroupId);
    });
  });
}

async function authorizeSecurityGroupIngress(groupId) {
  return new Promise((resolve) => {
    ec2.authorizeSecurityGroupIngress({
      GroupId: groupId,
      GroupName: securityGroupName,
      IpPermissions: [
        {
          FromPort: 80,
          ToPort: 80,
        },
        {
          FromPort: 443,
          ToPort: 443,
        },
      ],
    }, (err, data) => {
      console.log(err);
      console.log(data);

      resolve();
    });
  });
}

async function createEBApplication() {
  return Promise.resolve();
}

async function createEBEnvironment() {
  return Promise.resolve();
}

async function createS3Bucket() {
  return Promise.resolve();
}

module.exports = async function deployInit() {
  const spinner = ora().start();

  spinner.text = 'Creating security group';
  const groupId = await createSecurityGroup();

  spinner.text = 'Configuring security group';
  await authorizeSecurityGroupIngress(groupId);

  spinner.text = 'Creating Elastic Beanstalk application';
  await createEBApplication();

  spinner.text = 'Creating Elastic Beanstalk environment';
  await createEBEnvironment();

  spinner.text = 'Creating S3 bucket';
  await createS3Bucket();

  spinner.succeed('AWS deployment configured');
};
