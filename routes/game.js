var express = require('express');
var router = express.Router();

var gameController = require('../controllers/gameController'); 

router.post('/', gameController.createGame);
router.get('/', function (req, res) {
    res.redirect('new');
  });

module.exports = router;