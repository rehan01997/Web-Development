let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");    //to load data
let puppeteer = require("puppeteer");
//request url
let url = `https://www.covid19india.org/`;
let covidTable = [];

(async function () {
    let browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        }
    );
    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];
    await tab.goto(url, { waitUntil: "domcontentloaded" });
    await tab.waitFor(5000);
    const html = await tab.content();
    await fs.writeFileSync("covid19.html", html); //create a file
    //console.log(html);
    await scrap(html);
   
    //await browser.close();
})()

//load data
async function scrap(html) {
    let $ = cheerio.load(html);
    let allRows = $('.Home .table tbody tr');
    console.log(allRows.length);
    //******************  TABLE ***************************** */
    for (let i = 0; i < allRows.length - 1; i++) {
        let singleRow = $(allRows[i]).find('td');
        //console.log(singleRow.length);
        let stateName = $(singleRow[0]).find('.title-icon').text();
        let cnfrmCase = $(singleRow[1]).find('.total').text();
        let Actv = $(singleRow[2]).find('.total').text();
        let recv = $(singleRow[3]).find('.total').text();
        let deceased = $(singleRow[4]).find('.total').text();
        let pobj = {
            state: stateName,
            confirm: cnfrmCase,
            active: Actv,
            recovered : recv,
            deceased : deceased
        }
        //console.log(pobj)
        covidTable.push(pobj);
    }
    console.table(covidTable);    //print

    //******************************TOTALCASES TABLE******************//    
    let TsingleRow = $(allRows[allRows.length - 1]).find('td');
    let Tcnfrm = $(TsingleRow[1]).find('.total').text();
    let Tactv =  $(TsingleRow[2]).find('.total').text();
    let Trecv =  $(TsingleRow[3]).find('.total').text();
    let Tdeceased =  $(TsingleRow[4]).find('.total').text();
    let pobj ={
        "Total Confirmed" : Tcnfrm,
        "Total Active" : Tactv,
        "Total recovered" : Trecv,
        "Total deceased" : Tdeceased
    }
    console.table(pobj);       //print

    //******************************TODAY NEW CASES TABLE ***********/
   // $ = cheerio.load(html);
    let level = $('.Home .Level');
    let todayNewCaseCnfrm = $(level).find('.level-item.is-confirmed');
    let NewCaseCnfrm = $(todayNewCaseCnfrm).find('h4').text();
    
    let todaynewActive = $(level).find('.level-item.is-active');
    let newActive = $(todaynewActive).find('h4').text();

    let todayNewRecovered = $(level).find('.level-item.is-recovered');
    let NewRecovered = $(todayNewRecovered).find('h4').text();

    let todayNewDeceased = $(level).find('.level-item.is-deceased');
    let NewDeceased = $(todayNewDeceased).find('h4').text();

    let obj = {
        "Confirmed" : NewCaseCnfrm,
        "Active" : newActive,
        "Recovered" : NewRecovered,
        "Deceased" : NewDeceased
    }
    console.table(obj);
}
