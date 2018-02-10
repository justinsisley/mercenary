module.exports = {
  // Webpack configuration
  webpack: {
    // https://webpack.js.org/plugins/provide-plugin/
    ProvidePlugin: {},
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

  // The hostname to use when deployed
  hostname: '',

  // AWS settings
  aws: {
    // Credentials from IAM.
    // This user must have the following policies:
    // AmazonS3FullAccess
    // AWSElasticBeanstalkFullAccess
    // CloudWatchFullAccess
    accessKeyId: '',
    secretAccessKey: '',
    // Used by ElasticBeanstalk, and CloudWatch
    region: '',
    // Used by ElasticBeanstalk and CloudWatch
    applicationName: '',
    // Used by ElasticBeanstalk
    environmentName: '',
    // Used for storing builds
    s3Bucket: '',
  },

  // Settings for automatic release management in Github
  github: {
    owner: '', // repository owner name
    repo: '', // repository name
    token: '', // personal access token (OAUTH)
  },

  // Slack webhook URL to post deployment summaries
  slackWebHookUrl: '',

  // Configure access to netdata dashboard located at /_netdata
  netdata: {
    username: '',
    password: '',
  },

  // Configure access to storybook located at /_storybook
  storybook: {
    username: '',
    password: '',
  },
};
