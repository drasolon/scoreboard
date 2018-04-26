let Round = require('../models/round.js');
let Game = require('../models/game.js');
let Players = require('../models/players.js');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.newRound = [

    // Validate fields.
    body('roundName').trim()
        .isLength({ min: 1 }).withMessage('Round name must be specified.')
        .matches("^[a-zA-Z0-9 ]+$").withMessage('Round name must only contains alphanumeric characters'),

    body('playerScores.*').trim()
        .isLength({ min: 1 }).withMessage('Player score must be specified.')
        .isInt().withMessage('Player score must only contains numeric characters.'),

    // Sanitize fields.
    sanitizeBody('roundName').trim().escape(),
    sanitizeBody('playerScores.*').trim().escape().toInt(),

    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return msg;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        // errors handling
        if (!result.isEmpty()) {

            // reload same page with error message
            res.render('addRound', { errors: result.array() })
        }

        Round.setScores(req.body.playerScores);
        Round.setName(req.body.roundName);
        Game.setRound(Round);

        res.render('rounds', { playerNames: Players.getPlayers(), rounds: Game.getRounds(), gameName: Game.getName(), totals: Game.getTotals(), ranks: Game.getRanks() })
    }]