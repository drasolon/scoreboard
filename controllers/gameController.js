let Game = require('../models/game');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.createGame = [

    // Validate fields.

    body('inputGameName').trim()
        .isLength({ min: 1 }).withMessage('Game name must be specified.')
        .matches("^[a-zA-Z0-9 ]+$").withMessage('Game name must be alphanumeric characters'),

    body('inputNumberPlayers').trim()
        .isLength({ min: 1 }).withMessage('Number of players must be specified.')
        .isInt().withMessage('Number of players must be a number between 2 and 10.')
        .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).withMessage('Number of players must be a number between 2 and 10'),

    body('winRule').isIn(['high', 'low']).withMessage('Choose only between the two radio buttons'),

    // Sanitize fields.
    sanitizeBody('inputGameName').trim().escape(),
    sanitizeBody('inputNumberPlayers').trim().escape(),
    sanitizeBody('winRule').trim().escape(),

    (req, res) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return msg;

        };

        const result = validationResult(req).formatWith(errorFormatter);
        // errors handling
        if (!result.isEmpty()) {

            // reload same page with error message
            console.log(result.array())
            res.render('new', { errors: result.array() })

        }

        Game.setName(req.body.inputGameName);
        Game.setRule(req.body.winRule);
        res.render('players', { numberPlayers: req.body.inputNumberPlayers })

    }]
