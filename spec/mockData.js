const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId();
const mockdata = [
  {
    name: 'test',
    rule: 'high',
    display: 'roundWon',
    players: ['playerTest1', 'playerTest2', 'playerTest3'],
    owner: 'oipjdogdjgregeegir',
    rounds: [
      {
        name: 'RoundTest1',
        scores: [100, 200, 300]
      },
      {
        name: 'RoundTest2',
        scores: [780, 96, 0]
      }
    ],
    nonEditableId: id
  },
  {
    gnan: 'rerse'
  }
];
module.exports = mockdata;
