'use strict';

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// POST request to create a game.
router.post('/players', gameController.createGame);

// GET request to redirect user on the "new game" page.
router.get('/players', (req, res) => res.redirect('../new'));

// GET request for a game.
router.get('/:id', gameController.getGame);

// POST request to create players.
router.post('/', gameController.createPlayer);

// GET request to redirect user on the "new game" page.
router.get('/', (req, res)  => res.redirect('new'));

// GET request for the "addRound" page.
router.get('/:id/add', gameController.getRound);

// POST request to create a round.
router.post('/:id/add', gameController.addRound);

// POST request to delete a round.
router.post('/:id/:round', gameController.deleteRound);


module.exports = router;