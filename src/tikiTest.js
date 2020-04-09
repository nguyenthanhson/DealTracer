const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://tiki.vn/')
    await page.waitForSelector('#onesignal-popover-cancel-button');
    const notificationcancel = await page.$('#onesignal-popover-cancel-button');
    await notificationcancel.click();
    const accountmodule = await page.$('div:nth-child(3) > span')
    await accountmodule.hover();
    await page.waitFor(2000);
    const dangnhaplink = await page.$('div:nth-child(3) > div > button:nth-child(1)')
    await dangnhaplink.click();
    await page.waitFor(2000)
    await page.type('#email', 'justagame19@gmail.com');
    await page.type('#password', 'DealTracer2020' )
    await page.click('form > div:nth-child(3) > button:nth-child(2)')
    await page.waitFor(5000)
    await accountmodule.hover();
    const favprod = await page.$('div:nth-child(3) > div > a:nth-child(6) > p');
    await favprod.click();
    await browser.close();
})();