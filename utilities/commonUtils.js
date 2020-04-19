const puppeteer = require('puppeteer');
const index = require('../config/index');

let browser, page;

// Open browser and go to website
async function beforeAll(url) {
  browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  page = await browser.newPage();
  await page.goto (url);
  await page.setViewport({ width: 0, height: 0 });
  return { browser, page };
}

// Close browser
async function afterAll(browser) {
  await browser.close();
}

// Close popover=cancel - Tiki
async function closePopover(page) {
  const popoverNoti = await page.waitForSelector('#onesignal-popover-cancel-button', { visible: true });
  await popoverNoti.click();
}

// Login account - Tiki from Wishlist directly
async function login(page) {
  const username = await page.waitForSelector('div.form-group > #email', { visible: true });
  await username.type('justagame19@gmail.com');
  const pasword = await page.waitForSelector('div.form-group > #password', { visible: true });
  await pasword.type('DealTracer2020');
  await page.click('div.last > .btn.btn-info.btn-block');
}

// get price in Wishlist
async function wishList(page) {
  await page.waitFor(5000);
  const result = await page.evaluate(() => {
    const res = document.querySelectorAll('div.item.wishlist-item');
    const arrResults = [];
    for (let item of res) {
      arrResults.push({
        id: item.getAttribute('data-id'),
        title: item.getAttribute('data-title'), 
        price: item.getAttribute('data-price')
      });
    }
    return arrResults;
  });
  console.log("data: ", result);
}

module.exports = {
  beforeAll,
  afterAll,
  closePopover,
  login,
  wishList
};

