let Player = require('../models/players.js');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createPlayer = [

    // Validate fields.
    body('playerName').isLength({ min: 1 }).trim().withMessage('Player name must be specified.')
        .isAlphanumeric().withMessage('Player name has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('playerName').trim().escape(),

    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${location}[${param}]: ${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.json({ errors: result.array() });
        }

        Player.setPlayers(req.body.playerName);
        res.render('rounds', { playerNames: Player.getPlayers() })
    }]
