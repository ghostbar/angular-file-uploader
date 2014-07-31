/* global describe,beforeEach,afterEach,it,inject,jasmine,expect,spyOn,xit */
'use strict';

describe('angular-file-uploader service', function () {

  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.install();
  });

  beforeEach(module('file-uploader'));

  beforeEach(inject(function (_FileUploader_, _$q_, _$rootScope_) {
    this.FileUploader = _FileUploader_;
    this.$q = _$q_;
    this.$rootScope = _$rootScope_;
  }));

  it('Should have an Object', function () {
    expect(typeof this.FileUploader).toBe('object');
  });
  it('Should have request and be a function', function () {
    expect(this.FileUploader.request).toBeDefined();
    expect(typeof this.FileUploader.request).toBe('function');
  });
  it('Should have post and be a function', function () {
    expect(this.FileUploader.post).toBeDefined();
    expect(typeof this.FileUploader.post).toBe('function');
  });
  it('Should have put and be a function', function () {
    expect(this.FileUploader.put).toBeDefined();
    expect(typeof this.FileUploader.put).toBe('function');
  });
  it('Should have send and be a function', function () {
    expect(this.FileUploader.send).toBeDefined();
    expect(typeof this.FileUploader.send).toBe('function');
  });

  it('Call to request without files should return an error', function (done) {
    var foo = {
      error: function error () {
        console.log('HERE');
        done();
      }
    };

    spyOn(foo, 'error');
    this.FileUploader.request(
      'POST',
      '/upload'
    ).catch(foo.error);
    this.$rootScope.$apply();

    expect(foo.error).toHaveBeenCalled();

  });

  xit('Uploading a file with POST', function () {

    /*jasmine.Ajax.requests.mostRecent().response({
      'status': 200,
      'contentType': 'text/plain',
      'responseText': 'everything worked'
    });*/

  });
});
