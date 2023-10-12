describe("HOME TASK_WebdriverIO's Advanced commands", () => {
  beforeEach(async () => {
    await browser.url("https://www.epam.com/services");
  });

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
