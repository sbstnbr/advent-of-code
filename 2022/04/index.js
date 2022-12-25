const path = require('path');
const fs = require('fs');

// Input

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

// Utils

const includes = (a,b) => {
    if(parseInt(a[0])<=parseInt(b[0]) 
        && 
        parseInt(a[1])>=parseInt(b[1])){
            return true;
    }
    return false
}

const intersects = (a,b) => {
    if(parseInt(a[0])<=parseInt(b[0]) && parseInt(a[1])>=parseInt(b[0])
    ||
    parseInt(b[0])<=parseInt(a[0]) && parseInt(b[1])>=parseInt(a[0])
    ){
        return true;
    }
    return false
}

// Part1

const result = input
    .map(pair => 
        pair.split(',')
    )
    .map(elves => {
        const left = elves[0].split('-')
        const right = elves[1].split('-')
        return + (includes(left,right) || includes(right,left));
    })
    .reduce((a,b)=>a+b,0)

console.log(result)

// Part2

const result2 = input
    .map(pair => 
        pair.split(',')
    )
    .map(elves => {
        const left = elves[0].split('-')
        const right = elves[1].split('-')
        console.log([left,right]+intersects(left,right))
        return + (intersects(left,right));
    })
    .reduce((a,b)=>a+b,0)

console.log(result2)