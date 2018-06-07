'use strict';

const Game = require('../models/game');
const request = require('request');
const mockData = require('./mockData');
const server = require('../app');
let game;
let data = '';

beforeEach((done) => {
    Game.remove({}, (err) => {
        console.log('collection removed');
        game = new Game(mockData[0]);
        game.save((err) => {
            if (err) { console.log(err) }
            console.log('game saved');
            data = '';
            done();
        })
    })
});

afterAll(() => {
    server.close();
    console.log('server closed');
});

describe('GET /game/:id', () => {

    it('invalid :id', (done) => {
        request.get('http://localhost:8080/game/eipahf584f', (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 1 done');
            done();
        })
    });
    it('valid :id', (done) => {
        let url = 'http://localhost:8080/game/' + game._id;
        request.get(url, (err, res) => {
            data = res.statusCode;
            console.log('request 2 done');
            expect(data).toEqual(200);
            done();
        })
    });
    it('valid :id/add', (done) => {
        let url = 'http://localhost:8080/game/' + game._id + '/add';
        request.get(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(200);
            console.log('request 3 done');
            done();
        })
    });
    it('invalid :id/addRound', (done) => {
        request.get('http://localhost:8080/game/eipahf584f/add', (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 4 done');
            done();
        })
    })
});

describe('POST /game/:id/:round', () => {
    it('invalid :id and valid round_id', (done) => {
        let url = 'http://localhost:8080/game/eipahf584f/' + game.rounds[0]._id;
        request.post(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 5 done');
            done();
        })
    });
    it('invalid :id and invalid round_id', (done) => {
        let url = 'http://localhost:8080/game/eipahf584f/efezfzf';
        request.post(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 6 done');
            done();
        })
    });
    it('valid :id and valid round_id', (done) => {
        let url = 'http://localhost:8080/game/' + game._id + '/delete/' + game.rounds[0]._id;
        request.post(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(302);
            console.log('request 7 done');
            done();
        })
    })
});

