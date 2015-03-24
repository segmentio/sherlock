
var assert = require('assert');
var Sherlock = require('..');

describe('Sherlock()', function () {
  it('should be a function', function () {
    assert.equal(typeof Sherlock, 'function');
  });

  it('should be a constructor', function () {
    var sherlock = new Sherlock();
    assert(sherlock instanceof Sherlock);
  });

  it('should not require the new keyword', function () {
    var sherlock = Sherlock();
    assert(sherlock instanceof Sherlock);
  });

  it('should initialize an empty list of services', function () {
    var sherlock = new Sherlock();
    assert.deepEqual(sherlock.services, []);
  });
});

describe('Sherlock#use(plugin)', function () {
  it('should add a single service to the list', function () {
    var sherlock = new Sherlock();
    sherlock.use({ name: 'A' });
    assert.deepEqual(sherlock.services, [ { name: 'A' } ]);
  });

  it('should add an array of services', function () {
    var sherlock = new Sherlock();
    sherlock.use([ { name: 'A' }, { name: 'B' } ]);
    assert.deepEqual(sherlock.services, [
      { name: 'A' },
      { name: 'B' }
    ]);
  });
});

describe('Sherlock#analyze(url)', function () {

});
