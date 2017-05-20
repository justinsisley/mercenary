module.exports = {
  // Webpack configuration
  webpack: {
    // Configured exactly the same as webpack.ProvidePlugin
    globals: {},
  },

  // manifest.json configuration
  manifest: {
    name: 'Mercenary App',
    short_name: 'Mercenary',
    description: 'Mercenary App',
    background_color: '#ffffff',
    theme_color: '#ffffff',
  },

  // Redis configuration for rate limiting
  redis: {
    host: null,
    port: null,
  },

  // Deployment configuration
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
