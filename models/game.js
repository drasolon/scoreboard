let Game = (function () {

    let name;
    let rule;
    let rounds = [];
    let players = [];

    var self = {};

    self.setRule = function (newRule) {
        rule = newRule;
    };

    self.setName = function (newName) {
        name = newName;
    };

    self.setRound = (round) => {
        let tempObj = {};
        tempObj.name = round.getName();
        tempObj.scores = round.getScores();
        rounds.push(tempObj);
    }

    self.getName = () => {
        return name;
    }

    self.getRule = () => {
        return rule;
    }

    self.getRounds = () => {
        return rounds;
    }

    self.reset = () => {
        name = '';
        rule = '';
        rounds = [];
        players = [];
    }


    return self;
})();

module.exports = Game;