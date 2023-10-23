const ServicePage = require('../../po/service.page');
const CareersPage = require('../../po/career.page');

describe("HOME TASK_POM", () => {
  before(async () => {
    await ServicePage.open();
  });

  it("should display 5 top navigation links", async () => {
    await expect(ServicePage.HeaderNavigation).toHaveChildren(5);
  });

  it("should have a footer section", async () => {
    await expect(ServicePage.Footer).toBeDisplayed();
  });

  it("should open burger menu", async () => {
    await ServicePage.customClick(ServicePage.BurgerMenuOpenButton);

    await expect(ServicePage.BurgerMenu).toBeDisplayed();
  });

  it('should addValue()', async () => {
    await ServicePage.customClick(ServicePage.SearchIcon);
    await ServicePage.SearchField.addValue('My Neighbor');
    await ServicePage.SearchField.addValue('Totoro');
    await ServicePage.customClick(ServicePage.FindButton);

    await expect(ServicePage.SearchEmptyResult).toHaveText('Sorry, but your search returned no results. Please try another query.');
  });

  it('should setValue()', async () => {
    await ServicePage.customClick(ServicePage.HeaderNavCareers);
    await CareersPage.KeywordOrJobID.setValue("singer");
    await CareersPage.customClick(CareersPage.AllSkills);

    await expect(CareersPage.ResultMessage).toHaveText('Sorry, your search returned no results. Please try another combination.');
  });

  it("should use execute command", async () => {
    await ServicePage.customStyle(ServicePage.HeaderNavIndustries)
  });
});
