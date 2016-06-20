var app = angular.module("myCalculator", ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'templates/home.html',
		controller : 'HomeCtrl'
	}).when('/newMeal', {
		templateUrl : 'templates/new-meal.html',
		controller: 'NewMealCtrl'
	}).when('/earnings', {
		templateUrl: 'templates/my-earnings.html',
		controller: 'EarningsCtrl'
	});
}]);



app.controller('HomeCtrl',['$scope', '$rootScope', function($scope, $rootScope){


}]);

app.controller('NewMealCtrl',['$scope', '$rootScope', 'messageFactory', function($scope, $rootScope, messageFactory){

	$scope.check = messageFactory.check();  
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
			$scope.check = messageFactory.calculateCharge($scope.tax, $scope.price, $scope.tip);
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

app.factory('messageFactory', function() {
    var message = "Factory Hello World!";
    subtotalCharge = 0;
	tipCharge = 0; 
	totalCharge = 0;
	mealCount = 0;
	tipTotal = 0;
	tipAverage = 0;

    return {
        check: function() {
            return {
            	subtotalCharge: subtotalCharge,
            	tipCharge : tipCharge,
            	totalCharge : totalCharge,
            	mealCount : mealCount,
            	tipTotal : tipTotal,
            	tipAverage : tipAverage
            };

        },
        checkLastCharge: function() {
            return {
            	subtotalCharge: subtotalCharge,
            	tipCharge : tipCharge,
            	totalCharge : totalCharge
            };
        }, 
        calculateCharge : function(tax, price, tip) {
        	subtotalCharge = price * (1 + (tax)/100);
			tipCharge = subtotalCharge * (tip / 100); 
			totalCharge = subtotalCharge + tipCharge;
			mealCount++;
			tipTotal+= tipCharge;
			tipAverage = tipTotal / mealCount;

		   return {
            	subtotalCharge: subtotalCharge,
            	tipCharge : tipCharge,
            	totalCharge : totalCharge,
            	mealCount : mealCount,
            	tipTotal : tipTotal,
            	tipAverage : tipAverage
            };	
        }
    };
});

app.controller('EarningsCtrl',['$scope', '$rootScope', 'messageFactory', function($scope, $rootScope, messageFactory){
	$scope.check = messageFactory.check();  
}]);
