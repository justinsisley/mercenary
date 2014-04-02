var express         = require('express'),
    router          = express.Router(),
    baseController  = require('../controllers/baseController');

// Route all requests to the base controller.
router.get('*', baseController);

module.exports = router;