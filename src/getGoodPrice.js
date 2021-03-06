const logger = require("../utilities/logger");
const { login, startBrowser, closeBrowser } = require("../utilities/helpers");

(async () => {
  const WISHLIST_URL = "https://tiki.vn/customer/wishlist";
  const NEXT_WISHLIST_PAGE_ELEMENT = ".next";

  logger.info("starting getting good price");
  const { browser, page } = await startBrowser();
  await login(page);
  await page.waitFor(5000); //TODO: walk around an issue when user is navigate to login page again
  await page.goto(WISHLIST_URL, {
    waitUntil: "networkidle0",
  });
  logger.info("navigate to wishlist page");
  const wishList = [];

  while (await page.$(NEXT_WISHLIST_PAGE_ELEMENT)) {
    const wishListItems = await page.$$(".wishlist-item");

    if (wishListItems.length === 0) {
      closeBrowser(browser);
      process.exit();
    }
    for (const item of wishListItems) {
      const dataID = await page.evaluate(
        (obj) => obj.getAttribute("data-id"),
        item
      );

      // console.log(`dataID ${dataID}`);

      const dataTitle = await page.evaluate(
        (obj) => obj.getAttribute("data-title"),
        item
      );
      // console.log(`dataTitle ${dataTitle}`);
      const dataPrice = await page.evaluate(
        (obj) => obj.getAttribute("data-price"),
        item
      );
      //  console.log(`dataPrice ${dataPrice}`);
      const wishItem = {
        dataID: dataID,
        dataTitle: dataTitle,
        dataPrice: dataPrice,
      };

      wishList.push(wishItem);
    }
    await Promise.all([
      page.click(NEXT_WISHLIST_PAGE_ELEMENT),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  }

  logger.info(`wishList: ${JSON.stringify(wishList, null, "\t")}`);
  closeBrowser(browser);
})();
