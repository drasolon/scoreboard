let Player = require('../models/players.js');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createPlayer = [

    // Validate fields.
    body('playerName.*').trim().isLength({ min: 1 }).withMessage('Player name must be specified.')
        .matches("^[a-zA-Z0-9 ]+$").withMessage('Player name must be in alphanumeric characters')
        .custom((value, { req }) => {
            let duplicate = 0;
            for (let i = 0; i < req.body.playerName.length; i++) {
                if (value.toLowerCase() == req.body.playerName[i].toLowerCase()) {
                    duplicate++;
                }
            }
            if (duplicate > 1) {
                return 0
            }
            else return 1
           
        }).withMessage('Player name must be unique'),

    // Sanitize fields.
    sanitizeBody('playerName.*').trim().escape(),

    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return {'message': msg, 'value': value, 'param': param};
        };

        const result = validationResult(req).formatWith(errorFormatter);

        // errors handling
        if (!result.isEmpty()) {

            // reload same page with error message
            res.render('players', { errors: result.array(), numberPlayers: req.body.inputNumberPlayers, playerNames: req.body.playerName })
        }
        else {
            Player.setPlayers(req.body.playerName);
            res.render('rounds', { playerNames: Player.getPlayers() })
        }
    }]
