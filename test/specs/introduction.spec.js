describe("HOME TASK _Introduction to WebdriverIO", () => {
  beforeEach(async () => {
    await browser.url("https://www.epam.com/services");
  });

  it("should have the page title 'Services | EPAM'", async () => {
    // await browser.url("https://www.epam.com/services");
    const pageTitle = await browser.getTitle();
    expect(pageTitle).toEqual("Services | EPAM");
  });

    // toHaveChildren()
  it("should have 5 parts of top navigation", async () => {
    const topNav = await $('ul.top-navigation__row');
    expect(topNav).toHaveChildren(5);
  });

  // getCSSProperty()
  it('should change cursor to pointer on hover', async () => {
    const elementToHover = await $('a.top-navigation__item-link[href="/about"]');
    await elementToHover.moveTo();
    const cursorProperty = await elementToHover.getCSSProperty('cursor');
    expect(cursorProperty.value).toBe('pointer');
  });

  // XPath by attributes + toBe() assertion
  it("should have a 'Footer' section", async () => {
    const sectionExists = await $('//div[@class="footer section"]').isExisting();
    expect(sectionExists).toBe(true);
  });

  // XPath with child element of any level by attributes + toHaveText() assertion
  it("should have text 'SOCIAL' in footer section", async () => {
    const footerSection = await $('//footer//div[@class="social"]');
    expect(footerSection).toHaveText('SOCIAL');
  });

  // CSS selector with attribute + toHaveAttr() assertion
  it("should have a dark-mode class for image", async () => {
    const imageChartBG = await $('img[src="/content/dam/epam/services/H_DChart_BG.gif"]');
    expect(imageChartBG).toHaveAttr('class', 'responsive-image__image_dark-mode');
  });

  // CSS Selector with Class and Child Selector + toBeClickable() assertion
  it("should have clickable 'Strategy' button", async () => {
    const buttonStrategy = await $('li:nth-child(1) span.button__content--desktop');
    expect(buttonStrategy).toBeClickable()
  });
});
