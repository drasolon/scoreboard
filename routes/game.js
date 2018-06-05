'use strict';

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/players', gameController.createGame);
router.get('/players', (req, res) => res.redirect('../new'));
router.get('/:id', gameController.getGame);
router.post('/', gameController.createPlayer);
router.get('/:id/add', gameController.getRound);
router.post('/:id/add', gameController.addRound);
router.get('/:id/delete/:round', gameController.deleteRound);
router.get('/', function (req, res) {
  res.redirect('new');
});

module.exports = router;