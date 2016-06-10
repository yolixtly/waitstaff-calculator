var app = angular.module("myCalculator", []);

app.controller("CalculatorCtrl",[ '$scope', function($scope){

 	var vm = this;

	vm.initCharge = function (){
		vm.subtotalCharge = 0;
		vm.tipCharge = 0;
		vm.totalCharge = 0;	
	};

	vm.initEarnings = function(){
		vm.tipTotal = 0;
		vm.mealCount = 0;
		vm.tipAverage = 0;
	};

	//Trigered by Cancel button
	vm.cancelValues = function(){
	vm.price = "";
	vm.tax = "";
	vm.tip ="";
 	};

 	//Trigered by Reset Button
 	vm.resetAll = function() {
 		vm.errorMsg= "";
 		vm.cancelValues();
 		vm.initCharge();
 		vm.initEarnings();
 	};

 	//initial Values of App
 	vm.resetAll();
 
 	//Submit Events 
	vm.submitForm = function(){
		if(vm.myForm.$invalid){
			vm.errorMsg = "Please enter valid numeric values";
		} else {
			vm.errorMsg = "";
			vm.mealCount++;
			vm.tipTotal+= this.tip;
		}	
	};

	$scope.$watchGroup(["vm.price", "vm.tax", "vm.tip"], function(newValues, oldValues, scope){
            if(vm.myForm.$invalid){
                vm.initCharge();
            } else {
                vm.subtotalCharge = vm.price * (1 + (vm.tax/100));
                vm.tipCharge = vm.subtotalCharge * (vm.tip / 100);
                vm.totalCharge = vm.subtotalCharge + vm.tipCharge;
                //Only resets price, tip and tax values
                // vm.cancelValues();
            }
    });


	$scope.$watchGroup(['vm.tipTotal', 'vm.mealCount'], function(newValues,oldValues, scope){
			if($scope.mealCount != 0){
				vm.tipAverage = vm.tipTotal / vm.mealCount;
			} else {
				vm.tipAverage = 0;
			}
		
	});
}]);