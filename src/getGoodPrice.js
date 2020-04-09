const logger = require("../utilities/logger");
const { login, startBrowser, closeBrowser } = require("../utilities/helpers");

(async () => {
  logger.info("starting getting good price");
  const { browser, page } = await startBrowser();
  await login(page);

  closeBrowser(browser);
})();
