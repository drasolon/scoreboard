const Game = require('../models/game');
const Request = require('request');
const db = require('../models/db');
const mockData = require('./mockData');

describe('/game/:id GET route', () => {
    let game = new Game(mockData[0]);
    let data = '';

    beforeAll((done) => {
        server = require('../app');
        Game.remove({}, (err) => {
            console.log('collection removed');
            game.save((err) => {
                if (err) { console.log(err) }
                console.log('game saved');
                done();
            })
        })
    })

    afterAll((done) => {
        db.close();
        console.log('db closed');
        server.close();
        console.log('server closed');
        done();
    })

    it('invalid :id should return status code 404', (done) => {
        data = '';
        Request.get('http://localhost:8080/game/eipahf584f', (err, res) => {
            data = res.statusCode;
            console.log('request 1 done');
            expect(data).toBe(404);
            done();
        })
    });
    it('valid :id should return status code 200', (done) => {
        data = '';
        Request.get('http://localhost:8080/game/' + mockData[0]._id, (err, res) => {
            data = res.statusCode;
            console.log('request 2 done');
            expect(data).toBe(200);
            done();
        })
    })
    it('valid :id/addRound should return status code 200', (done) => {
        data = '';
        Request.get('http://localhost:8080/game/' + mockData[0]._id + '/addRound', (err, res) => {
            data = res.statusCode;
            console.log('request 3 done');
            expect(data).toBe(200);
            done();
        })
    })
    it('invalid :id/addRound should return status code 404', (done) => {
        data = '';
        Request.get('http://localhost:8080/game/eipahf584f/addRound', (err, res) => {
            data = res.statusCode;
            console.log('request 4 done');
            expect(data).toBe(404);
            done();
        })
    });
})
