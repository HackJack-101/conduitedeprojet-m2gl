var url = 'http://';
var urlWorkshopList = url + '';
var urlWorkshopEdit = url + '#/workshops/add/';
    
function genRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + max;
}

function genRandomString(maxLen = 5){
    var res  = '';
    var i;
    
    for ( i = 0; i < maxLen; ++i )
	res = res + Math.floor(Math.random() * (25)) + 122;
    
    return res;
}

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

/*
 * Scenario 3 :
 * Fill fields input with random values => save $title, etc.
 * Select options on selectors
 * Submit form => Expect Table with elements $title, etc.
 * Click on button 'Visualiser' => Expect elements with $title, etc.  
 */
describe('Fill fields, submit form, then click \'Visualiser\'', function() {
    it('should fill and save fields, then submit', function() {
	browser.get(urlWorkshopEdit);

	
	var editInputIDs = [ 'title', 'laboratory',
			     'address', 'theme',
			     'website', 'duration',
			     'capacity', 'description',
			     'speakers', 'partners',
			     'audience', 'duration',
			     'capacity', 'types'];
	var nbInputs = editInputIDs.length;
	var editInputValues = [];
	var nbTypes = 4;

	/*
	 * Filling & saving
	 */
	// String fields
	var i;
	for ( i = 0; i < editInputIDs.length; ++i ){
	    var locID = editInputIDs[i];
	    var loc = by.id(locID);
	    var str;

	    if ( locID == 'types' ) { // Selectors
		var typeNum = genRandomInt(0, nbTypes);
		str = typeNum.toString();
		by.id(locID).findElements(by.tagName('md-model'))[typeNum].click();
	    } else {
		if ( locID == 'duration' || locID == 'capacity' ){ // Numerics
		    str = getRandomInt(0, 100).toString();
		} else { // Strings
		    str = genRandomString();
		}
		loc.sendKeys(str);
	    }
	    editInputValues[i] = str;
	}

	/*
	 *  Submitting
	 */
	by.id('submit').click();

	/*
	 * Visualizing
	 */
	browser.get(url);
	// TO DO

	/*
	 * Verifying
	 */
	for ( i = 0; i < editInputValues.length; ++i ){
	    expect(by.id(editInputIDs[i]).getText() == editInputValues[i]);
	}
	
    });
});
