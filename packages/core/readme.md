# Mercenary

### Unit Tests

Mercenary has support for Mocha, Chai, and Istanbul baked in, and it will find all files named __unit.js__ and execute them.

Let's create a sample test. Using your terminal, create a test file: `touch client/unit.js`.

Using your editor, open __client/unit.js__ and add the following code:

```javascript
describe('test', () => {
  it('passes', () => {
    assert.isTrue(true);
  });

  it('fails', () => {
    assert.isTrue(false);
  });
});

```

Save __client/unit.js__, then go back to your terminal and run: `npm test`. You should see the output of the test results. A __coverage__ directory will also be created, with test coverage reporting provided by Istanbul.

> Notice that you didn't need to import `describe`, `it`, or `assert`. Mocha's `describe` and `it`, and Chai's `assert` methods are globally available in all of your tests.

Congratulations. You've created your first unit test without having to worry about any configuration or complex setup.

### End-to-end Tests

Mercenary has support for running end-to-end tests using Puppeteer and Mocha. It will find all files named __e2e.js__ and execute them.

Let's create a sample end-to-end test. Using your terminal, create a test file: `touch client/e2e.js`.

Using your editor, open __client/e2e.js__ and add the following code:

```javascript
describe('example e2e test', () => {
  it('has the correct page title', async () => {
    await page.goto('http://localhost:3325');

    const title = await page.title();

    assert.equal(title, 'Mercenary');
  });
});


```

Save __client/e2e.js__, then go back to your terminal and run: `npm run e2e`. You will see the output of the test results.

Congratulations! You've created your first end-to-end test. Just like with your unit test, you didn't have to spend any time settings up tools and configuration files.

## Production

While mercenary does a lot to optimize the development experience, it also makes deployment a breeze.

To build all static assets and start the production server, run `npm run prod`.

Once your __config.js__ file is configured, you can deploy a Docker container running in production mode to AWS EBS using `npm run deploy`. See "Configuring Your AWS Infrastructure for Deployment" below for important configuration information.

To test the Docker container locally, run `npm run docker` to generate a Dockerfile. Then run something like:

```bash
docker build -t my-app .
docker run -p 3325:3325 -d my-app
```

## Configuring Your AWS Infrastructure for Deployment

1. Using S3, create a new bucket. In your `config.js`, enter the name you used for this bucket as the value for the `aws.s3.bucket` property.
- Using EC2, create a security group that allows all inbound request from HTTP and HTTPS. Copy the name you give it to your clipboard, you'll need it in the next step.
- Using Elastic Beanstalk, create a new web server application. Choose Docker as the configuration, and choose "Load balancing, auto scaling" as the environment type. Create a new application environment using at least a "t2.micro" instance size with auto-scaling enabled (even if you set the maximum instance count to 1). Set the security group for your Beanstalk application to the one you created in step 1.
- Using AWS Certificate Manager, create a certificate for the domain you plan to use. Be sure to include "www" as an additional domain if you plan to use both "domain.com" and "www.domain.com".
- Using EC2, go to the Load Balancer for your Elastic Beanstalk application and configure the listeners to use both HTTP and HTTPS, with HTTPS configured to use the certificate you created in the previous step.
- Change the Load Balancer's security group to the one you created in step 2.
- Using Route 53, configure your domain with an A Record to point to your Load Balancer as an Alias.