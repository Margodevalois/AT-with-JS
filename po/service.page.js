const BasePage = require('./basic.page');

class ServicePage extends BasePage {
  get SearchIcon() {
    return $('button.header-search__button');
  }

  get SearchField() {
    return $('input[id="new_form_search"]');
  }

  get FindButton() {
    return $('span.bth-text-layer');
  }

  get SearchEmptyResult() {
    return $$('div.search-results__exception-message')[0];
  }

  async open() {
    await super.open('services');
  }

  async getNameField() {
    return this.SearchField;
  }

  async addName(inputElement, value) {
    const element = await (inputElement);
    await element.addValue(value);
  }
}

module.exports = new ServicePage();
