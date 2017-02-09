module.exports = {
  // AWS credentials from IAM.
  // This user should have the following policies:
  // AmazonS3FullAccess, AWSElasticBeanstalkFullAccess
  accessKeyId: '',
  secretAccessKey: '',

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

  // The port the Docker container will expose
  containerPort: '3325',
};
