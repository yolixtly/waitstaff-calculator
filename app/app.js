var app = angular.module("myCalculator", ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'templates/home.html',
		controller : 'CalculatorCtrl'
	}).when('/newMeal', {
		templateUrl : 'templates/new-meal.html',
		controller: 'CalculatorCtrl'
	}).when('/earnings', {
		templateUrl: 'templates/my-earnings.html',
		controller: 'CalculatorCtrl'
	});
}]);
app.controller('CalculatorCtrl', ['$scope', function($scope){

	$scope.initCharge = function (){
		$scope.subtotalCharge = 0;
		$scope.tipCharge = 0;
		$scope.totalCharge = 0;	
	};

	$scope.initEarnings = function(){
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.tipAverage = 0;
	};

	//Trigered by Cancel button
	$scope.cancelValues = function(){
	$scope.price = "";
	$scope.tax = "";
	$scope.tip ="";
 	};

 	//Trigered by Reset Button
 	$scope.resetAll = function() {
 		$scope.errorMsg= "";
 		$scope.cancelValues();
 		$scope.initCharge();
 		$scope.initEarnings();
 	};

 	//initial Values of App
 	$scope.resetAll();

 	//Submit Events 
	$scope.submitForm = function(){
		if($scope.myForm.$invalid){
			$scope.errorMsg = "Please enter valid numeric values";
		} else {
			$scope.errorMsg = "";
			$scope.subtotalCharge = $scope.price * (1 + ($scope.tax)/100);
			$scope.tipCharge = $scope.subtotalCharge * ($scope.tip / 100); 
	 		$scope.totalCharge = $scope.subtotalCharge + $scope.tipCharge;
			$scope.mealCount++;
			$scope.finalTips();
			$scope.averageTip();
			//Only resets price, tip and tax values
			$scope.cancelValues();
		}	
	};

	$scope.finalTips = function(){
		$scope.tipTotal+= $scope.tipCharge;
	};

	$scope.averageTip = function(){
		$scope.tipAverage = $scope.tipTotal / $scope.mealCount;
	};
}]);