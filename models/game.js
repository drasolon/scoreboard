'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoundSchema = new Schema({
    name: { type: String, required: true },
    scores: [{ type: Number, required: true }]
})

const GameSchema = new Schema({
    name: { type: String, required: true },
    rule: { type: String, enum: ['high', 'low'], required: true },
    players: [{ type: String, required: true }],
    rounds: [RoundSchema],
    nonEditableId: {type: String, default: mongoose.Types.ObjectId(), required: true}

});

GameSchema
    .virtual('url')
    .get(function () {
        return '/game/' + this._id;
    });

GameSchema
    .virtual('nonEditableUrl')
    .get(function () {
        return '/game/' + this.nonEditableId;
    });

GameSchema
    .virtual('totals')
    .get(function () {
        let totals = [];
        for (let i = 0; i < this.rounds.length; i++) {
            for (let j = 0; j < this.rounds[i].scores.length; j++) {
                if (typeof totals[j] === 'undefined') {
                    totals[j] = 0;
                }
                totals[j] += this.rounds[i].scores[j];
            }
        }
        return totals
    })

GameSchema
    .virtual('ranks')
    .get(function () {
        let totals = this.totals;
        let tempArr = [];
        let counter = 1;
        let sortedRanks = [];

        // We need to assign a rank to each total and sort the array in the same order as the player list, or the total list

        // Create array of totals with their original indexes
        for (let k = 0; k < totals.length; k++) {
            tempArr.push({ 'originalIndex': k, 'total': totals[k] });
        }

        // Sort array by asc or desc
        tempArr.sort((a, b) => {
            if (this.rule == 'low') {
                return a.total - b.total
            }
            else { return b.total - a.total }
        })
        
        // Asisgn ranks to each total    
        for (let l = 0; l < tempArr.length; l++) {
            tempArr[l].rank = counter;
            counter++
        }
        
        // Sort array by original indexes
        tempArr.sort((a, b) => {
            return a.originalIndex - b.originalIndex
        })      

        // Only keep the ranks property
        for (let m = 0; m < tempArr.length; m++) {
            sortedRanks.push(tempArr[m].rank)
        }
        return sortedRanks;
    })

// Export model.
module.exports = mongoose.model('Game', GameSchema);
