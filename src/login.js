const puppeteer = require("puppeteer");
const { expect } = require("chai");

const pageURL = "https://tiki.vn";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--no-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await page.goto(pageURL, { waitUntil: "networkidle2" });
    const btnCancel = "#onesignal-popover-cancel-button";
    await page.waitForSelector(btnCancel, {
      visible: true,
      timeout: 5000,
    });
    await page.click(btnCancel);

    const lblLoginHP = "div:nth-child(3) > span > span";
    const btnLoginHP = "div:nth-child(3) > div > button:nth-child(1)";
    await page.hover(lblLoginHP);
    await page.waitFor(1000);
    await page.waitForSelector(btnLoginHP);
    await page.click(btnLoginHP);

    const txtEmail = "#email";
    const txtPassword = "#password";
    const btnLogin =
      "form > div:nth-child(3) > button.UserModalstyle__RightButton-uq4a18-8.jpHvvv";
    await page.waitForSelector(txtEmail);
    await page.type(txtEmail, "littlesnail0809@gmail.com");
    await page.type(txtPassword, "dealTracer01");
    await page.click(btnLogin);
    await page.waitForNavigation();
  } catch (e) {
    console.log(e);
  }

  await page.waitFor(1000);
  const lblWelcome = await page.$eval(
    "div:nth-child(3) > span > span",
    (el) => el.innerText
  );
  expect(lblWelcome).to.eql("Chào Ly dealTracer");

  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
