const BasePage = require('./basic.page');

class ServicePage extends BasePage {
  async open() {
    await super.open('services');
  }

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
}

module.exports = new ServicePage();
