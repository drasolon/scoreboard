var express = require('express');
var router = express.Router();

var gameController = require('../controllers/gameController'); 

router.post('/', gameController.createGame);

module.exports = router;