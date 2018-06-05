'use strict';

const mongoose = require('mongoose');
const mongoDB = 'mongodb://AlphaScoreboard:726rNscu4z8G@ds159459.mlab.com:59459/scoreboard-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;