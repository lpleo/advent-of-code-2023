let path = require('path');
let handleFile = require("../common/handleFile");


let test1 = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
]
let test2 = []

let cardsvalue = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

let cardsvalue2 = {
    "J": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "Q": 12,
    "K": 13,
    "A": 14,
}

console.log("PT1 TEST: " + partOne(test1));
console.log("PT1 RUN : " + partOne(handleFile.readDataFile1(path.basename(__filename, '.js'))))
console.log("PT2 TEST: " + partTwo(test2.length === 0 ? test1 : test2))
console.log("PT2 RUN : " + partTwo(handleFile.readDataFile2(path.basename(__filename, '.js'))))

function partOne(rows) {
    let ordered
    let hands = [];
    rows.forEach(row => {
        let cards = row.split(" ")[0].split("");

        let hand = {bet: parseInt(row.split(" ")[1]), cards: row.split(" ")[0], sets: [], type: 1.0}
        hand.sets = cards.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        hand.sets = Object.keys(hand.sets).map(key => [key, hand.sets[key]])
        let orderedSets = [...hand.sets];
        orderedSets.sort((set1, set2) => {
            if (set1[1] < set2[1]) return 1;
            if (set1[1] > set2[1]) return -1;
            if (set1[1] === set2[1]) {
                return (cardsvalue[set1[0]] < cardsvalue[set2[0]]) ? 1 : -1
            }
        })

        if (orderedSets[0][1] === 5) hand.type = 5.0
        if (orderedSets[0][1] === 4) hand.type = 4.0
        if (orderedSets[0][1] === 3) hand.type = 3.0
        if (orderedSets[0][1] === 3) orderedSets.length > 1 && orderedSets[1][1] === 2 ? hand.type = 3.1 : hand.type = 3.0
        if (orderedSets[0][1] === 2) orderedSets.length > 1 && orderedSets[1][1] === 2 ? hand.type = 2.1 : hand.type = 2.0
        hands.push(hand)
    })

    hands = hands.sort((hand1, hand2) => {
        if (hand1.type > hand2.type) {
            return 1;
        }
        if (hand1.type < hand2.type) {
            return -1;
        }
        let cards = hand1.cards.split("");
        for (let i = 0; i < cards.length; i++) {
            let valore1 = cardsvalue[hand1.cards.split("")[i]];
            let valore2 = cardsvalue[hand2.cards.split("")[i]];
            if (valore1 > valore2) {
                return 1;
            }
            if (valore1 < valore2) {
                return -1;
            }
        }
        return 0;
    })
    return hands.map((hand, index) => {
        return (hand.bet * (index + 1))
    }).reduce((prev, curr) => prev + curr, 0)
}

function partTwo(rows) {
    let hands = [];
    rows.forEach(row => {
        let cards = row.split(" ")[0].split("");
        let hand = {bet: parseInt(row.split(" ")[1]), cards: row.split(" ")[0], sets: [], type: 1.0, typeReplaced: 1.0}
        hand.sets = cards.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        hand.sets = Object.keys(hand.sets).map(key => [key, hand.sets[key]])
        let orderedSets = [...hand.sets];
        orderedSets.sort((set1, set2) => {
            if (set1[1] < set2[1]) return 1;
            if (set1[1] > set2[1]) return -1;
            if (set1[1] === set2[1]) {
                return (cardsvalue2[set1[0]] < cardsvalue2[set2[0]]) ? 1 : -1
            }
        })

        if (hand.cards.includes("J") && hand.cards !== "JJJJJ") {
            hand.cardsReplaced = hand.cards.replaceAll("J", orderedSets.find(os => os[0] !== "J")[0]);
        } else if(hand.cards === "JJJJJ") {
            hand.cardsReplaced = "AAAAA";
        } else {
            hand.cardsReplaced = hand.cards;
        }

        hand.setsReplaced = hand.cardsReplaced.split("").reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});
        hand.setsReplaced = Object.keys(hand.setsReplaced).map(key => [key, hand.setsReplaced[key]])
        orderedSets = [...hand.setsReplaced];
        orderedSets.sort((set1, set2) => {
            if (set1[1] < set2[1]) return 1;
            if (set1[1] > set2[1]) return -1;
            if (set1[1] === set2[1]) {
                return (cardsvalue2[set1[0]] < cardsvalue2[set2[0]]) ? 1 : -1
            }
        })


        if (orderedSets[0][1] === 5) hand.typeReplaced = 5.0
        if (orderedSets[0][1] === 4) hand.typeReplaced = 4.0
        if (orderedSets[0][1] === 3) hand.typeReplaced = 3.0
        if (orderedSets[0][1] === 3) orderedSets.length > 1 && orderedSets[1][1] === 2 ? hand.typeReplaced = 3.1 : hand.typeReplaced = 3.0
        if (orderedSets[0][1] === 2) orderedSets.length > 1 && orderedSets[1][1] === 2 ? hand.typeReplaced = 2.1 : hand.typeReplaced = 2.0
        hands.push(hand)
    })

    hands = hands.sort((hand1, hand2) => {
        if (hand1.typeReplaced > hand2.typeReplaced) {
            return 1;
        }
        if (hand1.typeReplaced < hand2.typeReplaced) {
            return -1;
        }
        for (let i = 0; i < 5; i++) {
            let valore1 = cardsvalue2[hand1.cards.split("")[i]];
            let valore2 = cardsvalue2[hand2.cards.split("")[i]];
            if (valore1 > valore2) {
                return 1;
            }
            if (valore1 < valore2) {
                return -1;
            }
        }
        return 0;
    })
    
    return hands.map((hand, index) => {
        return (hand.bet * (index + 1))
    }).reduce((prev, curr) => prev + curr, 0)
}