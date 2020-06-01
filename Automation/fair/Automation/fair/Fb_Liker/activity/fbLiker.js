let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialFile = process.argv[2];
let pageName = process.argv[3];
let email, pwd, url;
(async function () {

    try {
        let data = await fs.promises.readFile(credentialFile, "utf-8");
        let credentials = JSON.parse(data);
        url = credentials.url;
        email = credentials.email;
        pwd = credentials.pwd;
        let browser = await puppeteer.launch(
            {
                headless: false,
                defaultViewport: null,
                args: ["--start-maximized", "--disable-notifications"]
            });
        let numberofPages = await browser.pages();
        let tab = numberofPages[0];

        console.log("Login Successful")
        //************************** */
        //goto page
        await tab.goto(`https://www.facebook.com/${pageName}/`, { waitUntil: "networkidle0" });
        //await tab.waitForNavigation( { waitUntil : "networkidle2"});
        //then login
        await tab.waitForSelector("#email");
        await tab.type("#email", email, { delay: 100 });
        await tab.waitForSelector("#pass");
        await tab.type("#pass", pwd, { delay: 100 });
        await tab.waitForSelector("#loginbutton");
        await tab.click("#loginbutton");
        //click on posts icon
        await Promise.all(tab.click("div[data-key='tab_posts']") , tab.waitForNavigation( { waitUntil : "networkidle2"}));
        await tab.waitForNavigation( { waitUntil : "networkidle0"});   //when clicked on post two address changes
        

    }
    catch(err)
    {
        console.log(err);
    }
})()