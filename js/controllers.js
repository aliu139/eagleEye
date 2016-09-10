var controllers = angular.module("ctrls", ['chart.js']);

controllers.controller('main.ctrl', ["$scope", "$http", function($scope, $http){
  $scope.currentPanel = 0;
  $scope.changePanel = function(newPanel){
    $scope.currentPanel = newPanel;
  };

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

  $scope.series = ['Endpoint 1', 'January', 'February', 'March', 
                    'April', 'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December', 'Endpoint 2'];

  $scope.data = [
    [{
      x: 10,
      y: 15,
      r: 20
    }],
    [{
      x: 20,
      y: 30,
      r: 50
    }],
    [{
      x: 30,
      y: 5,
      r: 20
    }],
    [{
      x: 40,
      y: 10,
      r: 20
    }],
    [{
      x: 50,
      y: 15,
      r: 20
    }],
    [{
      x: 60,
      y: 5,
      r: 20
    }],
    [{
      x: 70,
      y: 15,
      r: 20
    }],
    [{
      x: 80,
      y: 15,
      r: 20
    }],
    [{
      x: 90,
      y: 15,
      r: 20
    }],
    [{
      x: 100,
      y: 15,
      r: 20
    }],
    [{
      x: 110,
      y: 15,
      r: 20
    }],
    [{
        x: 120,
        y: 15,
        r: 20
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

  var getDayData = function(data){
    var fa1 = data.fa1;
    var ans = [];
    ans.push(fa1);
    ans.push(fa1);

    return ans;
  };

  var getMonthData = function(data){
    var fa2 = data.fa2;
    for(i in fa2){
      var j = i % 12;
      $scope.data[j][0].r = fa2[i]/5;
    }
  }

  window.setInterval(function(){ 
    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/data.json'
    }).then(function successCallback(response) {
      $scope.mfData = getMF(response.data);
      $scope.ageData = getAgeData(response.data);
      $scope.dayData = getDayData(response.data);
      getMonthData(response.data);

    }, function errorCallback(response) {
      console.log(response);
    });
  }, 500);

}]);