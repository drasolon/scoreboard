let Game = (function () {
    let name;
    let rule;
    let rounds = [];

    var self = {};

    self.setRule = function (newRule) {
        rule = newRule;
    };

    self.setName = function (newName) {
        name = newName;
    };

    self.setRound = (newName, newScores) => {
        let tempObj = {};
        tempObj.name = newName;
        tempObj.scores = newScores;
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


    return self;
})();

module.exports = Game;