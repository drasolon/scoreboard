const mongoose = require('mongoose');
const Game = require('../models/game');

// Get games with the same session id as the user
exports.getGames = function (req, res, next) {
        Game.find({ owner: req.session.id }, (err, retrievedGames) => {
            if (err) { return next(err); }

            // If there are no games, create an error
            if (retrievedGames == null) {
                err = new Error;
                err.status = 404;
                return next(err);
            }

            // Modify how the player names will be listed
            res.render('index', {games: retrievedGames});
        })
    }
