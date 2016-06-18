var app = angular.module("myCalculator", ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'templates/home.html',
		controller : 'HomeCtrl'
	}).when('/newMeal', {
		templateUrl : 'templates/new-meal.html',
		controller: 'NewMealCtrl',
		controllerAs : 'num'
	}).when('/earnings', {
		templateUrl: 'templates/my-earnings.html',
		controller: 'EarningsCtrl', 
		controllerAs : 'num'

	});
}]);



app.controller('HomeCtrl',['$scope', '$rootScope', function($scope, $rootScope){
//properties on the $scope
$scope.$parent

}]);

app.controller('NewMealCtrl',['$scope', '$rootScope', function($scope, $rootScope){

		//Trigered by Cancel button
		$scope.cancelValues = function(){
		$scope.price = "";
		$scope.tax = "";
		$scope.tip ="";
	 	};  

		$scope.initCharge = function (){
		$scope.subtotalCharge = 0;
		$scope.tipCharge = 0;
		$scope.totalCharge = 0;	
	};

		//Submit Events 
	$scope.submitForm = function(){
		if($scope.num.myForm.$invalid){
			$scope.errorMsg = "Please enter valid numeric values";
		} else {
			$scope.errorMsg = "";
			$scope.subtotalCharge = $scope.price * (1 + ($scope.tax)/100);
			$scope.tipCharge = $scope.subtotalCharge * ($scope.tip / 100); 
	 		$scope.totalCharge = $scope.subtotalCharge + $scope.tipCharge;
			$scope.mealCount++;
			$scope.$parent.finalTips();
			$scope.$parent.averageTip();
			//Only resets price, tip and tax values
			$scope.$parent.cancelValues();
			$scope.$parent.initCharge();
		}	
	};
}]);

app.controller('EarningsCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	
	//Trigered by Reset Button
	$rootScope.initEarnings = function(){
		$rootScope.tipTotal = 0;
		$rootScope.mealCount = 0;
		$rootScope.tipAverage = 0;
	};

	$rootScope.finalTips = function(){
		$rootScope.tipTotal+= $scope.tipCharge;
	};

	$rootScope.averageTip = function(){
		$rootScope.tipAverage = $rootScope.tipTotal / $rootScope.mealCount;
	};
}]);

// app.controller("CalculatorCtrl", function(){
//  	$scope.resetAll = function() {
//  		$scope.errorMsg= "";
//  		$scope.cancelValues();
//  		$scope.initEarnings();
//  	};

//  	//initial Values of App
//  	resetAll();
// });