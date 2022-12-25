const path = require('path');
const fs = require('fs');

// Input

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
    .split('')

// Utils

const uniqueValue = arr => arr.every((value,index) => arr.indexOf(value) == index)

// Part1

let buffer = input.slice(0,4);
let result = 0;

for (let index = 4; index < input.length; index++) {
    const element = input[index];
    if (uniqueValue(buffer) && buffer.indexOf(element) == -1) {
        result=index;
        break
    }
    buffer.shift()
    buffer.push(element)    
}

// console.log(result)

// Part2

let buffer2 = input.slice(0,14);
let result2 = 0;

for (let index = 14; index < input.length; index++) {
    const element = input[index];
    buffer2.shift()
    buffer2.push(element)    
    console.log(buffer2 + ' ' + element + ' ' + uniqueValue(buffer2))
    if (uniqueValue(buffer2)) {
        result2=index+1;
        break
    }
}

console.log(result2)