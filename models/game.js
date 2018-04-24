let Game = (function () {

    let name;
    let rule;
    let rounds = [];
    let totals = [];
    let ranks = [];
    var self = {};

    function calculateTotals(tempObj) {
        if (rounds.length < 2) {
            totals = tempObj.scores;
        }
        else {
            totals = tempObj.scores.map((score, index) => {
                return score + totals[index]
            })
        }
    }

    function calculateRanks() {
        let tempArray = [];
        let counter = 1;

        // Create tempArray
        tempArray = totals.map((e, i) => {
            return { index: i, value: e, rank: '' }
        });

        // Sort array by asc or desc
        tempArray.sort((a, b) => {
            if (rule == 'low') {
                return a.value - b.value
            } 
            else { return a.value + b.value }
        })

        // Asisgn rank
        for (let i = 0; i < tempArray.length; i++) {
            tempArray[i].rank = counter;
            counter++
        }

        // Sort by index
        tempArray.sort((a, b) => {
            return a.index - b.index
        })

        // Keep the sorted ranks in a new array
        ranks = tempArray.map((e) => {
            return e.rank
        })
    }

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
        calculateTotals(tempObj);
        calculateRanks()
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

    self.getRanks = () => {
        return ranks;
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