module.exports = {
  domain: process.env.DOMAIN || 'http://localhost:3325',

  mlab: {
    username: process.env.MLAB_USERNAME || 'ajszU3JnXXQ8beLTF83FTqEjDKeEn',
    password: process.env.MLAB_PASSWORD || 'EzcFtfcah2RqHwsYnBkEgwSVqkrZaJTDy',
    server: process.env.MLAB_SERVER || 'ds155820.mlab.com:55820/mercenary-dev',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'CHANGE_THIS_VALUE',
    expiresIn: process.env.JWT_EXPIRES_IN || '30 days',
  },

  mail: {
    fromAddress: process.env.MAIL_FROM_ADDRESS || 'mailbot@sisley.io',

    ses: {
      accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || '',
      region: process.env.SES_REGION || '',
    },
  },
};
