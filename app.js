const express = require('express');
const pug = require('pug');
const app = express();
const path = require('path');
const game = require('./routes/game');
const gameInstance = require('./models/gameInstance');
const db = require('./models/db')

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')
  .use(express.static(__dirname + '/public'))
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

  // Catch 404 and forward to error handler
  .use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  })
  // Error handler
  .use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // Render the error page
    res.status(err.status || 500);
    res.render('error');
  })
const server = app.listen(8080, () => {
  console.log('Server is running');
});

module.exports = server;
