var controllers = angular.module("ctrls", ['chart.js']);

controllers.controller('main.ctrl', ["$scope", function($scope){
	$scope.test = "derpderp";

	$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  $scope.increment = function(){
  	$scope.data[1][0] = $scope.data[1][0] + 5;
  }
}]);