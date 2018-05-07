const express = require('express');
const pug = require('pug');
const app = express();
const path = require('path');
const game = require('./routes/game');
const gameInstance = require('./models/gameInstance');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://AlphaScoreboard:726rNscu4z8G@ds159459.mlab.com:59459/scoreboard-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')
  .use(express.json())
  .use(express.urlencoded())
  .use('/game', game)
  .get('/index', function (req, res) {
    res.render('index');
  })
  .get('/new', function (req, res) {
    res.render('new');
    gameInstance.reset();
  })
  .use(function(req, res, next) {
    res.status(404).send('404 - Sorry cant find that!');
  })
  .listen(8080, () => {
    console.log('Server is running');
  });
