let Player = require('../models/players.js');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createPlayer = [

    // Validate fields.
    body('playerName').isLength({ min: 1 }).trim().withMessage('Player name must be specified.')
        .matches("^[a-zA-Z0-9 ]+$").withMessage('Player name must be in alphanumeric characters'),

    // Sanitize fields.
    sanitizeBody('playerName').trim().escape(),

    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return msg;
        };

        const result = validationResult(req).formatWith(errorFormatter);

        // errors handling
        if (!result.isEmpty()) {

            // reload same page with error message
            res.render('players', { errors: result.array() })
        }

        Player.setPlayers(req.body.playerName);
        res.render('rounds', { playerNames: Player.getPlayers() })
    }]
