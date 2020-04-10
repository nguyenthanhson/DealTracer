const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://tiki.vn/')
    await page.waitForSelector('#onesignal-popover-cancel-button');
    const btn_notificationcancel = await page.$('#onesignal-popover-cancel-button');
    await btn_notificationcancel.click();
    const lbl_account = await page.$('div:nth-child(3) > span')
    await lbl_account.hover();
    await page.waitFor(2000);
    const lnk_dangnhap = await page.$('div:nth-child(3) > div > button:nth-child(1)')
    await lnk_dangnhap.click();
    await page.waitFor(2000)
    await page.type('#email', 'justagame19@gmail.com');
    await page.type('#password', 'DealTracer2020' )
    await page.click('form > div:nth-child(3) > button:nth-child(2)')
    
    await browser.close();

})();