let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialFile = process.argv[2];
(async function () {
        let data = await fs.promises.readFile(credentialFile, "utf-8");
        let credentials = JSON.parse(data);
        login = credentials.login;
        email = credentials.email;
        pwd = credentials.pwd;
        let browser = await puppeteer.launch(
            {
                headless: false,
                defaultViewport: null,
                args: ["--start-maximized"]
            });
        let numberOfPages = await browser.pages();
        let tab = numberOfPages[0];
        //goo page
        //await tab.goto("https://www.google.com");
        await tab.goto(login,
            { waitUntil: "networkidle0" });

        //wait for the element
        await tab.waitForSelector("#input-1");
        await tab.type("#input-1", email, { delay: 100 });  //by default wait : 30sec
        await tab.waitForSelector("#input-2");
        await tab.type("#input-2", pwd, { delay: 100 });
        await tab.waitForSelector("button[data-analytics='LoginPassword']");

        await navigationHelper( tab , "button[data-analytics='LoginPassword']")
        //await tab.click("button[data-analytics='LoginPassword']"); we willnot use this even it works ,but somrtimes gives unexpected results...so for this will be using--->
        await tab.waitForSelector("a[data-analytics='NavBarProfileDropDown']");
        await tab.click("a[data-analytics='NavBarProfileDropDown']");
        await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']" , {visible : true});
        await navigationHelper(tab, "a[data-analytics='NavBarProfileDropDownAdministration']")
        //*******************manage challenges PAge ************************8*/

        let manageTabs = await tab.$$(".administration ul li a"); //$$ represents findelements  ans $ represents findelement
        await Promise.all([manageTabs[1].click(), tab.waitForNavigation({
                         waitUntil: "networkidle2"
        })])
        await handleSinglePage(tab, browser);
        console.log("All questions processed");   
})()
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({waitUntil: "networkidle2"}), tab.click(selector)]);
}
async function handleSinglePage( tab  , browser )
{
    await tab.waitForSelector(".backbone.block-center");
    let qonPage = await tab.$$(".backbone.block-center");    //simailar to promise to find elements
    let cPageQSolvedp = [];
    for( let i = 0; i < qonPage.length ; i++)
    {
        let href = await tab.evaluate(function(q)
        {
            return q.getAttribute("href");
        }, qonPage[i]);
    let chref = "https://www.hackerrank.com" + href;
    let newTab = await browser.newPage();

    let cPageQwillBeSolvedp = solveOneQuestion(chref , newTab );
    cPageQSolvedp.push( cPageQwillBeSolvedp);
    }
    //1 page all promise
    await Promise.all(cPageQSolvedp);
    console.log("visited all qustions of one page")
}
async function solveOneQuestion( chref , newTab)
{
    await newTab.goto( chref , { waitUntil : "networkidle0" });
    //await 
    await newTab.waitForSelector("li[data-tab='moderators']");
    await navigationHelper(newTab, "li[data-tab='moderators']");
    await newTab.waitForSelector("#moderator", { visible: true });
    await newTab.type("#moderator", "zeeshan");
    await newTab.keyboard.press("Enter");
    await newTab.waitForSelector(".save-challenge.btn.btn-green")
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
}