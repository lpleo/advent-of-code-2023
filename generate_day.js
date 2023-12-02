let fs = require('fs')

let day = 'day' + new Date().getDate()

fs.mkdirSync(`./${day}`)
fs.appendFile(`./${day}/${day}_data1.txt`, '', (err) => {
    if (err) throw err;
});
fs.copyFile('_template.js', `./${day}/${day}.js`, (err) => {
    if (err) throw err;
});