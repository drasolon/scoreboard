const express = require('express');
const helmet = require('helmet');
const path = require('path');
const game = require('./routes/game');
const root = require('./routes/root');
const config = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();
const mongoDB = config.db.url;
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err) => {
  app.use((req, res, next) => next(err));
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug')
  .use(helmet())
  .use(express.static(`${__dirname}/public`))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session({
    name: 'scoreboard',
    secret: config.cookie.secret,
    store: new MongoStore({ mongooseConnection: db }),
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      /* domain: 'example.com',
      path: '/index', */
      expires: new Date(Date.now() + (365 * 24 * 3600 * 1000)) // 365 days
    }
  }))
  .use('/game', game)
  .use('/', root)

  // Catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    return next(err);
  })

  // Error handler
  .use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.status = err.status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // Render the error page
    res.status(err.status || 500);
    res.render('error');
  });
const server = app.listen(8080, () => {
});

module.exports = server;
