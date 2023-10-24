const ServicePage = require('../service.page');

class ServicePageAssertions {
  async assertEmptyResultMessageShown() {
    await expect(ServicePage.SearchEmptyResult).toHaveText(
      'Sorry, but your search returned no results. Please try another query.',
    );
  }
}

module.exports = new ServicePageAssertions();
