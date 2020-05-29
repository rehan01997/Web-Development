let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// series id=19322,1187684
let seriesId = process.argv[2];
let url = `https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results`;
// npm install request 
let count = 0;
let learderBoard = []; //arary
console.log("sending Request");
request(url, function (err, response, data) {
    console.log("Data Recieved");
    // console.log(response);clear
    if (err === null && response.statusCode === 200) {
        fs.writeFileSync("series.html", data);
        parseHTML(data);
        console.log("Processing Data");
    } else if (response.statusCode === 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(response.statusCode)
    }
})

function parseHTML(data) {
    // page => cheerio
    // load => html 
    let $ = cheerio.load(data);
    // Page=> selector pass  => text => text
    console.log("########################");
    let AllCards = $(".match-score-block");
    // console.log(AllCards.length);
    for (let i = 0; i < AllCards.length; i++) {
        let matchType = $(AllCards[i]).find("p.small.match-description").text();
        let test = matchType.includes("ODI") || matchType.includes("T20I");
        if (test == true) {
            // console.log(matchType);
            let link = $(AllCards[i]).find(".match-cta-container a[data-hover]").attr("href");
            let fullLink = `https://www.espncricinfo.com/${link}`;
            count++;
            matchHandler(fullLink);
        }
    }
    console.log("########################")
    // console.log(text);
}
function matchHandler(link) {
    request(link, function (err, response, data) {
        if (err === null && response.statusCode === 200) {
            fs.writeFileSync(`match${count}.html`, data);
            count--;
            handleEachMatch(data);
            if( count == 0)  //when all data is procssed
            {
                console.table( learderBoard )
            }
        } else if (response.statusCode === 404) {
            console.log("Page Not found");
        } else {
            console.log(err);
            console.log(response.statusCode)
        }
    })
}
function handleEachMatch(data) {
    let $ = cheerio.load(data);
    let format = $(".match-page-wrapper .desc.text-truncate").text();

    if( format.includes("ODI"))
    {
        format = "ODI";
    }
    else
    {
        format = "T20I";
    }
    console.log(format);

    let iningsArr = $(".match-scorecard-table"); //we have three tables india ining , nz ining,stats

    let fti = iningsArr[0];
    let sfi = iningsArr[1];

    //team name  fti
    let ftiName = $(fti).find(".header-title.label").text();
    let fInningPlayers = $(fti).find(".table.batsman tbody tr");

    console.log(ftiName);   //india innings(50 overs)
    ftiName = ftiName.split("Innings")[0] // india
    for (let i = 0; i < fInningPlayers.length; i++) {
        let isBatsman = $(fInningPlayers[i]).find("td").hasClass("batsman-cell");
        if (isBatsman == true) {
            let pName = $($(fInningPlayers[i]).find("td")[0]).text();
            let runs = $($(fInningPlayers[i]).find("td")[2]).text();
            //console.log(pName + " " + runs);
            createLeaderBoard( pName , format , runs , ftiName);
        }
    }
    console.log("----------------------");

    //team name sfi
    let stiName = $(fti).find(".header-title.label").text();
    let sInningPlayers = $(fti).find(".table.batsman tbody tr");

    console.log(stiName);
    stiName = stiName.split("Innings")[0]
    for (let i = 0; i < sInningPlayers.length; i++) {
        let isBatsman = $(fInningPlayers[i]).find("td").hasClass("batsman-cell");
        if (isBatsman == true) {
            let pName = $($(fInningPlayers[i]).find("td")[0]).text();
            let runs = $($(fInningPlayers[i]).find("td")[2]).text();
            //console.log(pName + " " + runs);
            createLeaderBoard( pName , format , runs , stiName);
        }
    }
    console.log("##################");
}
function createLeaderBoard( name , format , runs , team)
{
    runs = parseInt(runs);   //to convert into integers

    for(let i = 0 ; i < learderBoard.length ; i++)
    {
        let player = learderBoard[i];
        if( player.Name === name && player.Team === team && player.Format === format)
        {
            //update runs
            //retunr;
            player.Total += runs;
            return;
        }
    }
    //creae new Player
    let pObj = {
        Name : name,
        Format : format,
        Total : runs,
        Team : team
    }
    //aadd to leaderboard
    learderBoard.push(pObj);
}