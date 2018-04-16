const express = require('express');
const pug = require('pug');
const app = express();
let game = require('./model/game.js');
let players = require('./model/players.js');

app.set('view engine', 'pug')
  .use(express.json())
  .use(express.urlencoded())

  .post('/players', (req, res) => {
    game.setName(req.body.inputGameName);
    game.setRule(req.body.winRule);
    res.render('players', { numberPlayers: req.body.inputNumberPlayers })
  })
  .post('/initiateGame', (req, res) => {
    if (req.body.playerName != null) {
      players.setPlayers(req.body.playerName);
    }

    if (req.body.playerScore != null) {
      game.setRound(req.body.roundName, req.body.playerScore);
      let a = game.getRounds();
      console.log(a);
    }

    res.render('initiateGame', { playerNames: players.getPlayers(), rounds: game.getRounds(), gameName: game.getName() });
  })
  .get('/addRound', function (req, res) {
    res.render('addRound', { playerNames: players.getPlayers(), gameName: game.getName() });
  })
  .get('/header', function (req, res) {
    res.render('header');
  })
  .get('/index', function (req, res) {
    res.render('index');
  })
  .get('/new', function (req, res) {
    res.render('new');
  })
  .listen(8080, () => {
    console.log('Example app listening on port 8080!');
  });
