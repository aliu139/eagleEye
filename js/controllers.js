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

  $scope.labels = ['00:00 - 00:10', '00:10 - 00:20', '00:20 - 00:30', '00:30 - 00:40', '00:40 - 00:50', '00:50 - 01:00'];
  $scope.series = ['Your Customers'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55]
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
    var fa3 = data.fa3;
    for(i in fa3){
      $scope.data[i] = fa3[i];
    }
  }

  $scope.numOfPeople = 10;

  $scope.rawData = [];

  window.setInterval(function(){ 
    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/data.json'
    }).then(function successCallback(response) {
      $scope.mfData = getMF(response.data);
      $scope.ageData = getAgeData(response.data);
      $scope.dayData = getDayData(response.data);
      $scope.numOfPeople = response.data.nop;
      getMonthData(response.data);
    }, function errorCallback(response) {
      console.log(response);
    });

    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/users.json'
    }).then(function successCallback(response) {
      var initialData = response.data;
      console.log(initialData);
      $scope.rawData = initialData;
    }, function errorCallback(response) {
      console.log(response);
    });
  }, 500);

}]);

controllers.controller('filter.ctrl', ['$scope', '$http', function($scope, $http){
  $scope.cMale = true;
  $scope.cFemale = true;
  $scope.cYoung = true;
  $scope.cAdult = true;
  $scope.cElderly = true;

  $scope.finalLabels = ['Customers'];
  $scope.finalSeries = [];

  $scope.finalData = [
  ];

  var slider = document.getElementById('slider');
  var timeSlider = document.getElementById('timeSlider');

  noUiSlider.create(slider, {
    start: [0, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 80
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

  $scope.prevData = null;
  $scope.firstTime = true;
  $scope.labelName = "";

  $scope.submit = function(){
    $scope.finalSeries.push($scope.labelName);
    $scope.labelName = "";

    var sub = [];
    sub.push($scope.runningData.length);

    $scope.finalData.push(sub);
  }

  $scope.$watch("cMale", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("cFemale", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("cYoung", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("cAdult", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("cElderly", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("cAdult", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("purchaseStart[0]", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("purchaseStart[1]", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("timeStart[0]", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  $scope.$watch("timeStart[1]", function(newValue, oldValue) {
    $scope.firstTime = true;
  });

  var filterByPurchase = function(data, start, end){
    var ans = []
    for(each in data){
      var price = (data[each].bags + Math.random() * 3) * 10;
      if (price >= start && price <= end){
        ans.push(data[each]);
      }
    }

    return ans;
  }

  $scope.runningData = [];

  window.setInterval(function(){ 
    $scope.purchaseStart = slider.noUiSlider.get();
    $scope.timeStart = timeSlider.noUiSlider.get();

    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/users.json'
    }).then(function successCallback(response) {
      var initialData = response.data;

      console.log(initialData);

      if($scope.firstTime || ($scope.prevData && $scope.prevData.length != initialData.length)){
        var runningData = ($scope.cMale) ? initialData : filterOut("gender", "male", initialData);
        runningData = ($scope.cFemale) ? runningData : filterOut("gender", "female", runningData);
        runningData = ($scope.cYoung) ? runningData : filterByAge("age", 0, 20, runningData);
        runningData = ($scope.cAdult) ? runningData : filterByAge("age", 21, 44, runningData);
        runningData = ($scope.cElderly) ? runningData : filterByAge("age", 45, 1000, runningData);
        runningData = filterByPurchase(runningData, $scope.purchaseStart[0], $scope.purchaseStart[1]);
        
        $scope.runningData = runningData;

        $scope.firstTime = false;
      }
      if($scope.prevData == null){
        $scope.prevData = initialData;
      }

    }, function errorCallback(response) {
      console.log(response);
    });
  }, 100);

  window.setTimeout(function(){
    $scope.labelName = "OVERALL";
    $scope.submit();
  }, 1000);

  $scope.options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  };

}]);