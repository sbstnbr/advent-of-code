// Start 17/12/23 16:05

const path = require('path');
const fs = require('fs');

const parseGame = input => {
    // Define a regular expression to extract the game id and throws
    const regex = /Game (\d+): (.+)/;

    // Extract the game id and throws using the regular expression
    const match = input.match(regex);

    if (match) {
        // Extract game id and throws from the match
        const gameId = parseInt(match[1]);
        const throwsArr = match[2].split(';');
        // Define a regular expression to extract individual throws
        const throwRegex = /(\d+) (red|blue|green)/g;

        // Initialize an array to store the throws
        const throws = [];

        throwsArr.forEach(element => {
            // Iterate through each match of throws in the input
            let throwMatch;
            let throwItem = {"red":0, "blue":0, "green":0};
            while ((throwMatch = throwRegex.exec(element)) !== null) {
                const count = parseInt(throwMatch[1]);
                const color = throwMatch[2];

                // Create a throw object and push it to the throws array
                const throwObject = { [color]: count };
                throwItem = {...throwItem, ...throwObject}
            }
            throws.push(throwItem);
        });
        

        // Create the final game object
        const gameObject = {
            gameId: gameId,
            throws: throws
        };
        return gameObject;
    } else {
        console.log('Invalid input format');
    }
    
}

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
    .split('\n')
    .map(parseGame)
    

const possibleGame = {
    "red":12,
    "green":13,
    "blue":14
}

const isPossibleThrow = throwElt => {
    return throwElt.red <= possibleGame.red && throwElt.green <= possibleGame.green && throwElt.blue <= possibleGame.blue
}

const isPossibleGame = game => {
    return game.throws.every(isPossibleThrow)
}

const result = input
    .map(game => ({...game, isPossible:isPossibleGame(game)}))
    .filter(game => game.isPossible)
    .reduce((acc, game) => acc + game.gameId, 0)

// Part1
const part1 = result
console.log(part1)

// Part2

const minGame = game => {
    return {
        red: Math.max(...game.throws.map(throwElt => throwElt.red)),
        green: Math.max(...game.throws.map(throwElt => throwElt.green)),
        blue: Math.max(...game.throws.map(throwElt => throwElt.blue))
    }
}
const part2 = input
    .map(game => ({...game, minGame:minGame(game)}))
    .map(game => game.minGame.red * game.minGame.green * game.minGame.blue)
    .reduce((acc, game) => acc + game, 0)
console.log(part2)
