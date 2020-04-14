const { beforeAll, afterAll, login, closePopover, searchByKey } = require('../utilities/commonUtils');

(async () => {
    const url = "https://tiki.vn/";
    const { browser, page } = await beforeAll(url);
    await closePopover(page);
    await login(page);
    await searchByKey(page, "mouse");
    await afterAll(browser);
})();

