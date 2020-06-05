let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialFile = process.argv[2];
let pageName = process.argv[3];
let noOfPostToLike = process.argv[4];

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
        await tab.goto(`https://www.facebook.com/${pageName}/`, { waitUntil: "networkidle2" });
        //await tab.waitForNavigation( { waitUntil : "networkidle2"});
        //then login

        await tab.waitForSelector("#email");
        await tab.type("#email", email, { delay: 100 });
        await tab.waitForSelector("#pass");
        await tab.type("#pass", pwd, { delay: 100 });
        await tab.waitForSelector("#loginbutton");
        await tab.click("#loginbutton");
        //click on posts icon
        // await Promise.all(tab.click("div[data-key='tab_posts']"), tab.waitForNavigation({ waitUntil: "networkidle2" }));
        await tab.waitForNavigation({ waitUntil: "domcontentloaded" });
        await Promise.all([tab.waitForNavigation({ waitUntil: "networkidle2" }), tab.click('div[data-key="tab_posts"]'),]);

        let idx = 0;
        do {
            // _1xnd> ._4-u2.4-u8
            await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
            let allposts = await tab.$$("#pagelet_timeline_main_column ._1xnd> ._4-u2._4-u8");
            console.log(allposts.length);
            let cPost = allposts[idx];
            let cPostLike = await cPost.$("._666k ._8c74 a");
            await cPostLike.click({ delay: 200 });
            idx++;

            await tab.waitForSelector(".uiMorePagerLoader", { hidden: true });
        } while (idx < noOfPostToLike)
    }
    catch (err) {
        console.log(err);
    }
})()