const express = require('express');
const app = express();
const game = require('../routes/game');
app.set('view engine', 'pug')
    .use(express.json())
    .use(express.urlencoded())
    .use('/game', game)
const server = app.listen(8080, () => {
    console.log('Server is running');
});

module.exports = server;