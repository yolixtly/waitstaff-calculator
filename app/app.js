var app = angular.module("myCalculator", ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'templates/home.html',
		controller : 'HomeCtrl'
	}).when('/newMeal', {
		templateUrl : 'templates/new-meal.html',
		controller: 'NewMealCtrl as num'
	}).when('/earnings', {
		templateUrl: 'templates/my-earnings.html',
		controller: 'EarningsCtrl as num', 

	});
}]);

app.controller('HomeCtrl',['$scope', function($scope){
	//some Code here
}]);

app.controller('NewMealCtrl', ['$scope', function($scope){
		//some code here
}]);

app.controller('EarningsCtrl', ['$scope', function($scope){
	// SOME CODE HERE
}]);

// app.controller("CalculatorCtrl", function(){

// 	this.initCharge = function (){
// 		this.subtotalCharge = 0;
// 		this.tipCharge = 0;
// 		this.totalCharge = 0;	
// 	};

// 	this.initEarnings = function(){
// 		this.tipTotal = 0;
// 		this.mealCount = 0;
// 		this.tipAverage = 0;
// 	};

// 	//Trigered by Cancel button
// 	this.cancelValues = function(){
// 	this.price = "";
// 	this.tax = "";
// 	this.tip ="";
//  	};

//  	//Trigered by Reset Button
//  	this.resetAll = function() {
//  		this.errorMsg= "";
//  		this.cancelValues();
//  		this.initCharge();
//  		this.initEarnings();
//  	};

//  	//initial Values of App
//  	this.resetAll();

//  	//Submit Events 
// 	this.submitForm = function(){
// 		if(this.myForm.$invalid){
// 			this.errorMsg = "Please enter valid numeric values";
// 		} else {
// 			this.errorMsg = "";
// 			this.subtotalCharge = this.price * (1 + (this.tax)/100);
// 			this.tipCharge = this.subtotalCharge * (this.tip / 100); 
// 	 		this.totalCharge = this.subtotalCharge + this.tipCharge;
// 			this.mealCount++;
// 			this.finalTips();
// 			this.averageTip();
// 			//Only resets price, tip and tax values
// 			this.cancelValues();
// 		}	
// 	};

// 	this.finalTips = function(){
// 		this.tipTotal+= this.tipCharge;
// 	};

// 	this.averageTip = function(){
// 		this.tipAverage = this.tipTotal / this.mealCount;
// 	};

// });