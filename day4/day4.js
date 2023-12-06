let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"
]
let test2 = []

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2.length === 0 ? test1 : test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    return rows.map(row => {
        let dataPre = row.split(": ")[0]
        let dataPost = row.split(": ")[1]
        let games = dataPost.split(" | ");
        let givenNumbers = games[0].split(" ").filter(n => isNumeric(n)).map(n => parseInt(n))
        let myNumbers = games[1].split(" ").filter(n => isNumeric(n)).map(n => parseInt(n))
        return myNumbers.map(myNumber => givenNumbers.find(givenNumber => myNumber === givenNumber) !== undefined ? 1 : 0).reduce((p, c) => c === 0 ? p : (p === 0) ? 1 : (2 * p), 0);
    }).reduce((p, c) => p + c, 0)
}

function partTwo(rows) {
    rows = rows.map(row => ({row, numberOfLines: 1}))
    rows.forEach((data, index) => {
        let row = data.row
        let dataPost = row.split(": ")[1]
        let games = dataPost.split(" | ");
        let givenNumbers = games[0].split(" ").filter(n => isNumeric(n)).map(n => parseInt(n))
        let myNumbers = games[1].split(" ").filter(n => isNumeric(n)).map(n => parseInt(n))
        let result = myNumbers.map(myNumber => givenNumbers.find(givenNumber => myNumber === givenNumber) !== undefined ? 1 : 0).reduce((p, c) => c === 0 ? p : p + 1, 0);
        for (let i = 1; i <= data.numberOfLines; i++) {
            for (let j = 1; j <= result; j++) {
                rows[index + j].numberOfLines += 1;
            }
        }
    })
    return rows.reduce((p, c) => p + c.numberOfLines, 0)
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}