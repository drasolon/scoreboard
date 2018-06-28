const Game = require('../models/game');
const tools = require('../private/tools');

// Get games with the same session id as the user
exports.getGames = (req, res, next) => {
  if (req.query.clear === 'true') {
    res.clearCookie('scoreboard');
    return res.render('index');
  }

  Game.find({ owner: req.session.id }, (err, retrievedGames) => {
    if (err) { return next(err); }
    if (retrievedGames != null) {
      // Format the dates
      let temp;
      retrievedGames.forEach((game) => {
        temp = tools.formatDate(game.date);
        game.dateDiff = temp;
      });
    }
    return res.render('index', { games: retrievedGames });
  });
};

