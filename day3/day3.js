let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598.."
]
let test2 = []

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2.length === 0 ? test1 : test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    let result = 0;
    rows.forEach((row, rowindex) => {
        let matches = [...row.matchAll(RegExp('[0-9]+', 'g'))];
        matches.forEach(numberData => {
            let number = numberData[0]
            let startIndex = numberData['index'];
            let numberValid = false;
            while (startIndex < rows[rowindex].length && rows[rowindex][startIndex].match(/^\d$/)) {
                let rwmm1 = (rowindex - 1) < 0 ? rowindex : (rowindex - 1)
                let rwmp1 = (rowindex + 1) >= rows.length ? rowindex : (rowindex + 1)
                let sim1 = (startIndex - 1) < 0 ? startIndex : (startIndex - 1)
                let sip1 = (startIndex + 1) >= row.length ? startIndex : (startIndex + 1)
                let values = [
                    rows[rwmm1][sim1], rows[rwmm1][startIndex], rows[rwmm1][sip1],
                    rows[rowindex][sim1], rows[rowindex][sip1],
                    rows[rwmp1][sim1], rows[rwmp1][startIndex], rows[rwmp1][sip1]
                ];
                numberValid |= values.filter(value => value && value !== '.' && !value.match(/[0-9]/)).length > 0;
                startIndex++;
            }
            if (numberValid) {
                result += parseInt(number)
            }
        })
    })
    return result;
}

function partTwo(rows) {
    let numberPerimeters = [];
    rows.forEach((row, rowindex) => {
        let matches = [...row.matchAll(RegExp('[0-9]+', 'g'))];
        matches.forEach(numberData => {
            let number = numberData[0]
            let startIndex = numberData['index'];
            let numberValid = false;
            let gears = [];
            while (startIndex < rows[rowindex].length && rows[rowindex][startIndex].match(/^\d$/)) {
                let rwmm1 = (rowindex - 1) < 0 ? rowindex : (rowindex - 1)
                let rwmp1 = (rowindex + 1) >= rows.length ? rowindex : (rowindex + 1)
                let sim1 = (startIndex - 1) < 0 ? startIndex : (startIndex - 1)
                let sip1 = (startIndex + 1) >= row.length ? startIndex : (startIndex + 1)
                let values = [
                    {x: rwmm1, y:sim1, res: rows[rwmm1][sim1]}, 
                    {x: rwmm1, y:startIndex, res: rows[rwmm1][startIndex]},
                    {x: rwmm1, y:sip1, res: rows[rwmm1][sip1]},
                    {x: rowindex, y:sim1, res: rows[rowindex][sim1]},
                    {x: rowindex, y:sip1, res: rows[rowindex][sip1]},
                    {x: rwmp1, y:sim1, res: rows[rwmp1][sim1]},
                    {x: rwmp1, y:startIndex, res: rows[rwmp1][startIndex]},
                    {x: rwmp1, y:sip1, res: rows[rwmp1][sip1]}
                ];
                gears.push(...values.filter(value => value.res && value.res === '*'));
                startIndex++;
            }
            if (gears.length > 0) {
                numberPerimeters.push({number, gears})
            }
        })
    })
    
    let result = 0;
    for(let i=0; i<numberPerimeters.length; i++) {
        let numberPerimeter = numberPerimeters[i];
        for(let j= i+1; j<numberPerimeters.length; j++) {
            let otherNumberParameter = numberPerimeters[j];
            let matchingGear = numberPerimeter.gears.find(gear => otherNumberParameter.gears.find(otherGear => otherGear.x === gear.x && otherGear.y === gear.y))
            if(matchingGear) {
                if(matchingGear && (!numberPerimeter.touched || !otherNumberParameter.touched)) {
                    numberPerimeter.touched = true;
                    otherNumberParameter.touched = true;
                    result += numberPerimeter.number * otherNumberParameter.number;
                }
            }
        }
    }
    
    return result;

}