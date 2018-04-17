let Game = require('../models/game');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createGame = [

    // Validate fields.

    body('inputGameName').isLength({ min: 1 }).trim().withMessage('Game name must be specified.'),

    body('inputNumberPlayers').isLength({ min: 1 }).trim().withMessage('Number of players must be specified.')
        .isInt().withMessage('This must be a number.'),

    body('winRule').isIn(['high', 'low']).withMessage('Choose only between the two radio buttons'),

    // Sanitize fields.
    sanitizeBody('inputGameName').trim().escape(),
    sanitizeBody('inputNumberPlayers').trim().escape(),
    sanitizeBody('winRule').trim().escape(),

    (req, res) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${location}[${param}]: ${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.json({ errors: result.array() });
        }
        
        Game.setName(req.body.inputGameName);
        Game.setRule(req.body.winRule);
        res.render('players', { numberPlayers: req.body.inputNumberPlayers })

    }]
