const express = require('express');
const pug = require('pug');
const app = express();
let game = require('./model/game.js');

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());

app.post('/players', (req, res) => {
  game.setName(req.body.inputGameName);
  game.setRule(req.body.winRule);
  res.render('players', {numberPlayers: req.body.inputNumberPlayers})
});
app.post('/initiateGame', (req, res) => {
  game.setPlayers(req.body);
  res.render('initiateGame', {playerName: game.readPlayers});
});
app.get('/addRound', function (req, res) {
  res.render('addRound');
});
app.get('/header', function (req, res) {
  res.render('header');
});
app.get('/index', function (req, res) {
  res.render('index');
});
app.get('/new', function (req, res) {
  res.render('new');
});
app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
