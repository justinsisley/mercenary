const router = require('express').Router;
const exampleRouter = require('./example');

// Create a new router
const rootRouter = router();

// Handle the /example path
rootRouter.get('/example', exampleRouter);

module.exports = rootRouter;
