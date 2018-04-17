const express = require('express');
const pug = require('pug');
const app = express();
var path = require('path');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
let game = require('./routes/game');
let players = require('./routes/players');
let round = require('./routes/round')
let Game = require('./models/game');
let Players = require('./models/players');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());
app.use('/players', game);
app.use('/rounds', players);
app.use('/newRound', round);
app.get('/addRound', function (req, res) {
  res.render('addRound', { playerNames: Players.getPlayers(), gameName: Game.getName(), defaultRoundName: 'Round ' + Game.getRounds().length + 1 })
});
app.get('/index', function (req, res) {
  res.render('index');
});
app.get('/new', function (req, res) {
  Game.reset();
  res.render('new')
});
app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
