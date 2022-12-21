const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

const convertToPrio = (item => {
    const shift = item == item.toLowerCase() ? 96 : 38
    return item.charCodeAt()-shift
})

const findDuplicate = (arr => {
    const mid = arr.length / 2
    let result = 0
    for(let i = 0; i<mid;i++){
        for(let j = 0; j<mid; j++){
            if(arr[i]==arr[arr.length-1-j]){
                result = arr[i]
                break
            }
        }
    }
    return result;
})

const removeDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

const mergeArrayByChunksOf3 = arr => {
    const chunk = 3;
    const result = []
    for(let i = 0; i<arr.length/chunk;i++){
        const temp = [];
        temp.push(...arr[i*chunk])
        temp.push(...arr[i*chunk+1])
        temp.push(...arr[i*chunk+2])
        result.push(temp)
    }
    return result
}

const findTrio = arr => {
    let result = 0;
    for(let i=0;i<arr.length-2;i++){
        if(arr[i]==arr[i+1] && arr[i]==arr[i+2]){
            result = arr[i]
            break;
        }
    }
    return result;
}

// Part1

const result = input
    .map(rucksack => {
        return findDuplicate(rucksack
            .split('')
            .map(convertToPrio))
            // .map(findDuplicate)
    })
    .reduce((a,b)=>a+b,0)

console.log(result)

// Part2
let result2 = input
    .map(rucksack => {
        const temp = rucksack
            .split('')
            .map(convertToPrio)
            .sort()
        return removeDuplicates(temp)
    })
// console.log(result2)

result2 = mergeArrayByChunksOf3(result2)
    .map(elfGroup => {
        return findTrio(elfGroup.sort())
        // return elfGroup.sort()
    })
    .reduce((a,b)=>a+b,0)

console.log(result2)
