const logger = require("../utilities/logger");
const { login, startBrowser, closeBrowser } = require("../utilities/helpers");

(async () => {

    const lbl_account = 'div:nth-child(3) > span';
    logger.info("starting getting good price");
    const { browser, page } = await startBrowser();
    await login(page);
    await page.waitFor(5000)
    await page.hover(lbl_account);
    const lnk_favprod = 'div:nth-child(3) > div > a:nth-child(6) > p';
    await page.click(lnk_favprod);  
    await page.waitFor(5000)

    const listproduct = await page.evaluate(() => {
        let items = document.querySelectorAll('#wishlist > div')
        let prods = []
        items.forEach((item) => {
          prods.push({
            Brand: item.getAttribute('data-brand'),
            Title: item.getAttribute('data-title'),
          })
        })
        return prods;
      });
    console.log(listproduct);
    closeBrowser(browser);
})();
