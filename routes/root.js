'use strict';

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const gameInstance = require('../models/gameInstance');

// GET request to render index page
router.get('/index', indexController.getGames);
  
// GET request to render new game page
router.get('/new', function (req, res) {
    gameInstance.reset();
    res.render('new');  
  });

module.exports = router;