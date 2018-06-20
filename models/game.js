const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoundSchema = new Schema({
  name: { type: String, required: true },
  scores: [{ type: Number, required: true }],
  date: { type: Date, default: Date.now, required: true }
});

const GameSchema = new Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  rule: { type: String, enum: ['high', 'low'], required: true },
  display: { type: String, enum: ['totalScore', 'roundWon'], required: true },
  players: [{ type: String, required: true }],
  rounds: [RoundSchema],
  nonEditableId: { type: String, default: mongoose.Types.ObjectId(), required: true },
  date: { type: Date, default: Date.now, required: true }

});

GameSchema
  .virtual('url')
  .get(function getUrl() { return `/game/${this.id}`; });

GameSchema
  .virtual('nonEditableUrl')
  .get(function getNonEditableUrl() { return `/game/${this.nonEditableId}`; });

// Display total scores or total rounds won depending on the game settings
GameSchema
  .virtual('totalScore')
  .get(function getTotalScore() {
    const totalScore = [];
    this.rounds.forEach((round) => {
      round.scores.forEach((score, index, array) => {
        if (typeof totalScore[index] === 'undefined') {
          totalScore[index] = 0;
        }
        if ((this.display === 'roundWon')) {
          if (this.rule === 'high') {
            if (score === Math.max(...array)) {
              totalScore[index] += 1;
            }
          } else if (score === Math.min(...array)) {
            totalScore[index] += 1;
          }
        } else {
          totalScore[index] += score;
        }
      });
    });
    return totalScore;
  });

GameSchema
  .virtual('ranks')
  .get(function getRanks() {
    const totalScore = this.totalScore;
    const tempArr = [];
    let counter = 1;
    const sortedRanks = [];

    // We need to assign a rank to each total and sort the array
    // in the same order as the player list, or the total list.
    // Create array of totals with their original indexes
    for (let k = 0; k < totalScore.length; k += 1) {
      tempArr.push({ originalIndex: k, total: totalScore[k] });
    }

    // Sort array by asc or desc
    tempArr.sort((a, b) => {
      if (this.rule === 'low') {
        return a.total - b.total;
      }
      return b.total - a.total;
    });

    // Asisgn ranks to each total
    for (let l = 0; l < tempArr.length; l += 1) {
      tempArr[l].rank = counter;
      counter += 1;
    }

    // Sort array by original indexes
    tempArr.sort((a, b) => a.originalIndex - b.originalIndex);

    // Only keep the ranks property
    for (let m = 0; m < tempArr.length; m += 1) {
      sortedRanks.push(tempArr[m].rank);
    }

    // Add ordinal indicators to the ranks
    for (let n = 0; n < sortedRanks.length; n += 1) {
      switch (sortedRanks[n]) {
        case 1: sortedRanks[n] = '1st';
          break;
        case 2: sortedRanks[n] = '2nd';
          break;
        case 3: sortedRanks[n] = '3rd';
          break;
        default: sortedRanks[n] += 'th';
      }
    }

    return sortedRanks;
  });

// Export model.
module.exports = mongoose.model('Game', GameSchema);
