const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')
const { By, until} = require('selenium-webdriver');
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
  
  it('should start on home page', function() {
    return app.getTitle().should.eventually.be.a('string')
    .and.satisfy(msg => msg.startsWith('EBST'));
  })
  
  it('should navigate to about page', function() {
    app.findElement(By.css('a#nav-about'))
    .then(a => a.click())
    return app.getTitle().should.eventually.equal("about")
  })
  
  it.only('should apply the current config', function() {
    let findMessage = () => app.findElement(By.css('div.alert-success'))
    
    return chai.expect(
      app.findElement(By.css('a#btn-apply'))
      .then(a => a.click())
      .then(_ => app.wait(until.elementIsVisible(findMessage(), 3000)))
      .then(_ => app.sleep(10000))
      .then(_ => findMessage())
      .then(msg => msg.isDisplayed())
      )
      .to.become(true);
    })
    
  })
  