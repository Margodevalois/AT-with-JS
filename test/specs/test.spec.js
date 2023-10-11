describe("HOME TASK _Introduction to WebdriverIO", () => {
    // ------- XPath and CSS selectors
    it("should have the page title 'Services | EPAM'", async () => {
      await browser.url("https://www.epam.com/services");
      const pageTitle = await browser.getTitle();
      expect(pageTitle).toEqual("Services | EPAM");
    });

    it("should have 5 parts of top navigation", async () => {
      const topNav = await $('ul.top-navigation__row');
      expect(topNav).toHaveChildren(5);
    });

    it('should change cursor to pointer on hover', async () => {
      const elementToHover = await $('a.top-navigation__item-link[href="/about"]');
      await elementToHover.moveTo();
      const cursorProperty = await elementToHover.getCSSProperty('cursor');
      expect(cursorProperty.value).toBe('pointer');
    });
      
    it("should have a 'Footer' section", async () => {
      const sectionExists = await $('//div[@class="footer section"]').isExisting(); // XPath by attributes
      expect(sectionExists).toBe(true);
    });

    it("should have text 'SOCIAL' in footer section", async () => {
      const footerSection = await $('//footer//div[@class="social"]'); // XPath with child element of any level by attributes
      expect(footerSection).toHaveText('SOCIAL');
    });
    
    it("should have a dark-mode class for image", async () => {
      const imageChartBG = await $('img[src="/content/dam/epam/services/H_DChart_BG.gif"]'); // CSS selector with attribute
      expect(imageChartBG).toHaveAttr('class', 'responsive-image__image_dark-mode');
    });
    
    it("should have clickable 'Strategy' button", async () => {
      const buttonStrategy = await $('li:nth-child(1) span.button__content--desktop'); // CSS Selector with Class and Child Selector
      expect(buttonStrategy).toBeClickable()
    });
    // --------- basic commands
    it("should have dark mode turned on", async () => { // waitForDisplayed()
      const darkModeElement = await $('body.dark-mode');
      await darkModeElement.waitForDisplayed();
    });

    it("should open burger menu", async () => { // isDisplayed()
      await $('button.hamburger-menu__button').click();
      const dropdownSection = await $('.hamburger-menu__dropdown-section');
      expect(await dropdownSection.isDisplayed()).toBe(true);
    });

    it("should verify the presence of a 'Read more' button", async () => { // isExisting() waitForExist()
      const readMoreButton = await $('a.custom-link');
      await readMoreButton.waitForExist();
      expect(await readMoreButton.isExisting()).toBe(true);
    });

    it("should have 7 buttons in Our Core Service", async () => {
      const coreServices = await $('ul.buttons-list').$$('li');
      expect(coreServices.length).toBe(7);
    });

    it("should show message about no results", async () => { // Replace default click with custom one that will wait for elements before clicking
      await $('a[href="/careers"].top-navigation__item-link').waitForDisplayed();
      await $('a[href="/careers"].top-navigation__item-link').click();
      await $('input[id="new_form_job_search-keyword"]').setValue("singer");
      await $('div.default-label').click();

      const zeroResults = await $('span.search-result__error-message');
      expect(await zeroResults.getText()).toEqual('Sorry, your search returned no results. Please try another combination.');
    });

    it("should add value", async () => { // addValue
      await $('button.header-search__button').waitForDisplayed();
      await $('button.header-search__button').click();
      await $('input[id="new_form_search"]').addValue('My Neighbor');
      await $('input[id="new_form_search"]').addValue('Totoro');
      await $('span.bth-text-layer').click();

      const findError = await $$('div.search-results__exception-message')[0];
      expect(await findError.getText()).toEqual('Sorry, but your search returned no results. Please try another query.');
    });
});
