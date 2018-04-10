let Game = (function () {
    let name;
    let players = [];
    let rounds = [];
    let rule;

    var g = {};
    
    g.setRule = function(newRule) {
        rule = newRule;
    };

    g.setName = function(newName) {
        name = newName;
    };

    g.setPlayers = function(newPlayers) {
        players = newPlayers;
    };

    g.newRound = function(newRound) {
        rounds.push(newRound);
    };

    g.readName = () => {
        return name;
    }

    g.readPlayers = () => {
        return players;
    }

    g.readRule = () => {
        return rule;
    }

    return g;
})();

module.exports = Game;