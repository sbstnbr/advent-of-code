const path = require('path');
const fs = require('fs');

// Input

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
    .split('\n')

const transpose = matrix => matrix[0]
    .map((col, i) => matrix.map(row => row[i]))


const stacksTemp = input
    .slice(0,8)
    .map(level => level
        .split('')
        .filter((val,index)=> (index - 1) % 4 == 0)
    )

let stacks = transpose(stacksTemp)
    .map(stack => stack
        .reverse()
        .filter(crane => crane != ' ')
    )

const instructions = input
    .slice(10)
    .map(instruction => instruction
        .split(' ')
        )
    .map(arr => [arr[1],arr[3],arr[5]])

// Utils

const moveCranesWithCrateMover9000 = (stacks, nbCranes, from, to) => {
    for (let index = 0; index < nbCranes; index++) {
        const crate = stacks[from-1].pop()
        stacks[to-1].push(crate)
        // console.log(crate)
    }
    // console.log(stacks)
}

const moveCranesWithCrateMover9001 = (stacks, nbCranes, from, to) => {
    const crates = []
    for (let index = 0; index < nbCranes; index++) {
        const crate = stacks[from-1].pop()
        crates.push(crate)
    }
    // console.log(crates)
    stacks[to-1] = stacks[to-1].concat(crates.reverse())
    // console.log(stacks)
}


// Part1

instructions
    .forEach(instruction => 
        moveCranesWithCrateMover9000(stacks, instruction[0], instruction[1], instruction[2])
    )

const result = stacks
    .map(stack => stack[stack.length-1])
    .join('')

console.log(result)
// Part2

const stacks2 = transpose(stacksTemp)
.map(stack => stack
    .reverse()
    .filter(crane => crane != ' ')
)

instructions
    .forEach(instruction => 
        moveCranesWithCrateMover9001(stacks2, instruction[0], instruction[1], instruction[2])
    )

const result2 = stacks2
    .map(stack => stack[stack.length-1])
    .join('')

console.log(result2)