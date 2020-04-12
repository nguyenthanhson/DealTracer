const puppeteer = require("puppeteer");
const pageURL = "https://tiki.vn";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--no-sandbox"],
  });
  const page = await browser.newPage();
  let dataObj = {};
  await page.goto(pageURL);
  await page.waitFor(2000);
  const publishedDeals = await page.evaluate(() => {
    const dealsDOM = document.querySelectorAll(
      "#__next > div > main > div:nth-child(5) > div > div.body > div"
    );
    const dealsList = [];
    dealsDOM.forEach((linkElement) => {
      const currentDeals = linkElement.querySelector("a").innerText;
      dealsList.push(currentDeals);
    });
    return dealsList;
  });
  dataObj = {
    amount: publishedDeals.length,
    publishedDeals: publishedDeals,
  };
  console.log(dataObj);
  await page.screenshot({ path: "example.png" });
  await browser.close();
  return dataObj;
})();
