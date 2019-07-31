const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const webdriver = require('selenium-webdriver');
const { driver } = require("./driver");

describe('Base Tests', function() {
  let app
  this.timeout(15 * 1000);
  beforeEach( done => {
      app = driver.build()
      chai.should();
      chai.use(chaiAsPromised);
      done()
  })
  afterEach( done => {
      app.quit()
      done()
  })
    
  it('should navigate to 2nd page', function() {
    app.findElement(webdriver.By.css('a#about')).then(a => a.click)
    return app.getTitle().should.eventually.equal("about")
  })
    
})
