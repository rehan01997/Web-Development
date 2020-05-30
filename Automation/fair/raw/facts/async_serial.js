
let fs = require("fs")

let files = ["f1.txt",  "f2.txt" , "f3.txt" , "f4.txt"];
let thenP = fs.promises.readFile(files[0]);
for( let i = 1 ;i <files.length ; i++)
{   
    thenP = thenP.then( function(data)
    {
        console.log( data + " ")
        return fs.promises.readFile(files[i]);
    })
}
thenP. then( function(data)
{
    console.log(data + " ");
})