const express = require('express');
const pug = require('pug');
const app = express();
const path = require('path');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
let game = require('./routes/game');
let players = require('./routes/players');
let round = require('./routes/round')
let Game = require('./models/game');
let Players = require('./models/players');

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')
  .use(express.json())
  .use(express.urlencoded())
  .use('/players', game)
  .use('/rounds', players)
  .use('/newRound', round)
  .get('/addRound', function (req, res) {
    res.render('addRound', { playerNames: Players.getPlayers(), gameName: Game.getName(), defaultRoundName: 'Round ' + (Game.getRounds().length + 1) })
  })
  .get('/index', function (req, res) {
    res.render('index');
  })
  .get('/new', function (req, res) {
    Game.reset();
    res.render('new')
  })
  .listen(8080, () => {
    console.log('Example app listening on port 8080!');
  });
