let puppeteer = require("puppeteer");

(async function()
{
    let browser = await puppeteer.launch(
        {
            headless : false,
            defaultViewport : null ,
            args :["--start-maximized" , "--incognito"]
        });
    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];
    //goo page
    await tab.goto("https://www.google.com");
})()