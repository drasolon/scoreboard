const Game = require('../models/game');
const tools = require('../private/tools');

exports.getPagination = async (req, res, next) => {
  const currentPage = (req.params.page == null ? 1 : Number(req.params.page));
  const gamesPerPage = 5;
  const previousPage = (currentPage === 1 ? 1 : (currentPage - 1));
  // If the user click on a pagination link, skip the previous games
  const gamesToSkip = (currentPage - 1) * gamesPerPage;
  const promiseNumberOfGames = Game.count({ owner: req.session.id }).exec();

  try {
    // Calculate the amount of pagination page needed
    const amountOfPages = Math.ceil(await promiseNumberOfGames / gamesPerPage);
    const nextPage = (currentPage === amountOfPages ? amountOfPages : (currentPage + 1));
    res.locals.previousPage = previousPage;
    res.locals.nextPage = nextPage;
    res.locals.amountOfPages = amountOfPages;
    res.locals.gamesToSkip = gamesToSkip;
    res.locals.currentPage = currentPage;
    return next();
  } catch (err) {
    return next(err);
  }
};

// Get games with the same session id as the user
exports.getGames = async (req, res, next) => {
  // Clear the list of game if user
  if (req.query.clear === 'true') {
    res.clearCookie('scoreboard');
    return res.render('index');
  }

  const previousPage = res.locals.previousPage;
  const nextPage = res.locals.nextPage;
  const amountOfPages = res.locals.amountOfPages;
  const gamesToSkip = res.locals.gamesToSkip;
  const currentPage = res.locals.currentPage;
  const promiseRetrievedGames = Game.find({ owner: req.session.id }, null, { skip: gamesToSkip, limit: 5 }).exec();

  try {
    const retrievedGames = await promiseRetrievedGames;
    let temp;
    retrievedGames.forEach((game) => {
      temp = tools.formatDate(game.date);
      game.dateDiff = temp;
    });

    return res.render('index', { games: retrievedGames, amountOfPages, previousPage, nextPage, currentPage });
  } catch (err) {
    return next(err);
  }
};

