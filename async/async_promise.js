// Requiring prompt-sync module to enable synchronous user input
let prompt = require('prompt-sync')();

let fs = require("fs");

// Creating a new Promise to handle file reading
const mcall = new Promise((resolve, reject) => {
    let filename = prompt("name of file?");

    try {
        const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r'});
        resolve(data);
    } catch(err) {
        reject(err);
    }
});

console.log(mcall);

mcall.then(
    (data) => console.log(data),
    (err) => console.log("Error reading file")
);