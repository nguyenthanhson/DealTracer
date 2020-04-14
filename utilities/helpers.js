const puppeteer = require("puppeteer");
const logger = require("./logger");
const CREDS = require("../creds");

/**
 * start browser
 */
async function startBrowser() {
  logger.info("=====launching browser=====");
  // eslint-disable-next-line no-unused-vars
  const options = {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
    headless: true,
  };
  // eslint-disable-next-line no-unused-vars
  const fullScreenOptions = {
    // for debug purpose
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--start-fullscreen"],
  };
  const browser = await puppeteer.launch(fullScreenOptions);
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36"
  );

  page.setDefaultNavigationTimeout(60 * 2 * 1000);
  return { browser, page };
}
/**
 * close browser
 * @param  {browser} browser
 */
async function closeBrowser(browser) {
  logger.info("=====closing browser=====");
  browser.close();
  process.exit();
}

/**
 * Login to tiki
 * @param  {Promise<Page>} page
 */
async function login(page) {
  const TIKI_HOMEPAGE = "https://tiki.vn/";
  const USER_ICON_SELECTOR = ".icon-user";
  const LOGIN_FORM_SELECTOR = ".toggler button:nth-child(1)";
  const EMAIL_INPUT_SELECTOR = "#email";
  const PASSWORD_INPUT_SELECTOR = "#password";
  const LOGIN_BUTTON_SELECTOR = "form > div:nth-child(3) > button:nth-child(2)";

  await page.goto(TIKI_HOMEPAGE, { waitUntil: "networkidle2" });

  // handle initial popup
  try {
    page.waitForSelector("#onesignal-popover-cancel-button", {
      visible: true,
      timeout: 5000,
    });
    logger.info("click cancel signal button");
    await page.click("#onesignal-popover-cancel-button");
  } catch (error) {
    logger.error(`error when clicking on popup ${error}`);
  }

  await page.hover(USER_ICON_SELECTOR);
  await page.waitFor(1000); //TODO: fix magic number
  await page.click(LOGIN_FORM_SELECTOR);

  const inputEmail = await page.waitForSelector(EMAIL_INPUT_SELECTOR, {
    timeout: 5000,
  });
  await inputEmail.type(CREDS.user);
  await page.type(PASSWORD_INPUT_SELECTOR, CREDS.pass);

  await page.click(LOGIN_BUTTON_SELECTOR);
  logger.info("login success");
  // TODO: navigate to https://tiki.vn/customer/account/login instead of hover and click on dialog
}

module.exports = { startBrowser, closeBrowser, login };
