module.exports = {
  domain: process.env.DOMAIN || 'http://localhost:3325',

  mlab: {
    username: process.env.MLAB_USERNAME || 'ajszU3JnXXQ8beLTF83FTqEjDKeEn',
    password: process.env.MLAB_PASSWORD || 'EzcFtfcah2RqHwsYnBkEgwSVqkrZaJTDy',
    server: process.env.MLAB_SERVER || 'ds155820.mlab.com:55820/mercenary-dev',
  },

  jwt: {
    secret: process.env.JWT_SECRET || ':tze~nB%{qx}T,!*e59`5:!Mr,{fr=F])<3',
    expiresIn: process.env.JWT_EXPIRES_IN || '30 days',
  },

  email: {
    fromAddress: process.env.EMAIL_FROM_ADDRESS || 'mailbot@sisley.io',

    ses: {
      accessKeyId: process.env.SES_ACCESS_KEY_ID || 'AKIAI6KSJ4BTYSXK7AOA',
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || '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',
      region: process.env.SES_REGION || 'us-east-1',
    },
  },
};
