// Start 02/12/24 18:25
// End 02/12/24 18:48

const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
    .split('\n')
    .map(line => line.split('   ').map(Number))
    .reduce((acc, [left, right]) => {
        acc[0].push(left);
        acc[1].push(right);
        return acc;
    }, [[], []])

    

// Part1
// const part1 = input
//     .map((list) => list.sort((a, b) => a - b))
//     .reduce((left,right) => {
//         return left.map((num, i) => Math.abs(num - right[i]))
//     })
//     .reduce((acc, num) => acc + num, 0)

// Part2
const part2 = input[0]
    .map(num => num*input[1].filter(x => x === num).length)
    .reduce((acc, num) => acc + num, 0)

console.log(part2)