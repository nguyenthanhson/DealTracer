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

// Login account - Tiki
async function login(page) {
  // open login dialog
  await page.hover('div:nth-child(3) > span');
  const loginDialog = await page.waitForSelector('div > button:nth-child(1)', { visible: true });
  await loginDialog.click();

  // enter user & pass --> login
  const username = await page.waitForSelector('#email', { visible: true })
  await username.type('justagame19@gmail.com');
  const pasword = await page.waitForSelector('#password', { visible: true })
  await pasword.type('DealTracer2020');
  await page.click('.UserModalstyle__RightButton-uq4a18-8.jpHvvv')
}

// search data
async function searchByKey(page, keyword) {
  await page.waitForSelector('.FormSearch__Input-hwmlek-2.eiGtjR', { visible: true })
  await page.type('.FormSearch__Input-hwmlek-2.eiGtjR', keyword);
  await page.click('.FormSearch__Button-hwmlek-3.dVzStw');
  await page.waitForNavigation({ waitUntil: 'networkidle2' })
  
  const result = await page.evaluate(() => {
    const res = document.querySelectorAll('div.product-item.search-div-product-item');
    const arrResults = [];
    for (let item of res) {
      arrResults.push({
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
  searchByKey
};

(async () => {
  const url = "https://tiki.vn/";
  const { browser, page } = await beforeAll(url);
  await closePopover(page);
  await login(page);
  await searchByKey(page, "mouse");
  await afterAll(browser);
})();

