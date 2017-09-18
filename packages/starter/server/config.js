module.exports = {
  domain: process.env.DOMAIN || 'http://localhost:3325',

  mlab: {
    username: process.env.MLAB_USERNAME || 'MLAB_DB_USERNAME',
    password: process.env.MLAB_PASSWORD || 'MLAB_DB_PASSWORD',
    server: process.env.MLAB_SERVER || 'ds######.mlab.com:#####/db-name',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'CHANGE_THIS_SECRET',
    expiresIn: process.env.JWT_EXPIRES_IN || '30 days',
  },

  email: {
    fromAddress: process.env.EMAIL_FROM_ADDRESS || 'mercenary <noreply@domain.tld>',

    ses: {
      accessKeyId: process.env.SES_ACCESS_KEY_ID || 'AWS_SES_ACCESS_KEY_ID',
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || 'AWS_SES_SECRET_ACCESS_KEY',
      region: process.env.SES_REGION || 'AWS_REGION',
    },
  },
};
