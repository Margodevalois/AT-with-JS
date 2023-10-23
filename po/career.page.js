const BasePage = require('./basic.page');

class CareersPage extends BasePage {
  async open() {
    await super.open('careers');
  }

  get KeywordOrJobID() {
    return $('input[id="new_form_job_search-keyword"]');
  }

  get AllSkills() {
    return $('div.default-label');
  }

  get ResultMessage() {
    return $('span.search-result__error-message');
  }
}

module.exports = new CareersPage();
