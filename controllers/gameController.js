const Game = require('../models/game');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const gameInstance = require('../models/gameInstance');
const mongoose = require('mongoose');
const tools = require('../private/tools');

exports.createGame = [

  // Validate fields.
  body('inputGameName').trim()
    .isLength({ min: 1 }).withMessage('Game name must be specified.')
    .matches('^[a-zA-Z0-9 ]+$')
    .withMessage('Game name must be alphanumeric characters'),

  body('inputNumberPlayers').trim()
    .isLength({ min: 1 }).withMessage('Number of players must be specified.')
    .isInt()
    .withMessage('Number of players must be a number between 2 and 10.')
    .isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .withMessage('Number of players must be a number between 2 and 10'),

  body('winRule').isIn(['high', 'low']).withMessage('Choose only between the two radio buttons'),

  body('resultDisplay').isIn(['totalScore', 'roundWon']).withMessage('Choose only between the two radio buttons'),

  // Sanitize fields.
  sanitizeBody('inputGameName').trim().escape(),
  sanitizeBody('inputNumberPlayers').trim().escape(),
  sanitizeBody('winRule').trim().escape(),
  sanitizeBody('resultDisplay').trim().escape(),

  (req, res) => {
    const errorFormatter = ({
      location, msg, param, value, nestedErrors
    }) => msg;
    const result = validationResult(req).formatWith(errorFormatter);

    // Errors handling
    if (!result.isEmpty()) {
      // If errors, reload same page with error message
      res.render('new', { errors: result.array() });
    } else {
      gameInstance.name = req.body.inputGameName;
      gameInstance.rule = req.body.winRule;
      gameInstance.display = req.body.resultDisplay;
      res.render('players', { numberPlayers: req.body.inputNumberPlayers });
    }
  }];

exports.createPlayer = [

  // Validate fields.
  body('playerNames.*').trim()
    .isLength({ min: 1 }).withMessage('Player name must be specified.')
    .matches('^[a-zA-Z0-9 ]+$')
    .withMessage('Player name must be in alphanumeric characters')

    // check if there are duplicate names
    .custom((value, { req }) => {
      let duplicate = 0;
      for (let i = 0; i < req.body.playerNames.length; i += 1) {
        if (value.toLowerCase().trim() === req.body.playerNames[i].toLowerCase().trim()) {
          duplicate += 1;
        }
      }
      if (duplicate > 1) {
        return 0;
      }
      return 1;
    })
    .withMessage('Player name must be unique'),

  // Sanitize fields.
  sanitizeBody('playerNames.*').trim().escape(),

  (req, res, next) => {
    const errorFormatter = ({
      location, msg, param, value, nestedErrors
    }) => ({ message: msg, value, param });

    const result = validationResult(req).formatWith(errorFormatter);

    // Errors handling
    if (!result.isEmpty()) {
      // If errors, reload same page with error message
      res.render('players', {
        errors: result.array(),
        numberPlayers: req.body.inputNumberPlayers,
        playerNames: req.body.playerNames
      });
    } else {
      // Create the game and save on database
      const game = new Game({
        name: gameInstance.name,
        rule: gameInstance.rule,
        players: req.body.playerNames,
        owner: req.session.id,
        display: gameInstance.display
      });
      game.save((err) => {
        if (err) { return next(err); }
        return res.redirect(game.url);
      });
    }
  }];

exports.addRound = [

  // Validate fields.
  body('roundName').trim()
    .isLength({ min: 1 }).withMessage('Round name must be specified.')
    .matches('^[a-zA-Z0-9 ]+$')
    .withMessage('Round name must only contains alphanumeric characters'),

  body('playerScores.*').trim()
    .isLength({ min: 1 }).withMessage('Player score must be specified.')
    .isInt()
    .withMessage('Player score must only contains numeric characters.'),

  // Sanitize fields.
  sanitizeBody('roundName').trim().escape(),
  sanitizeBody('playerScores.*').trim().escape().toInt(),

  (req, res, next) => {
    const errorFormatter = ({
      location, msg, param, value, nestedErrors
    }) => msg;

    const result = validationResult(req).formatWith(errorFormatter);

    // Errors handling
    if (!result.isEmpty()) {
      // If errors, reload same page with error message
      Game.findById(req.params.id, (err, retrievedGame) => {
        if (err) { return next(err); }
        return res.render('addRound', {
          errors: result.array(),
          playerNames: retrievedGame.players,
          roundCounter: `Round ${retrievedGame.rounds.length + 1}`,
          url: retrievedGame.url
        });
      });
    } else {
      const round = {
        name: req.body.roundName,
        scores: req.body.playerScores
      };
      Game.findByIdAndUpdate(req.params.id, { $push: { rounds: round } }, (err, retrievedGame) => {
        if (err) { return next(err); }

        return res.redirect(retrievedGame.url);
      });
    }
  }];

exports.getGame = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Game.findById(req.params.id, (err, retrievedGame) => {
      if (err) { return next(err); }

      // If the game does not exist, call the next middleware
      // to search for a non editable game
      if (retrievedGame == null) {
        return next(err);
      }

      // Format the dates
      let tempDate;
      retrievedGame.rounds.forEach((round) => {
        tempDate = tools.formatDate(round.date);
        round.dateDiff = tempDate;
      });
      return res.render('game', { game: retrievedGame, hostname: req.hostname });
    });
  } else {
    const err = new Error();
    err.status = 404;
    return next(err);
  }
};

exports.getNonEditableGame = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Game.findOne({ nonEditableId: req.params.id }, (err, retrievedGame) => {
      if (err) { return next(err); }

      // If the game does not exist, create an error
      if (retrievedGame == null) {
        err = new Error();
        err.status = 404;
        return next(err);
      }
      return res.render('nonEditableGame', { game: retrievedGame });
    });
  } else {
    const err = new Error();
    err.status = 404;
    return next(err);
  }
};

exports.getRound = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Game.findById(req.params.id, (err, retrievedGame) => {
      if (err) { return next(err); }
      if (retrievedGame == null) {
        err = new Error();
        err.status = 404;
        return next(err);
      }
      return res.render('addRound', { playerNames: retrievedGame.players, roundCounter: `Round ${retrievedGame.rounds.length + 1}`, url: retrievedGame.url });
    });
  } else {
    const err = new Error();
    err.status = 404;
    return next(err);
  }
};

exports.deleteRound = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Game.findByIdAndUpdate(
      req.params.id, { $pull: { rounds: { _id: req.params.round } } },
      (err, retrievedGame) => {
        if (err) { return next(err); }
        if (retrievedGame == null) {
          err = new Error();
          err.status = 404;
          return next(err);
        }
        return res.redirect(retrievedGame.url);
      }
    );
  } else {
    const err = new Error();
    err.status = 404;
    return next(err);
  }
};
