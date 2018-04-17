var express = require('express');
var router = express.Router();

var playerController = require('../controllers/playerController'); 

router.post('/', playerController.createPlayer);

module.exports = router;