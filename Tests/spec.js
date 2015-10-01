url = 'http://';
urlWorkshopList = url + '';

/*
 * Scenario 1 : Whorkshop list should contain <table>
 */
describe('Workshop list', function() {
  it('should contain a', function() {
    browser.get(urlWorkshopList);
    expect(by.tagName("table").isPresent());
  });
});

/*
 * Scenario 2 : Clicking 'Ajouter' should load form
 */
 describe('Click on link \'Ajouter\'', function() {
	it('should load form', function() {
		browser.get(urlWorkshopList);
		by.id("addWorkshop").click();
		expect( (browser.getCurrentUrl().indexOf('/workshops/add/') > -1) );
	});
});