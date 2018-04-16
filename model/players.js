let Player = (function () {
    let players = [];

    var self = {};

    self.setPlayers = function (newPlayers) {
        players = newPlayers;
    };

    self.getPlayers = () => {
        return players;
    }

    return self;
})();

module.exports = Player;