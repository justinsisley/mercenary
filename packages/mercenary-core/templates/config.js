module.exports = {
  env: 'development',

  server: {
    port: 3325,
    proxyApi: 'https://jsonplaceholder.typicode.com',
  },

  webpack: {
    devServerPort: 3326,
    globals: {},
  },
};
