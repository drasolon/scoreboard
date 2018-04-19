var express = require('express');
var router = express.Router();

var playerController = require('../controllers/playerController'); 

router.post('/', playerController.createPlayer);
router.get('/', function (req, res) {
    res.redirect('new');
  });
  
module.exports = router;