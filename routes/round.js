var express = require('express');
var router = express.Router();

var roundController = require('../controllers/roundController'); 

router.post('/', roundController.newRound);
router.get('/', function (req, res) {
    res.redirect('new');
  });
module.exports = router;