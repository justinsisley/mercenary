module.exports = {
  env: 'development',

  server: {
    port: 3325,
    proxyApi: 'https://jsonplaceholder.typicode.com',
  },

  htmlTemplate: {
    title: 'Mercenary',
    description: 'The force multiplier web application stack',
    favicon: '',
  },

  webpack: {
    devServerPort: 3326,
    globals: {},
  },
};
