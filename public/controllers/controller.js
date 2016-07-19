var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/uploads').success(function(response) {
    console.log("I got the data I requested");
    $scope.videoUploads = response;
    $scope.videoForm = "";
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
