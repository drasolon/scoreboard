const Game = require('../models/game');
const Request = require('request');
const db = require('../models/db');
const mockData = require('./mockData');

let game;
let data = '';

beforeAll(() => {
    server = require('../app');
});

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
    db.close();
    console.log('db closed');
    server.close();
    console.log('server closed');
});

describe('GET /game/:id', () => {

    it('invalid :id', (done) => {
        Request.get('http://localhost:8080/game/eipahf584f', (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 1 done');
            done();
        })
    });
    it('valid :id', (done) => {
        let url = 'http://localhost:8080/game/' + game._id;
        Request.get(url, (err, res) => {
            data = res.statusCode;
            console.log('request 2 done');
            expect(data).toEqual(200);
            done();
        })
    });
    it('valid :id/add', (done) => {
        let url = 'http://localhost:8080/game/' + game._id + '/add';
        Request.get(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(200);
            console.log('request 3 done');
            done();
        })
    });
    it('invalid :id/addRound', (done) => {
        Request.get('http://localhost:8080/game/eipahf584f/add', (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 4 done');
            done();
        })
    })
});

describe('GET /game/:id/delete/round', () => {
    it('invalid :id and valid round_id', (done) => {
        let url = 'http://localhost:8080/game/eipahf584f/delete/' + game.rounds[0]._id;
        Request.get(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 5 done');
            done();
        })
    });
    it('invalid :id and invalid round_id', (done) => {
        let url = 'http://localhost:8080/game/eipahf584f/delete/efezfzf';
        Request.get(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(404);
            console.log('request 6 done');
            done();
        })
    });
    it('valid :id and valid round_id', (done) => {
        let url = 'http://localhost:8080/game/' + game._id + '/delete/' + game.rounds[0]._id;
        Request.get(url, (err, res) => {
            data = res.statusCode;
            expect(data).toEqual(200);
            console.log('request 7 done');
            done();
        })
    })
});

