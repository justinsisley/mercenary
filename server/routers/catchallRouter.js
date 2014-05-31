var express         = require('express');
var router          = express.Router();
var baseController  = require('../controllers/baseController');

// Route all requests to the base controller.
router.get('*', baseController);

module.exports = router;