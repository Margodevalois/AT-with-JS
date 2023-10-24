const BasePage = require('./basic.page');

class CareersPage extends BasePage {
  get KeywordOrJobID() {
    return $('input[id="new_form_job_search-keyword"]');
  }

  get AllSkills() {
    return $('div.default-label');
  }

  get ResultMessage() {
    return $('span.search-result__error-message');
  }

  async open() {
    await super.open('careers');
  }

  async getNameField() {
    return this.KeywordOrJobID;
  }

  async setName(inputElement, value) {
    const element = await (inputElement);
    await element.setValue(value);
  }
}

module.exports = new CareersPage();
