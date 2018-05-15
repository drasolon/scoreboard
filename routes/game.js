const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/players', gameController.createGame);
router.get('/:id', gameController.getGame);

router.post('/', gameController.createPlayer);
router.get('/:id/addRound', gameController.getRound);
router.post('/:id/addRound', gameController.addRound);
router.get('/', function (req, res) {
  res.redirect('new');
});

module.exports = router;