let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "Time:      7  15   30",
    "Distance:  9  40  200"
]
let test2 = []

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2.length === 0 ? test1 : test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    let times = [...rows[0].matchAll(RegExp('[0-9]+', 'g'))];
    let distances = [...rows[1].matchAll(RegExp('[0-9]+', 'g'))];

    return times.map((timeArray, index) => {
        let time = parseInt(timeArray[0])
        let counter = 0;
        for (let v = 0; v < time; v++) {
            // v = s/t => s = v*t
            let distance = parseInt(distances[index][0])
            let s = v * (time - v);
            if (s > distance) {
                counter++;
            }
        }
        return counter;
    }).reduce((prev, curr) => prev * curr, 1)
}

function partTwo(rows) {
    let times = parseInt([...rows[0].matchAll(RegExp('[0-9]+', 'g'))].reduce((prev, curr) => prev + "" + curr[0], ""));
    let distances = parseInt([...rows[1].matchAll(RegExp('[0-9]+', 'g'))].reduce((prev, curr) => prev + "" + curr[0], ""));

    let counter = 0;
    for (let v = 0; v < times; v++) {
        let s = v * (times - v);
        if (s > distances) {
            counter++;
        }
    }
    return counter;
}