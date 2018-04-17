var express = require('express');
var router = express.Router();

var roundController = require('../controllers/roundController'); 

router.post('/', roundController.newRound);

module.exports = router;