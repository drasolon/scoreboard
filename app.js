const express = require('express');
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');
/* app.use(express.static('scripts')); */
app.use(express.json());
app.use(express.urlencoded());

app.post('/players', (req, res) => {
  res.render('players', {numberPlayers: req.body.inputNumberPlayers})
});
app.post('/initiateGame', (req, res) => {
  console.log(req.body);
  res.render('initiateGame', {playerName: req.body});
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
