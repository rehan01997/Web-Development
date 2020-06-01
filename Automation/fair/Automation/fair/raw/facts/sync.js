let fs = require("fs")

console.log("Before");
let data = fs.readFileSync("f1.txt");
console.log(data + " ");
console.log("after")