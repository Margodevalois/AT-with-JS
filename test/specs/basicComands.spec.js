describe("HOME TASK_WebdriverIO's Basic commands", () => {
  beforeEach(async () => {
    await browser.url("https://www.epam.com/services");
  });

  // waitForDisplayed()
  it("should have dark mode turned on", async () => {
    const darkModeElement = await $('body.dark-mode');
    await darkModeElement.waitForDisplayed({ timeout: 3000 });
  });

  // isExisting() waitForExist()
  it("should verify the presence of a 'Read more' button", async () => {
    const readMoreButton = await $('a.custom-link');
    await readMoreButton.waitForExist();
    expect(await readMoreButton.isExisting()).toBe(true);
  });

  it("should have 7 buttons in Our Core Service", async () => {
    const coreServices = await $('ul.buttons-list').$$('li');
    expect(coreServices.length).toBe(7);
  });

  // Replace default click with custom one that will wait for elements before clicking
    async function customClick(selector) {
    const element = await $(selector);
    await element.waitForExist();
    await element.waitForDisplayed();
    await element.click();
  }
  // isDisplayed()
  it("should open burger menu", async () => {
    await customClick('button.hamburger-menu__button');
    const dropdownSection = await $('.hamburger-menu__dropdown-section');
    expect(await dropdownSection.isDisplayed()).toBe(true);
  });

  // setValue()
  it('should perform custom click + setValue()', async () => {
    await customClick('a[href="/careers"].top-navigation__item-link');
    await $('input[id="new_form_job_search-keyword"]').setValue("singer");
    await $('div.default-label').click();

    const zeroResults = await $('span.search-result__error-message');
    expect(await zeroResults.getText()).toEqual('Sorry, your search returned no results. Please try another combination.');
  });

  // addValue()
  it('should perform custom click + addValue()', async () => {
    await customClick('button.header-search__button');
    await $('input[id="new_form_search"]').addValue('My Neighbor');
    await $('input[id="new_form_search"]').addValue('Totoro');
    await customClick('span.bth-text-layer');

    const findError = await $$('div.search-results__exception-message')[0];
    expect(await findError.getText()).toEqual('Sorry, but your search returned no results. Please try another query.');
  });
});
