module.exports = {
  // AWS credentials from IAM.
  // This user must have the following policies:
  // AmazonS3FullAccess, AWSElasticBeanstalkFullAccess
  iam: {
    accessKeyId: '',
    secretAccessKey: '',
  },

  // Elastic Beanstalk region, application and environment names
  elasticBeanstalk: {
    region: '',
    applicationName: '',
    environmentName: '',
  },

  // The S3 bucket to store archived deployments
  s3: {
    bucket: '',
  },
};
