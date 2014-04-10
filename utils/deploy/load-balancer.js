/*
https://mazira.com/blog/introduction-load-balancing-nodejs
 */

/*
Basic concept: create an application
on Heroku that is only a load balancer.
Create as many applications as you desire
and add their addresses to the addresses
array.
 */

var arguments = process.argv.splice(2),
    httpProxy = require('http-proxy');

// Addresses to use in the round robin proxy
var addresses = [
    {
        host: 'localhost',
        port: 8001
    },
    {
        host: 'localhost',
        port: 8002
    },
    {
        host: 'localhost',
        port: 8003
    }
];

var i = 0;
httpProxy.createServer(function (req, res, proxy) {
    proxy.proxyRequest(req, res, addresses[i]);

    i = (i + 1) % addresses.length;
}).listen(arguments[0] || 8000);

// $ node pi-server.js 8001 &
// $ node pi-server.js 8002 &
// $ node pi-server.js 8003 &
// $ node load-balancer.js 8000