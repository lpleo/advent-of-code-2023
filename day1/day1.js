let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet"
]

let test2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
]

let cifre = [
    {chiave: "one", valore: 1},
    {chiave: "two", valore: 2},
    {chiave: "three", valore: 3},
    {chiave: "four", valore: 4},
    {chiave: "five", valore: 5},
    {chiave: "six", valore: 6},
    {chiave: "seven", valore: 7},
    {chiave: "eight", valore: 8},
    {chiave: "nine", valore: 9}
];

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))
 
function partOne(data) {
    return data.map(r =>
        parseInt(r.split("").find(c => /^\d$/.test(c)) + r.split("").findLast(c => /^\d$/.test(c)))
    ).reduce((p, c) => p + c, 0)
}

function partTwo(data) {
    return data.map(r => parseStringPart2(r)).reduce((p, c) => p + c, 0)
}

function parseStringPart2(r) {
    let indexCifra =
        cifre
            .map(cifra => ({cifra, indice: r.indexOf(cifra.chiave)}))
            .filter(cifra => cifra.indice !== -1)
            .reduce((prev, curr) => (curr.indice < prev.indice) ? curr : prev, {indice: Number.MAX_VALUE})
    let indexNumero = r.split("").findIndex(c => /^\d$/.test(c));
    indexNumero = (indexNumero === -1) ? Number.MAX_VALUE : indexNumero;
    
    let indexLastCifra =
        cifre
            .map(cifra => ({cifra, indice: r.lastIndexOf(cifra.chiave)}))
            .filter(cifra => cifra.indice !== -1)
            .reduce((prev, curr) => (curr.indice > prev.indice) ? curr : prev, {indice: -1})
    let indexLastNumero = r.split("").findLastIndex(c => /^\d$/.test(c))

    let numIniziale = indexCifra.indice < indexNumero ? indexCifra.cifra.valore : r.split("")[indexNumero];
    let numFinale = indexLastCifra.indice > indexLastNumero ? indexLastCifra.cifra.valore : r.split("")[indexLastNumero];

    let result = numIniziale + "" + numFinale;
    return parseInt(result);
}