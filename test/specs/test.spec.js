describe("HOME TASK _Introduction to WebdriverIO", () => {
    // ------- XPath and CSS selectors
    it("should have the page title 'Services | EPAM'", async () => {
      await browser.url("https://www.epam.com/services");
      const pageTitle = await browser.getTitle();
      expect(pageTitle).toEqual("Services | EPAM");
    });
    
    it("should have a 'Footer' section", async () => {
      const sectionExists = await $('//div[@class="footer section"]').isExisting(); // XPath by attributes
      expect(sectionExists).toBe(true);
    });
    
    it("should have a 'social' part in footer", async () => {
      const sectionExists = await $('//footer//div[@class="social"]').isExisting(); // XPath with child element of any level by attributes
      expect(sectionExists).toBe(true);
    });
    
    it("should have an image", async () => {
      const imageExists = await $('img[src="/content/dam/epam/services/H_DChart_BG.gif"]').isExisting(); // CSS selector with attribute
      expect(imageExists).toBe(true);
    });
    
    it("should have a 'Strategy' button", async () => {
      const buttonExists = await $('li:nth-child(1) span.button__content--desktop').isExisting(); // CSS Selector with Class and Child Selector
      expect(buttonExists).toBe(true);
    });
});