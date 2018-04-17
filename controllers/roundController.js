let Round = require('../models/round.js');
let Game = require('../models/game.js');
let Players = require('../models/players.js');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.newRound = [

    // Validate fields.
    body('roundName').isLength({ min: 1 }).trim().withMessage('Round name must be specified.'),

    body('playerScore').isLength({ min: 1 }).trim().withMessage('Player score must be specified.')
        .isInt().withMessage('Player score has non-numeric characters.'),

    // Sanitize fields.
    sanitizeBody('roundName').trim().escape(),
    sanitizeBody('playerScore').trim().escape(),

    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${location}[${param}]: ${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.json({ errors: result.array() });
        }

        Round.setScores(req.body.playerScore);
        Round.setName(req.body.roundName);
        Game.setRound(Round);

        res.render('rounds', { playerNames: Players.getPlayers(), rounds: Game.getRounds(), gameName: Game.getName() })
    }]
