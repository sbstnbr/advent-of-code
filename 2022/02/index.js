const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

// A X Rock - 1
// B Y Paper - 2
// C Z Scissors - 3

const results = {
    'AX':4, 
    'BX':1,
    'CX':7,
    'AY':8,
    'BY':5,
    'CY':2,
    'AZ':3,
    'BZ':9,
    'CZ':6
}

const scores = input
    .map(game => game.split(' '))
    .map(game => {
        return results[game[0]+game[1]]
    })

// Part1
const part1 = scores.reduce((a,b)=> a+b,0)
console.log(part1)

// Part2

// A Rock - 1
// B Paper - 2
// C Scissors - 3

// X lose
// Y draw
// Z win

const results2 = {
    'AX':3, 
    'BX':1,
    'CX':2,
    'AY':4,
    'BY':5,
    'CY':6,
    'AZ':8,
    'BZ':9,
    'CZ':7
}

const scores2 = input
    .map(game => game.split(' '))
    .map(game => {
        return results2[game[0]+game[1]]
    })

const part2 = scores2.reduce((a,b)=> a+b,0)
console.log(part2)