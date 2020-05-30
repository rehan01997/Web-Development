let fs = require("fs");
console.log("start")

let fRpromises = fs.promises.readFile("f1.txt");
console.log(fRpromises);

fRpromises.then(function(data)
                {
                    console.log("Inside data");
                    console.log(data + " ");
                })
fRpromises.catch( function ( err )
                {   console.log("Inside catch")
                    console.log(err.message);
                })
console.log("move to next work")
