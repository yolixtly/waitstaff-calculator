var app = angular.module("myCalculator", []);
app.controller("CalculatorCtrl", ['$scope', function($scope){
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
			vm.finalTips();
			vm.averageTip();
		}
	};
	// console.log(vm.myForm.$valid);
	$scope.$watchGroup([
            () => vm.price,
            () => vm.tax,
            () => vm.tip
        ], 
        
        function(newVal, oldVal){
            console.log(`Price - Old: ${oldVal[0]}, New: ${newVal[0]}`);
            console.log(`Tax - Old: ${oldVal[1]}, New: ${newVal[1]}`);
            console.log(`Tip - Old: ${oldVal[2]}, New: ${newVal[2]}`);
            
            vm.subtotalCharge = vm.price * (1 + (vm.tax)/100);
            vm.tipCharge = vm.subtotalCharge * (vm.tip / 100); 
            vm.totalCharge = vm.subtotalCharge + vm.tipCharge;
    });

	vm.finalTips = function(){
        console.log('final tips');
        console.log(vm.tipTotal);
		vm.tipTotal+= vm.tipCharge;
        console.log(vm.tipTotal);
	};

	vm.averageTip = function(){
        console.log('average tip');
		console.log(vm.tipTotal);
		console.log(vm.mealCount);
		vm.tipAverage = vm.tipTotal / vm.mealCount;
	};


}]);