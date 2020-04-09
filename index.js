const puppeteer = require('puppeteer');

(async () => {

  //Open new browser and navigate to the tiki.vn
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  page.setViewport({ width: 1280, height:720 })
  await page.goto('https://tiki.vn/', { waitUntil: 'networkidle2' })
  
  await page.screenshot({path: 'tiki.png'})

  await page.waitForSelector('div[id="onesignal-popover-dialog"]')
  // page.on('dialog', async dialog => {
  //   console.log(dialog.message());
  //   await dialog.dismiss();
  // })
 await page.click('#onesignal-popover-cancel-button')

  //Click Sign In button
  await page.click('#//button[class="Userstyle__UserDropDownButton-xrezqc-10 kZkOAY"][1]')
  
  await page.waitForSelector('email')
  await page.type('email','kimdat10@gmail.com')
  await page.type('password','1234Abcd')
  
  await page.click('button[class="UserModalstyle__RightButton-uq4a18-8 jpHvvv"]')


  await browser.close();
})();