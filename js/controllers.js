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

controllers.controller('filter.ctrl', ['$scope', '$http', function($scope, $http){
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [{
      x: 40,
      y: 10,
      r: 20
    }],
    [{
      x: 10,
      y: 40,
      r: 50
    }]
  ];

  $scope.cMale = true;
  $scope.cFemale = true;
  $scope.cYoung = true;
  $scope.cAdult = true;
  $scope.cElderly = true;

  var slider = document.getElementById('slider');
  var timeSlider = document.getElementById('timeSlider');

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

  noUiSlider.create(timeSlider, {
    start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
  });

  $scope.purchaseStart = slider.noUiSlider.get();
  $scope.timeStart = timeSlider.noUiSlider.get();

  var filterOut = function(attr, val, data){
    var ans = []
    for(each in data){
      if (data[each][attr] != val){
        ans.push(data[each]);
      }
    }

    return ans;
  };

  var filterByAge = function(attr, bound1, bound2, data){
    var ans = []
    for(each in data){
      if (!(data[each][attr] <= bound2 && data[each][attr] >= bound1)){
        ans.push(data[each]);
      }
    }

    return ans;
  };

  var convertToChart = function(data){
    var names = [];
    var points = [];
    for(each in data){
      names.push(each);
      points.push([{
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: (data[each].bags + Math.random() * 3) * 10 
      }]);
    }

    var ans = [];
    ans.push(names);
    ans.push(points);

    return ans;
  }

  window.setInterval(function(){ 
    $scope.purchaseStart = slider.noUiSlider.get();
    $scope.timeStart = timeSlider.noUiSlider.get();

    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/users.json'
    }).then(function successCallback(response) {
      var initialData = response.data;
      var runningData = ($scope.cMale) ? initialData : filterOut("gender", "male", initialData);
      runningData = ($scope.cFemale) ? runningData : filterOut("gender", "female", runningData);
      runningData = ($scope.cYoung) ? runningData : filterByAge("age", 0, 20, runningData);
      runningData = ($scope.cAdult) ? runningData : filterByAge("age", 21, 44, runningData);
      runningData = ($scope.cElderly) ? runningData : filterByAge("age", 45, 1000, runningData);

      var formatted = convertToChart(runningData);
      $scope.series = formatted[0];
      $scope.data = formatted[1];

    }, function errorCallback(response) {
      console.log(response);
    });
  }, 2000);

}]);