var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/uploads').success(function(response) {
    console.log("I got the data I requested");
    $scope.videoUploads = response;
    $scope.videoForm = "";
    console.log($scope.fileread);
  });
};

refresh();

$scope.addVideo = function() {
  console.log($scope.videoForm);
  $http.post('/uploads', $scope.videoForm).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  $http.delete('/uploads/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  $http.get('/uploads/' + id).success(function(response) {
    $scope.videoForm = response;
  });
};

$scope.update = function() {
  $http.put('/uploads/' + $scope.videoForm._id, $scope.videoForm).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.videoForm = "";
}

}]);﻿

// myApp.directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 var reader = new FileReader();
//                 reader.onload = function (loadEvent) {
//                     scope.$apply(function () {
//                         scope.fileread = loadEvent.target.result;
//                     });
//                 }
//                 reader.readAsDataURL(changeEvent.target.files[0]);
//                 console.log(reader.readAsDataURL(changeEvent.target.files[0]));
//             });
//         }
//     }
// }]);

myApp.directive("fileread", [function () {
  return {
      link: function (scope, element, attrs) {
          element.on('change', function  (evt) {
              var files = evt.target.files;
              scope.$apply(function () {
                scope.videoForm.video = files[0].name;
              });
              console.log(files[0].name);
              console.log(files[0].size);
          });
      }
  }
}]);
