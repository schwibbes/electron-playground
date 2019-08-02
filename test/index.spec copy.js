const chai = require('chai');
const chaiAsPromised = require('chai-as-promised')

describe('Base Tests', function() {
  
  this.timeout(15 * 1000);
  
  beforeEach( done => {
    chai.should();
    chai.use(chaiAsPromised);
    done()
  })

  it('asd', function() {
    (2 + 2).should.equal(4);
    return Promise.resolve({
      isDisplayed: function() {return true}
    }).should.eventually.assert(x => x.isDisplayed() === true);
  })

  it('asd2', function() {
    let data = Promise.resolve({
      isDisplayed: function() {return true}
    })

    return chai.expect(data.then(x => x.isDisplayed())).to.become(true);
  })
  
})
