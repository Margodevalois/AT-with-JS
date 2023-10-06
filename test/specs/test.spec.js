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
});
