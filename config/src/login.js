const puppeteer = require("puppeteer");
// const { expect } = require("chai");

const pageURL = "https://tiki.vn";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  try {
    await page.goto(pageURL, { waitUntil: "networkidle2" });
    // const dlgPopup = await page.$("#onesignal-popover-dialog");
    const btnCancel = await page.$("#onesignal-popover-cancel-button");
    await page.waitForSelector(btnCancel, {
      visible: true,
      timeout: 5000,
    });
    await page.click(btnCancel);

    const lblDangnhap = await page.$("div:nth-child(3) > span > span");
    const btnDangnhap = await page.$(
      "div:nth-child(3) > div > button:nth-child(1)"
    );
    await lblDangnhap.hover;
    await page.waitForSelector(btnDangnhap);
    await btnDangnhap.click;

    const txtEmail = await page.$("#email");
    const txtPassword = await page.$("#password");
    const btnLogin = await page.$(
      "form > div:nth-child(3) > button.UserModalstyle__RightButton-uq4a18-8.jpHvvv"
    );
    await page.waitForSelector(txtEmail);
    await txtEmail.type("littlesnail0809@gmail.com");
    await txtPassword.type("dealTracer01");
    await btnLogin.click;
    await page.waitForNavigation;
  } catch (e) {
    console.log(e);
  }

  //   const lblWelcome = await page.$eval(lblDangnhap, (e) => e.innerText);
  //   expect(lblWelcome).to.eql("Chào Ly dealTracer");

  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
