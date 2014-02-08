var os      = require('os'),
    cluster = require('cluster');

// Setup the cluster to use app.js
cluster.setupMaster({exec: 'app.js'});

// Listen for dying workers
cluster.on('exit', function(worker) {
    console.log('Worker ' + worker.id + ' died');
    
    // Replace the dead worker
    cluster.fork();
});

// Fork a worker for each available CPU
for (var i = 0, len = os.cpus().length; i < len; i++) {
    cluster.fork();
}