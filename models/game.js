let Game = (function () {

    let name;
    let rule;
    let rounds = [];
    let totals = [];
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

       if (rounds.length < 2) {
           totals = tempObj.scores;
       }
       else {
           totals = tempObj.scores.map((score, index) => {
               return score + totals[index]
           })
       }
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

    self.getTotals = () => {
        return totals;
    }

    self.reset = () => {
        name = '';
        rule = '';
        rounds = [];
        players = [];
        totals = [];
    }


    return self;
})();

module.exports = Game;