let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

let seriesId = process.argv[2]; //19322
let commentaryId = process.argv[3];  //1187684

let url = `https://www.espncricinfo.com/series/${seriesId}/scorecard/${commentaryId}/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20`;


console.log("sending Request");
request( url , function( err , response , data)
    {
        console.log("Data Recieved");
        if( err === null && response.statusCode === 200)
        {
            fs.writeFileSync("Bowlers.html" , data);
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

        let bowlersArr = $(".table.bowler tbody tr");
        //console.log(bowlersArr.text());

        for( let i = 0 ; i < bowlersArr.length ; i++)
        {
            //name
            let name = $($(bowlersArr[i]).find("td")[0]).text();
            let wickets = $($(bowlersArr[i]).find("td")[4]).text();

            console.log(name +" " + wickets);
        }
    }
   console.log("##############")
   console.log("###########");
