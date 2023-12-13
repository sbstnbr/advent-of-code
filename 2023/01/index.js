// Start: 10:25
// End: 11:36

const path = require('path');
const fs = require('fs');

const concatFirstAndLastString = (array) => {
    const first = array[0]
    const last = array[array.length-1]
    return first.concat(last)
}

// Replace string with numbers
const replaceStringWithNumber = (string) => {
    const digits = {
        'one': 'o1e',
        'two': 't2o',
        'three': 't3e',
        'four': 'f4r',
        'five': 'f5e', 
        'six': 's6x',
        'seven': 's7n',
        'eight': 'e8t',
        'nine': 'n9e'
    }
    Object.keys(digits).forEach((key) => {
        string = string.replaceAll(key, digits[key]);
      });
    return string;
}

const isValidDigit = (digit) => {
    return !isNaN(digit)
}
    
const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
    .map(replaceStringWithNumber)
    .map(line => line.split(''))


const calibration = input
    .map(line => {
        return line
            .filter(isValidDigit)
    })
    .map(concatFirstAndLastString)
    .reduce((acc, val) => acc + parseInt(val), 0)

// Part1
console.log(calibration)

// Part2
console.log(replaceStringWithNumber('zerozeroneightwoneleventyoneighthreeight'))
