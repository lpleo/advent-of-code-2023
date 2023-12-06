let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4"
]
let test2 = []

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2.length === 0 ? test1 : test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    let seeds = rows[0].split(": ")[1].split(" ").map(t => parseInt(t));
    let maps = getMaps(rows);

    return seeds.map(seed => {
        let status = seed;
        maps.forEach(map => {
            let touched = false;
            map.coordinates.forEach(coordinate => {
                if (coordinate.source <= status && status <= (coordinate.source + coordinate.range)) {
                    if (!touched) {
                        status = coordinate.destination + (status - coordinate.source);
                        touched = true;
                    }
                }
            })
        })
        return status;
    }).reduce((p, c) => (c < p) ? c : p, Number.MAX_VALUE)
}

function partTwo(rows) {
    let seedsRange = rows[0].split(": ")[1].split(" ").reduce((acc, val, idx) =>
        idx % 2 !== 0
            ? (acc ? `${acc} ${val}` : `${val}`)
            : idx == 0 ? `${val}` : `${acc},${val}`, '')
        .split(",").map(r => r.split(" ")).map(r => r.map(e => parseInt(e)))

    console.log(seedsRange)
    let maps = getMaps(rows);
    
    /*let lowerCoordinates = maps[maps.length - 1].coordinates.reduce((p, c) => c.destination < p.destination ? c : p, maps[maps.length - 1].coordinates[0])
    console.log(maps[maps.length - 1].name + " " + JSON.stringify(lowerCoordinates))
    maps.reverse().forEach((map, index) => {
        if (index !== 0) {
            let found = false;
            map.coordinates.forEach(coordinate => {
                if (coordinate.destination <= lowerCoordinates.source <= (coordinate.destination + coordinate.range)) {
                    if (!found) {
                        found = true;
                        console.log(map.name + " " + JSON.stringify(coordinate))
                        lowerCoordinates = coordinate;
                    }
                }
            })
        }
    })
    
    console.log(lowerCoordinates);*/

    return seedsRange.map(seedRange => {
        let rangeStatus;
        console.log("analyzing seed " + seedRange)
        for (let i = seedRange[0]; i < (seedRange[0] + seedRange[1]); i++) {
            if(i%10000000 === 0) {
                console.log(seedRange + " " + i)
            }
            let status = i;
            maps.forEach(map => {
                let touched = false;
                map.coordinates.forEach(coordinate => {
                    if (coordinate.source <= status && status <= (coordinate.source + coordinate.range)) {
                        if (!touched) {
                            status = coordinate.destination + (status - coordinate.source);
                            touched = true;
                        }
                    }
                })
            })
            if (rangeStatus === undefined) rangeStatus = status;
            if (status < rangeStatus) rangeStatus = status;
        }
        return rangeStatus;
    }).reduce((p, c) => (c < p) ? c : p, Number.MAX_VALUE)
}

function getMaps(rows) {
    let maps = [];
    let map = {};
    rows.forEach((row, index) => {
        if (index !== 0 && index !== 1) {
            if (row.includes("map")) {
                map.name = row.split(" ")[0];
            } else if (row !== "") {
                if (!map.coordinates) {
                    map.coordinates = []
                }
                map.coordinates.push({
                    destination: parseInt(row.split(" ")[0]),
                    source: parseInt(row.split(" ")[1]),
                    range: parseInt(row.split(" ")[2])
                })
            } else {
                if (map) {
                    maps.push(map);
                }
                map = {}
            }
        }
    })
    maps.push(map)
    return maps
}