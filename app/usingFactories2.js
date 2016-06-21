var app = angular.module('myCalculator', ['ngRoute']);
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
	}).when('/error', {
		template: '<p> Error - Page Not Found</p>'
	}).otherwise('/error');
}]);

// //When a route is not found or a resolver fails, the application will redirect itself to the /error Route
// app.run(['$rootScope', '$location', function($rootScope, $location){
// 	$rootScope.$on('$rootScope', function(){
// 		$location.path('/error');
// 	});
// }]);

app.controller('NewMealCtrl', ['$scope', 'calculatorFactory', function($scope, calculatorFactory){
	//We save the object we created in the factory inside a variable in the 
	//NewMealCtrl scope
	$scope.info = calculatorFactory;

	$scope.submit = function(){
		$scope.info.calculateAll();
	};

	//this is available in both controllers
	$scope.reset = function() {
		$scope.info.resetAll();
	};

}]);

app.controller('EarningsCtrl', ['$scope', 'calculatorFactory', function($scope, calculatorFactory){
	$scope.info = calculatorFactory;

	$scope.submit = function(){
		$scope.info.calculateAll();
	};

	$scope.reset = function(){
		$scope.info.resetAll();
	};

}]);

//Factory will create an object and return it to be used by the controllers
app.factory('calculatorFactory', function(){
	var vm = {};

	vm = this;

	//vm object's properties initialized to 0;
	vm.subtotalCharge = 0;
	vm.tipCharge = 0;
	vm.totalCharge = 0;
	vm.tipTotal = 0;
	vm.mealCount = 0;
	vm.tipAverage = 0;	
	vm.price = "";
	vm.tax = "";
	vm.tip ="";

	//The next 3 function will return the amounts for the Customer Charges
	function subtotalCharge(){
		vm.subtotalCharge = vm.price * (1 + (vm.tax)/100);
		return vm.subtotalCharge;
	}

	function tipCharge(){
		vm.tipCharge = vm.subtotalCharge * (vm.tip / 100);
		return vm.tipCharge;
	}

	function totalCharge(){
		vm.totalCharge = vm.subtotalCharge + vm.tipCharge;
		return vm.totalCharge;
	}

	//the next 3 function will return the amounts for the Earnings Section
	function tipTotal(){
		vm.tipTotal+= vm.tipCharge;
		return vm.tipTotal;
	}

	function mealCount(){
		return vm.mealCount++;
	}

	function averageTip(){
		vm.tipAverage = vm.tipTotal / vm.mealCount;
	}

	//the next functions, return the values that correspond to each section
	//Charges:
	function customerCharges(){
		subtotalCharge();
		tipCharge();
		totalCharge();
	}
	//Earnings:
	function myEarnings(){
		tipTotal();
		mealCount();
		averageTip();
	}

	//this function returns all the functions above: 
	function calculateAll(){
		customerCharges();
		myEarnings();
	}

	//we set the function as a value for the vm object as a method
	vm.calculateAll = calculateAll;

	//this function resets all values to initial state:
	function resetAll(){
		vm.subtotalCharge = 0;
		vm.tipCharge = 0;
		vm.totalCharge = 0;
		vm.tipTotal = 0;
		vm.mealCount = 0;
		vm.tipAverage = 0;	
		vm.price = "";
		vm.tax = "";
		vm.tip ="";
	}

	vm.resetAll = resetAll;

	//here is where the factory will return the Object it has created
	//making it available when we use it in the controllers:
	return vm;
});


