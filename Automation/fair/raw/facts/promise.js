let fs = require("fs");

let fp = fs.promises.readFile("f1.txt");
console.log(fp);
// fp.then( function scb()
// {
//     console.log("Inside scb");
// },function fcb()
// {
//     console.log("Inside fcb");
// }).then( function scb1()
// {
//     console.log("Inside scb1");
// },function fcb1()
// {
//     console.log("inside fcb1");
// })

setTimeout( function()
{
    console.log(fp)
},1000)