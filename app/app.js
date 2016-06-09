var app = angular.module("myCalculator", []);

app.controller("CalculatorCtrl", function(){

	this.initCharge = function (){
		this.subtotalCharge = 0;
		this.tipCharge = 0;
		this.totalCharge = 0;	
	};

	this.initEarnings = function(){
		this.tipTotal = 0;
		this.mealCount = 0;
		this.mealAverage = 0;
	};

	//Trigered by Cancel button
	this.cancelValues = function(){
	this.price = "";
	this.tax = "";
	this.tip ="";
 	};

 	//Trigered by Reset Button
 	this.resetAll = function() {
 		this.errorMsg= "";
 		this.cancelValues();
 		this.initCharge();
 		this.initEarnings();
 	};

 	//initial Values of App
 	this.resetAll();

 	//Submit Events 
	this.submitForm = function(){
		if(this.myForm.$invalid){
			this.errorMsg = "Please enter valid numeric values";
		} else {
			this.subtotalCharge = this.price * (1 + (this.tax)/100);
			this.tipCharge = this.subtotalCharge * (this.tip / 100); 
			this.totalCharge = this.subtotalCharge + this.tipCharge;
		}	
	};
	

});