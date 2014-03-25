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
  
  angular.module('angular-file-uploader', [])
    .factory('angularFileUploader', [
      '$q',
      function($q) {
        return {
          //
          // Upload a file
          // -------------
          //
          // ### Arguments
          //
          // + `url` - {String} the URI end-point.
          // + `files` - {File Blob|File Blob Array}
          // + `config` - {Object} optional map with extra stuff to be added to
          // request. Right now supports:
          //   - `headers` - {Object} map of strings to be sent as HTTP headers
          //   - `withCredentials` - {Boolean} flag on XHR Object
          //   - `data` - {Object|String} data to be sent as the request
          //   message data
          //
          // ### E.g
          //
          // ```javascript
          // var config = { /* optional field */
          //   'headers': {
          //     'Authentication': 'Bearer randomasdasdas'
          //   },
          //   'withCredentials': true,
          //   data: {
          //     'random': 'field'
          //   },
          //   newNames: {
          //     'oldNameWithExtension': 'newNameWithoutExtension'
          //   }
          // };
          //
          // ngUpload.send('/end-point', fileArray, config);
          // ```
          //
          send: function(url, files, config) {

            var deferred = $q.defer();

            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (event) {
              var percent;

              if (event.lengthComputable) {
                percent = Math.round(event.loaded / (event.total * 100));

                deferred.notify(percent);
              }
            };

            xhr.onload = function () {
              deferred.resolve({
                files: files,
                dataText: xhr.responseText,
                data: xhr.response,
                status: xhr.status,
                statusText: xhr.statusText
              });
            };

            xhr.upload.onerror = function () {
              var msg = xhr.responseText ? xhr.responseText : 'Error occurred uploading to ' + url;

              deferred.reject(msg);
            };

            var fd = new FormData();
            
            //
            // If there are no files then `$http.post` should
            // be used instead.
            //
            if (files == null)
              deferred.reject('There\'s no files to upload');

            //
            // There's data to be added to the payload on this upload?
            //
            if (config && config.data != null) {
              // If it's an Object then run over it, if not add it as `data` field.
              if (typeof config.data === 'object') {
                Object
                  .keys(config.data)
                  .forEach(function (element) {
                    fd.append(element, config.data[element]);
                  }
                );
              } else {
                fd.append('data', config.data);
              }
            }

            function getNewFilename(fileName, baseName) {
              //
              // The match for extension is made for characters from 3 to 4 from the
              // final point. An extension with more than 4 characters and less than
              // 3 will be null. This includes the point so it would end like:
              //
              //     filename = "string.png";
              //     extension = ".png";
              //
              var extension = fileName.match(/\..{3,4}$/)[0];
              var newFilename = baseName + extension;
              return newFilename;
            }

            //
            // Load the files in the formData object
            //
            if (files.length) {
              for (var i = 0; i < files.length; i++) {
                if (config && config.newNames && config.newNames[files[i].name] != null) {
                  var newName = getNewFilename(files[i].name, config.newNames[files[i].name]);

                  fd.append(files[i].name, files[i], newName);
                } else {
                  fd.append(files[i].name, files[i]);
                }
              }
            } else if (files && config && config.newNames) {
              /* jshint -W004 */
              var newName = getNewFilename(files.name, config.newNames[files.name]);
              /* jshing +W004 */

              fd.append(files.name, files, newName);
            } else {
              fd.append(files.name, files);
            }

            //
            // Send the files
            //
            xhr.open('POST', url);

            //
            // Adding configs
            // --------------
            // 
            // ### Any config for headers?
            //
            if (config && config.headers != null) {
              Object.keys(config.headers).forEach(function (element) {
                xhr.setRequestHeader(element, config.headers[element]);
              });
            }

            //
            // ### With Credentials
            //
            if (config && config.withCredentials != null) {
              xhr.withCredentials = config.withCredentials;
            }

            xhr.send(fd);

            return deferred.promise;

          }
        };
      }
    ]);
})();
