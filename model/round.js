let Round = (function () {
    let name;
    let scores = [];

    let self = {};

    self.setName = function (newName) {
        name = newName;
    };

    self.setScores = function (newScores) {       
        scores = newScores;
    };

    self.getName = () => {
        return name;
    }

    self.getScores = () => {
        return scores;
    }


    return self;
})();

module.exports = Round;