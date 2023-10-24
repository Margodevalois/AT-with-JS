const CareersPage = require('../career.page');

class CareerPageAssertions {
  async assertEmptyResultMessageShown() {
    await expect(CareersPage.ResultMessage).toHaveText(
      'Sorry, your search returned no results. Please try another combination.',
    );
  }
}

module.exports = new CareerPageAssertions();
