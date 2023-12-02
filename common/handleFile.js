let read = require('read-file');
const fs = require("fs");
let readFile = function (filepath) {
    return read.sync(filepath, { normalize: true });
}

let readDataFile1 = function (testName) {
    let fileData1 = `../${testName}/${testName}_data1.txt`
    return readFile(fileData1).toString().split("\n");
}

let readDataFile2 = function (testName) {
    let fileData2 = `../${testName}/${testName}_data2.txt`
    if (!fs.existsSync(fileData2)) {
        return readDataFile1(testName)
    }
    return readFile(fileData2).toString().split("\n")
}

module.exports = {
    readFile: readFile,
    readDataFile1: readDataFile1,
    readDataFile2: readDataFile2
}

