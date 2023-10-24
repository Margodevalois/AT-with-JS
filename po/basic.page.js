class BasePage {
  get HeaderNavigation() {
    return $$('ul.top-navigation__row');
  }

  get HeaderNavServices() {
    return $('a[href="/services"].top-navigation__item-link');
  }

  get HeaderNavIndustries() {
    return $$('a.top-navigation__item-link')[1];
  }

  get HeaderNavInsights() {
    return $('a[href="/insights"].top-navigation__item-link');
  }

  get HeaderNavAbout() {
    return $('a[href="/about"].top-navigation__item-link');
    }

  get HeaderNavCareers() {
    return $('a[href="/careers"].top-navigation__item-link');
  }

  get Footer() {
    return $('//div[@class="footer section"]');
  }

  get BurgerMenuOpenButton() {
    return $('button.hamburger-menu__button');
  }

  get BurgerMenu() {
    return $('.hamburger-menu__dropdown-section');
  }

  async open(path) {
    await browser.url(path);
  }

  async customClick(selector) {
    const element = await (selector);
    await element.waitForExist();
    await element.waitForDisplayed();
    await element.click();
  }

  async customStyle(element) {
    const targetEl = await element;
    await browser.execute(function (element) {
      const styles = {
        border: 'red solid 4px',
        fontSize: '4rem',
        backgroundColor: 'yellow',
        color: 'blue',
        transform: 'rotate(45deg)',
      };
      Object.assign(element.style, styles);
    }, targetEl);
  }
}

module.exports = BasePage;
