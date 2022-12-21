const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n\n');

const calories = input
    .map(elf => {
        return elf
            .split('\n')
            .reduce((acc, val) => acc + parseInt(val), 0)
    })
    .sort((a,b)=> b-a)

// Part1
const part1 = calories[0]
console.log(part1)

// Part2

const part2 = calories[0]+calories[1]+calories[2]
console.log(part2)