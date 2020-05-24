const Game = require('../models/game');
const request = require('request');
const mockData = require('./mockData');
const server = require('../app');

let game;

let start = (done) => {
  Game.deleteOne({ name: 'test' }, () => {  
    console.log('collection removed');
  });

  game = new Game(mockData[0]);
  game.save((err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log(game._id);
    done();
  });
}

describe('HTTP REQUEST', () => {
  afterAll(() => {
    server.close();
    console.log('server closed');
  });

  describe('GET /game/:id', () => {
    beforeEach(start);
    
    it('invalid :id', (done) => {
      request.get('http://localhost:8080/game/eipahf584f', (err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
    it('valid :id', (done) => {
      let url = `http://localhost:8080/game/${game._id}`;
      request.get(url, (err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
    it('valid :id/add', (done) => {
      let url = `http://localhost:8080/game/${game._id}/add`;
      request.get(url, (err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
    it('invalid :id/addRound', (done) => {
      request.get('http://localhost:8080/game/eipahf584f/add', (err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
  });

  describe('POST /game/:id/:round', () => {
    beforeEach(start);

    it('invalid :id and valid round_id', (done) => {
      let url = `http://localhost:8080/game/eipahf584f/${game.rounds[0]._id}`;
      request.post(url, (err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
    it('invalid :id and invalid round_id', (done) => {
      let url = 'http://localhost:8080/game/eipahf584f/efezfzf';
      request.post(url, (err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
    it('valid :id and valid round_id', (done) => {
      let url = `http://localhost:8080/game/${game._id}/delete/${game.rounds[0]._id}`;
      request.post(url, (err, res) => {
        expect(res.statusCode).toEqual(302);
        done();
      });
    });
  });
});
