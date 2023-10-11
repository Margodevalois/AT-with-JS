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

    // ------- Basic commands
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

    // ------- Advanced commands
    // scenario that utilizes execute() command
  it("should use execute command", async () => {
    const navIndustries = await $$('a.top-navigation__item-link')[1];
    await browser.execute(function (element) {
      const styles = {
        border: 'red solid 4px',
        fontSize: '4rem',
        backgroundColor: 'yellow',
        color: 'blue',
        transform: 'rotate(45deg)',
      };
      Object.assign(element.style, styles);
    }, navIndustries);
  });

  // scenario that utilizes waitUntil() command
  it('should wait until 3 conditions', async () => {
    const elem = await $('div.brands-solutions').$$('h2')[1];
    await browser.waitUntil(
      async () => elem.isDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: 'element is not visible after 5s',
      },
      async () => await elem.getAttribute('class') === 'solutions',
      {
        timeout: 5000,
        timeoutMsg: 'element attribute class is not as expected after 5s',
      },
      async () => await elem.getText() === 'SOLUTIONSHUB',
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      },
    );
  });

  // scenarios that utilizes browser actions
  // 1.moveTo()
  it('should change cursor to pointer on hover', async () => {
    const aboutLink = await $$('a.top-navigation__item-link')[3];
    await aboutLink.moveTo();
    await browser.waitUntil(
      async () => {
        const cursorProperty = await aboutLink.getCSSProperty('cursor');
        return cursorProperty.value === 'pointer';
      },
      {
        timeout: 3000,
        timeoutMsg: 'element attribute class is not as expected after 5s',
      },
    );
  });

  // 2.pinch zoom
  it('should run multiple actions at once for a pinch zoom', async () => {
    await browser.actions([
      browser.action('pointer')
        .move(100, 100)
        .down()
        .move(50, 50)
        .up(),
      browser.action('pointer')
        .move(100, 100)
        .down()
        .move(150, 150)
        .up(),
    ]);
  });

  // 3.scrollTo() + doubleClick()
  it('should simulate text selection by double-clicking', async () => {
    await browser.execute(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    const targetElement = await $('div.policies h2');
    await targetElement.doubleClick();
    const selectedText = await targetElement.getText();
    expect(selectedText).toBe('POLICIES');
  });

  // scenario that works with cookies
  it('should set/get/delete custom cookies', async () => {
    await browser.setCookies([
      {
        name: 'test1',
        value: 'one',
      },
    ]);
    const cookies = await browser.getCookies(['test1']);
    console.log(cookies);
    await browser.deleteCookies(['test1']);
  });
});
