describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var operator = element(by.model('operator'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));
  var title = element(by.xpath('/html/body/div/div/h3'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys('+');
    goButton.click();
    // missing something here ?!?!?! what could it be?
  }
  
  function divide(a, b)
  {
    firstNumber.sendKeys(b);
    secondNumber.sendKeys(a);
    operator.sendKeys('/');
    goButton.click();
  }

  /*
  Option B : 
  function calculate(a, b, c)
  {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    operator.sendKeys(c);
    goButton.click();
  }
  */

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have the title "Super Calculator"', function() {
    expect(title.getText()).toEqual('Super Calculator');
  });

  it('should add one and two', function() {
    add(1,2);
    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function() {
    add(4,6);
    expect(latestResult.getText()).toEqual('10');
  });

  it('should divide six by three', function() {
    divide(3,6);
    expect(latestResult.getText()).toEqual('2');
  })

  it('should read the value from an input', function() {
    firstNumber.sendKeys('1');
    expect(firstNumber.getAttribute('value')).toEqual('1');
  });

  it('should have a history', function() {
    add(1, 2);
    add(3, 4);

    expect(history.count()).toEqual(2);

    add(5, 6);

    expect(history.count()).toEqual(3);
  });
});