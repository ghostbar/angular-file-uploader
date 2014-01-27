//
// angular-file-uploader factory
// ===========================
//
// Factory to support file upload with progress status on Angular.js.
//
// You can upload files with `$http.post` and a `FormData` object but
// don't get progress update on it.
//
(function() {
  'use strict';
  
  angular.module('angular-file-uploader')
    .factory('angular-file-uploader', [
      '$q',
      '$rootScope',
      function($q, $rootScope) {
        return {
          //
          // Upload a file
          // -------------
          //
          // ### Arguments
          //
          // + `url` - `String` with the URI end-point.
          // + `files` - HTML file object, can be an `Array`
          // + `data` - (Optional) `JSON` with extra data to be sent
          // + `callback` - (Optional) `Callback` function that returns
          // the progress.
          //
          // ### E.g
          //
          // ```
          // $upload.send('/end-point', fileArray);
          // ```
          //
          send: function(url, files, data, callback) {

            var deferred = $q.defer();

            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (event) {
              $rootScope.apply(function () {
                var percent;

                if (event.lengthComputable) {
                  percent = Math.round(event.loaded / (event.total * 100));

                  if (callback != null) {
                    callback(percent);
                  } else if (deferred.notify) {
                    deferred.notify(percent);
                  }
                }
              });
            };

            xhr.onload = function () {
              $rootScope.apply(function () {
                deferred.resolve({
                  files: files,
                  data: angular.fromJson(xhr.responseText)
                });
              });
            };

            xhr.upload.onerror = function () {
              var msg = xhr.responseText ? xhr.responseText : 'Error occurred uploading to ' + url;

              $rootScope.apply(function () {
                deferred.reject(msg);
              });
            };

            var fd = new FormData();
            
            //
            // If there are no files then `$http.post` should
            // be used instead.
            //
            if (files != null || !files.length) {
              deferred.reject('There\'s no files to upload');
              return;
            }

            //
            // There's data to be added to the payload on this upload?
            //
            if (data) {
              Object.keys(data).forEach(function (element) {
                fd.append(element, data[element]);
              });
            }

            //
            // Load the files in the formData object
            //
            for (var i = 0; i < files.length; i++) {
              fd.append(files[i].name, files[i]);
            }

            //
            // Send the files
            //
            xhr.open('POST', url);

            xhr.send(fd);

            return deferred.promise;

          }
        };
      }
    ]);
}).call(this);
