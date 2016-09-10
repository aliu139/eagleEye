var controllers = angular.module("ctrls", ['chart.js']);

controllers.controller('main.ctrl', ["$scope", "$http", function($scope, $http){
	$scope.test = "derpderp";

  $scope.data = [300, 500, 100];
	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];

  $scope.mfData = [50,50];
  $scope.mfLabels = ["Male", "Female"];

  $scope.peopleNumData = [0,0,0,0];
  $scope.peopleNumLabels = ["0", "1", "2", "3"];

  $scope.increment = function(){
  	$scope.data[1] = $scope.data[1] + 500;
  };

  var maleFemaleRatio = function(data){
    var initial = [0,0];
    var reducer = function(total, value){
      if("male" in value){
        total[0] = total[0] + 1;
        return total;
      }
      else{
        total[1] = total[1] + 1;
        return total;
      }
    };
    var res = data.reduce(reducer, initial);
    
    return res;
  };

  var averageNumberOfPeople = function(data){
    var initial = {};
    var reducer = function(total, value){
      var num = ("male" in value) ? value.male.toString() : value.female.toString();
      if(total != undefined && num in total){
        total[num]= total[num] + 1; 
      }
      else{
        total[num] = 1;
      }

      return total;
    };
    var res = data.reduce(reducer, initial);

    var keys = Object.keys(res);
    var values = [];
    for(k in keys){
      values.push(res[keys[k]]);
    }

    var ans = [];
    ans.push(keys);
    ans.push(values);
    return ans;
  };

  window.setInterval(function(){ 
    $http({
      method: 'GET',
      url: 'https://eagleeye123.firebaseio.com/data.json'
    }).then(function successCallback(response) {
      // console.log(response.data);
      $scope.mfData = maleFemaleRatio(response.data);
      $scope.peopleNumData = averageNumberOfPeople(response.data)[1];
      $scope.peopleNumLabels = averageNumberOfPeople(response.data)[0];
      // $scope.data = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }, 500);

}]);