const puppeteer = require("puppeteer");
const CREDS = require("../creds");
const btnCancel = "#onesignal-popover-cancel-button";
const lblLoginHP = "div:nth-child(3) > span > span";
const btnLoginHP = "div:nth-child(3) > div > button:nth-child(1)";
const txtEmail = "#email";
const txtPassword = "#password";
const btnLogin =
  "form > div:nth-child(3) > button.UserModalstyle__RightButton-uq4a18-8.jpHvvv";

const pageURL = "https://tiki.vn";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(pageURL, { waitUntil: "networkidle2" });

  //Cancel initial the popup
  await page.waitForSelector(btnCancel, {
    visible: true,
    timeout: 5000,
  });
  await page.click(btnCancel);

  //Navigate to Login form
  await page.hover(lblLoginHP);
  await page.waitFor(1000);
  await page.waitForSelector(btnLoginHP);
  await page.click(btnLoginHP);

  //Submit login form
  await page.waitForSelector(txtEmail);
  await page.type(txtEmail, CREDS.user);
  await page.type(txtPassword, CREDS.pass);
  await page.click(btnLogin);
  await page.waitForNavigation();

  await browser.close();
})();
