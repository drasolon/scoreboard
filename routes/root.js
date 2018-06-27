const express = require('express');

const router = express.Router();
const indexController = require('../controllers/indexController');
const gameInstance = require('../models/gameInstance');

// GET request to render index page
router.get('/', indexController.getGames);
router.get('/index', indexController.getGames);
// GET request to render new game page
router.get('/new', (req, res) => {
  gameInstance.reset();
  return res.render('new');
});
// GET request to rend the about page
router.get('/about', (req, res) => res.render('about'));
module.exports = router;
