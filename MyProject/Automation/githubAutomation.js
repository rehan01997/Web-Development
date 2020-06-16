let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let File = process.argv[3];
let Files = require(File);
(async function()
{
    try{
        let data = await fs.promises.readFile(credentialsFile , "utf-8");
    let credentials = JSON.parse(data);

    let loginUrl = credentials.login;
    let email = credentials.email;
    let pwd = credentials.pwd;

    let browser = await puppeteer.launch(
        {
            headless : false,
            defaultViewport : null ,
            args :["--start-maximized"]
        });
    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];

    await tab.goto( loginUrl , { waitUntil : "networkidle0"});
    await tab.waitForSelector('#login_field');
    await tab.type('#login_field' , email , { delay : 100});  //id = 
    await tab.waitForSelector("#password");
    await tab.type('#password' , pwd , { delay : 100 });
    await navigationHelper( tab ,'.btn.btn-primary.btn-block' );
    
    //new repository
    await navigationHelper( tab , '.mb-3.Details.js-repos-container.mt-5 .btn.btn-sm.btn-primary.text-white');
    await tab.waitForSelector('.form-control.js-repo-name.js-repo-name-auto-check.short');
    await tab.type('.form-control.js-repo-name.js-repo-name-auto-check.short' , Files.repositoryName , { delay : 100});
    
    await tab.waitFor(3000);
    await navigationHelper( tab , '#new_repository > div.js-with-permission-fields > button');
    await tab.waitFor(3000);    
    await createFiles( tab , browser);
    }
    catch(err)
    {
        console.log(err);
    }
})()
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({waitUntil: "networkidle2"}), tab.click(selector)]);
}
async function createFiles( tab , browser)
{   
    await tab.waitForSelector('#js-repo-pjax-container > div.container-lg.clearfix.new-discussion-timeline.px-3 > div > git-clone-help-controller > div.Box-header.Box-header--blue > p > a:nth-child(1)');
    //let a = await tab.$$('.Box.Box--spacious.d-block .Box-header.Box-header--blue .mb-0');
    
    let href = await tab.evaluate('document.querySelector("#js-repo-pjax-container > div.container-lg.clearfix.new-discussion-timeline.px-3 > div > git-clone-help-controller > div.Box-header.Box-header--blue > p > a:nth-child(1)").getAttribute("href")')
    console.log("" + href); 
    let codes = Files.data;
    console.log(codes.length);
    let eachFile = [];
    for( let i = 0 ; i < codes.length ; i++)
    {
        let fileName = codes[i].FileName;
        let code = codes[i].code;
        
        let newtab = await browser.newPage();
        let Nthfile = solveEachFile( fileName , code , newtab , href);
        eachFile.push(Nthfile);
        
    }
    await Promise.all( eachFile);
    await navigationHelper(tab , '#js-repo-pjax-container > div.pagehead.repohead.hx_repohead.readability-menu.bg-gray-light.pb-0.pt-3 > div > div > h1 > strong')
}
async function solveEachFile( fileName , code , newtab , href)
{
    let newUrl = "https://github.com" + href;
    await newtab.goto( newUrl , { waitUntil : "networkidle0"});
    await newtab.waitForSelector('.form-control.js-blob-filename.js-breadcrumb-nav.mr-1.mt-1.mt-sm-0.col-12.width-sm-auto');
    await newtab.type('.form-control.js-blob-filename.js-breadcrumb-nav.mr-1.mt-1.mt-sm-0.col-12.width-sm-auto' , fileName , { delay : 100});
    await newtab.waitForSelector('.CodeMirror-line');
    await newtab.click('.CodeMirror-line');
    await newtab.type('.CodeMirror-line' , code , { delay : 100});
    // if (document.querySelector('.flash-close js-flash-close') !== null) {
    //     await newtab.waitForSelector('.flash-close js-flash-close');
    //     await newtab.click('.flash-close js-flash-close');
    //   } 
    // await newtab.waitFor(1*7000);
    await navigationHelper(newtab , '.btn.btn-primary.js-blob-submit.flex-auto.mx-3.ml-md-3.mr-md-0.ml-lg-0.mb-3.mb-md-0');
    if ((await newtab.$('.flash-close.js-flash-close')) !== null) {
        await newtab.click('.flash-close.js-flash-close');
        await navigationHelper(newtab , '.btn.btn-primary.js-blob-submit.flex-auto.mx-3.ml-md-3.mr-md-0.ml-lg-0.mb-3.mb-md-0');
        }
    await newtab.close();
} 