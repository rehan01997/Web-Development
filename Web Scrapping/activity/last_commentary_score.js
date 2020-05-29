let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

let seriesId = process.argv[2]; //19322
let commentaryId = process.argv[3];  //1187686

let url = `https://www.espncricinfo.com/series/${seriesId}/commentary/${commentaryId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`;


console.log("sending Request");
request( url , function( err , response , data)
    {
        console.log("Data Recieved");
        if( err === null && response.statusCode === 200)
        {
            fs.writeFileSync("index.html" , data);
            parseHTML(data);
            console.log("Processing Data")
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

    function parseHTML(data)
    {
        //page=> cheerio
        let $ = cheerio.load(data);
        //pages=> selector pass => text=> text
        console.log("###########")
        //give concatenated result of the text matching that 

        let AllCArr = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
        let text = $(AllCArr[0]).text();
        console.log(text);
        //console.log(AllCArr);
        console.log("####");
    }
    //https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20
    //<div class="col-2 col-md-1 col-lg-2 match-comment-run-col"><span class="match-comment-over">47<!-- -->.<!-- -->1</span><div class="match-comment-run-container"><div class="match-comment-run match-comment-run-four"

