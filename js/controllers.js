var controllers = angular.module("ctrls", ['chart.js']);

controllers.controller('main.ctrl', ["$scope", "$http", function($scope, $http){
  $scope.mfData = [50,50];
  $scope.mfLabels = ["Male", "Female"];

  $scope.ageData = [10,10,10];
  $scope.ageLabels = ["Young", "Adult", "Elderly"];  

  $scope.dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  $scope.dayData = [
    [28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.daySeries = ['Series A', 'Series B'];

  $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [{
        x: 15,
        y: 15,
        r: 20
      }],
      [{
        x: 0,
        y: 0,
        r: 0
      }],
      [{
        x: 60,
        y: 60,
        r: 0
      }],
      [{
        x: 40,
        y: 15,
        r: 50
      }]
    ];

  $scope.increment = function(){
  	$scope.data[1] = $scope.data[1] + 500;
  };

  var getMF = function(data){
    var male = data.male ? data.male : 0;
    var female = data.female ? data.female : 0;

    var mfArray = [];
    mfArray.push(male);
    mfArray.push(female);

    return mfArray;
  }

  var getAgeData = function(data){
    var young = data.young ? data.young : 0;
    var adult = data.adult ? data.adult : 0;
    var elderly = data.elderly ? data.elderly : 0;

    var ageArray =  [];
    ageArray.push(young);
    ageArray.push(adult);
    ageArray.push(elderly);

    return ageArray;
  }

  window.setInterval(function(){ 
    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/data.json'
    }).then(function successCallback(response) {
      $scope.mfData = getMF(response.data);
      $scope.ageData = getAgeData(response.data);


    }, function errorCallback(response) {
      console.log(response);
    });
  }, 500);

}]);