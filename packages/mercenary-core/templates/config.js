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

  // Paths to be rendered as static HTML.
  // These must be non-authenticated paths.
  static: [
    '/',
    '/features',
    '/login',
    '/pricing',
    '/privacy',
    '/signup',
  ],

  // Deployment configuration
  deploy: {
    // The hostname to use when deployed
    hostname: '',

    // Settings for the www subdomain
    www: {
      force: true,
      strip: false,
    },

    // Configure Loggly for production server logs
    loggly: {
      token: '',
      subdomain: '',
    },

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
