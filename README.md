angular-file-uploader [![Build Status](https://secure.travis-ci.org/ghostbar/angular-file-uploader.png)](http://travis.ci.org/ghostbar/angular-file-uploader) [![Code Climate](https://codeclimate.com/github/ghostbar/angular-file-uploader/badges/gpa.svg)](https://codeclimate.com/github/ghostbar/angular-file-uploader)
=====================

Simple Angular.js service for uploading files.

Installation
------------

Install with bower:

    bower install angular-file-uploader --save

Add to your HTML files:

    <script src='/bower_components/angular-file-uploader/angular-file-uploader.js'></script>

Now, inject to your application:

    angular.module('myApp', ['file-uploader']);

Demo
----

Yeah! Got a demo already! Check it out here, explains more in-depth that the usage section here:

<http://plnkr.co/l63VJk>

Usage
-----
Ready to use in your controllers!:

`file.html`:

    <input type='file' id='file-to-upload'>
    <button type='button' ng-click='upload()'>Upload</button>

`controller.js:`

    angular.module('yourApp', ['file-uploader']);

    angular.module('yourApp').controller('DemoCtrl', [
      '$scope', 
      'FileUploader', 
      function ($scope, fileUploader) {
        $scope.upload = function () {
          var extraData = {
            hey: 'Extra data'
          };

          fileUploader.post(
            '/upload/end-point', 
            document.getElementById('file-to-upload').files, 
            extraData
          )then(success, error, progress);
        };
      }
    ]);

Full API
--------

+ `FileUploader.post(url, files, config)`: makes a `POST` request.
+ `FileUploader.put(url, files, config)`: makes a `PUT` request.
+ `FileUploader.send(url, files, config)`: same as `.post()` but should not be used, is left just for compatibility with old implementations.
+ `FileUploader.request(method, url, files, config)`: This is the base function, it may change so please use either `.post()` or `.put()` unless you actually need to use a different method (really?! which method are you using??!!).

Changes on v1.0.0
-----------------

+ When loading the module just use `file-uploader` instead of `angular-file-uploader`.
+ When loading the service in your controller/directive/service use `FileUploader`.
+ Prefer to use `.post()` or `.put()` instead of the old `.send()` which should be deprecated in coming versions. `.request()` is available as well but use it only if necessary since this may change.

Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`. 

License
-------
The files are licensed under the MIT terms.
