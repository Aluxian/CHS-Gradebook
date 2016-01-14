'use strict';

describe('Service: Dpd', function () {

  // load the service's module
  beforeEach(module('gradebookApp'));

  // instantiate service
  var Dpd;
  beforeEach(inject(function (_Dpd_) {
    Dpd = _Dpd_;
  }));

  it('should do something', function () {
    expect(!!Dpd).toBe(true);
  });

});
