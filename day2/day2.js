let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
]

let test2 = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
]

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    let totalcubes = {
        "red": 12,
        "green": 13,
        "blue": 14
    }
    return rows.map(row => {
        let dataPre = row.split(": ")[0]
        let dataPost = row.split(": ")[1]
        let gameNumber = parseInt(dataPre.split(" ")[1]);
        let legalGame = true;
        dataPost.split("; ").forEach(game => {
            game.split(/, /).forEach(round => {
                let quantity = parseInt(round.split(" ")[0])
                let color = round.split(" ")[1];
                if (quantity > totalcubes[color]) {
                    legalGame = false;
                }
            })
        })
        return (legalGame) ? gameNumber : 0
    }).reduce((p, c) => p + c, 0)
}

function partTwo(rows) {
    return rows.map(row => {
        let dataPost = row.split(": ")[1]
        let maxByColor = {
            'red': 0,
            'green': 0,
            'blue': 0
        }
        dataPost.split("; ").forEach(game => {
            game.split(/, /).forEach(round => {
                let quantity = parseInt(round.split(" ")[0])
                let color = round.split(" ")[1];
                if (maxByColor[color] < quantity) maxByColor[color] = quantity;
            })
        })
        return Object.values(maxByColor).reduce((p, c) => p * c, 1);
    }).reduce((p, c) => p + c, 0)
}