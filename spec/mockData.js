'use strict';

let mockdata = [
    {
        name: 'test',
        rule: 'high',
        players: ['playerTest1', 'playerTest2', 'playerTest3'],
        rounds: [
            {
                name: 'RoundTest1',
                scores: [100, 200, 300]
            },
            {
                name: 'RoundTest2',
                scores: [780, 96, 0]
            }
        ]
    },
    {
        gnan: 'rerse'
    }
];
module.exports = mockdata;