let request = require("request");
let fs = require("fs");
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187686/new-zealand-vs-india-2nd-test-india-in-new-zealand-2019-20";
console.log("work start");

request( url , function( err , response , data)
    {
        console.log(" come back later");
        if( err === null && response.statusCode === 200)
        {
            fs.writeFileSync("index.html" , data);
        }
        else if( response.statusCode === 404)
        {
            console.log("Page Not Found")
        }
        else
        {
            console.log(err);
            console.log(response.statusCode)
        }
    })
    console.log("Doing Other Stuff")