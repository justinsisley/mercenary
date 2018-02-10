const utils = require('../utils');

const projectConfig = utils.projectConfig;
const { aws, github, netdata, storybook } = projectConfig;

module.exports = {
  env: process.env.NODE_ENV || 'development',

  expressPort: 3325,
  webpackDevServerPort: 3326,

  webpack: projectConfig.webpack,

  static: projectConfig.static,

  hostname: process.env.APP_HOSTNAME || projectConfig.hostname,

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || aws.accessKeyId,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || aws.secretAccessKey,
    region: process.env.AWS_REGION || aws.region,
    applicationName: process.env.AWS_APP_NAME || aws.applicationName,
    environmentName: process.env.AWS_ENV_NAME || aws.environmentName,
    s3Bucket: process.env.AWS_S3_BUCKET || aws.s3Bucket,
  },

  github: {
    owner: process.env.GITHUB_OWNER || github.owner,
    repo: process.env.GITHUB_REPO || github.repo,
    token: process.env.GITHUB_TOKEN || github.token,
  },

  slackWebHookUrl: process.env.SLACK_WEBHOOK_URL || projectConfig.slackWebHookUrl,

  netdata: {
    username: process.env.NETDATA_USERNAME || netdata.username || utils.randomPassword(),
    password: process.env.NETDATA_PASSWORD || netdata.password || utils.randomPassword(),
  },

  storybook: {
    username: process.env.STORYBOOK_USERNAME || storybook.username || utils.randomPassword(),
    password: process.env.STORYBOOK_PASSWORD || storybook.password || utils.randomPassword(),
  },
};
