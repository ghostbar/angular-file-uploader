angular-file-uploader
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

Usage
-----
Ready to use in your controllers!:

`file.html`:

    <input type='file' id='file-to-upload'>
    <button type='button' ng-click='upload()'>Upload</button>

`controller.js:`

    var DemoCtrl = [
      '$scope', 
      'file-uploader', 
      function ($scope, fileUploader) {
        $scope.upload = function () {
          var extraData = {
            hey: 'Extra data'
          };

          fileUploader.send(
            '/upload/end-point', 
            document.getElementById('file-to-upload').files, 
            extraData
          );
        };
      }
    ]

Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`. 

License
-------
The files are licensed under the MIT terms.
