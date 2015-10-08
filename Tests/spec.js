var url = 'http://test.hackjack.info/';
var urlWorkshopList = url + '';
var urlWorkshopEdit = url + '#/workshops/add/';

function genRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + max;
}

function genRandomString(maxLen = 5) {
  var res = '';
  var i;

  for (i = 0; i < maxLen; ++i)
    res = res + Math.floor(Math.random() * (25)) + 122;

  return res;
}

describe('Workshop list', function() {


  /*
   * Scenario 1 : Whorkshop list should contain <table>
   */
  it('should contain a table', function() {
    browser.get(urlWorkshopList);
    expect(by.tagName("table").isPresent());
  });

  /*
   * Scenario 2 : Clicking 'Ajouter' should load form
   */
  it('should load form', function() {
    browser.get(urlWorkshopList);
    by.id("addWorkshop").click();
    expect((browser.getCurrentUrl().indexOf('/workshops/add/') > -1));
  });

  /*
   * Scenario 3 :
   * Fill fields input with random values => save $title, etc.
   * Select options on selectors
   * Submit form => Expect Table with elements $title, etc.
   * Click on button 'Visualiser' => Expect elements with $title, etc.
   */
  it('should fill and save fields, then submit', function() {
    browser.get(urlWorkshopEdit);

    var editInputIDs = ['title', 'laboratory',
      'address', 'theme',
      'website', 'duration',
      'capacity', 'description',
      'speakers', 'partners',
      'audience', 'duration',
      'capacity', 'types'
    ];
    var nbInputs = editInputIDs.length;
    var editInputValues = [];
    var nbTypes = 4;

    /*
     * Filling & saving
     */
    // String fields
    var i;
    for (i = 0; i < editInputIDs.length; ++i) {
      var locID = editInputIDs[i];
      var loc = by.id(locID);
      var str;

      if (locID == 'types') { // Selectors
        var typeNum = genRandomInt(0, nbTypes);
        str = typeNum.toString();
        by.id(locID).findElements(by.tagName('md-model'))[typeNum].click();
      } else {
        if (locID == 'duration' || locID == 'capacity') { // Numerics
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
    for (i = 0; i < editInputValues.length; ++i) {
      expect(by.id(editInputIDs[i]).getText() == editInputValues[i]);
    }

  });



/*
 * Scenario 4 : Clicking 'Modifier' 
                change fields and save changes
		subit form
		clict on 'visualiser' => Expect changes done 
 */
	it('Delete a the first line', function() {
	    browser.get(urlWorkshopList);
	    var line = element.all(by.tagName("table")).get(0);
	    var id = line.id;
	    var title = line.title;
	    
	    var size = Math.random()+1;
	    var tabWord = [];
	    while(size>1) {
	    tab.push(Math.floor(Math.random() * (122-65))+65);
	    }     
	    line.change.click(); // not sure
	    
	    line.title.sendKeys(tab.toString());
	    expect(browser.get(url+'#workhop'+id).title).toEqual(title);        
	    
	});




/*
 * Scenario 5 : Clicking 'Supprimer' should remove index choosen
 */
	it('Delete a the first line', function() {
	    browser.get(urlWorkshopList);
	    var line = element.all(by.tagName("table")).get(0);
	    var id = line.id;
	    line.del.click(); // not sure
	   expect(browser.get(url+'#workhop'+id)).toEqual("http://.../404.html");
	    
	});




});
