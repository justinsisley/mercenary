module.exports = {
  // Webpack-specific configuration
  webpack: {
    // Configured exactly the same as webpack.ProvidePlugin
    globals: {},
  },

  deploy: {
    // AWS settings
    aws: {
      // Credentials from IAM.
      // This user must have the following policies:
      // AmazonS3FullAccess
      // AWSElasticBeanstalkFullAccess
      iam: {
        accessKeyId: '',
        secretAccessKey: '',
      },

      // Elastic Beanstalk application and environment names
      elasticBeanstalk: {
        region: '',
        applicationName: '',
        environmentName: '',
      },

      // S3 bucket to store archived deployments
      s3: {
        bucket: '',
      },
    },

    // An optional Slack webhook URL to post deployment summaries
    slackWebHookUrl: '',

    // Configure access to netdata dashboard
    netdata: {
      username: '',
      password: '',
    },
  },
};
