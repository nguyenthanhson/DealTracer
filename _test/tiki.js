const { beforeAll, afterAll, login, closePopover, wishList } = require('../utilities/commonUtils');

(async () => {
    // const url = "https://tiki.vn/";/
    const url = "https://tiki.vn/customer/wishlist?src=header_my_account";
    const { browser, page } = await beforeAll(url);
    await closePopover(page);
    await login(page);
    await wishList(page);
    await afterAll(browser);
})();

