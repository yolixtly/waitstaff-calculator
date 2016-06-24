"use strict";

var app = angular.module('myCalculator', ['ngRoute', 'ngAnimate']);
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl : 'templates/home.html',
    controller : 'GeneralCtrl',
    controllerAs : 'vm'
  }).when('/newMeal', {
    templateUrl : 'templates/new-meal.html',
    controller : 'GeneralCtrl',
    controllerAs : 'vm'
  }).when('/earnings', {
    templateUrl: 'templates/my-earnings.html',
    controller : 'GeneralCtrl',
    controllerAs : 'vm'
  }).when('/error', {
    template: '<p> Error - Page Not Found</p>'
  }).otherwise({
    redirectTo: '/error'
  });
}]);

//When a route is not found or a resolver fails, the application will redirect itself to the /error Route
app.run(['$rootScope', '$location', function($rootScope, $location){
 $rootScope.$on('$rootScope', function(){
   $location.path('/error');
 });
}]);

app.controller('GeneralCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  //Calculate the first section: customer Charges
   function customerCharges(data) {
      //object that holds everything
      var invoice = {};

      invoice.subtotalCharge = data.price * (1 + (data.tax) / 100);
      invoice.tipCharge = invoice.subtotalCharge * (data.tip / 100);
      invoice.totalCharge = invoice.subtotalCharge + invoice.tipCharge;
      
      return invoice;
   }

   //Calculate my Earnings section
    function myEarnings(data) {

      data.earnings.mealCount++;
      data.earnings.tipTotal += data.tipCharge;
      data.earnings.tipAverage = data.earnings.tipTotal / data.earnings.mealCount;
      
      return data.earnings;
    }

    //Set all to initial state:

    //Earnings to Init
    function initEarnings() {
      var earnings = {};

      earnings.tipTotal = 0;
      earnings.mealCount = 0;
      earnings.tipAverage = 0;

      return earnings;
    }

    //Charges to init
    function initCharge(){
      var invoice = {};

      invoice.subtotalCharge = 0;
      invoice.tipCharge = 0;
      invoice.totalCharge = 0;  

      return invoice;
    }

    //calculate Charges 

    this.calculate = function () {
      //Customer Invoice
      $rootScope.invoice = customerCharges({
        'price' : this.price,
        'tax' : this.tax,
        'tip' : this.tip
      });

      // Update my Earnings
      $rootScope.earnings = myEarnings({
        'tipCharge' : $rootScope.invoice.tipCharge,
        'earnings' : $rootScope.earnings
      });
    };

    //Clear meal details with Cancel button
    this.cancelValues = function() {
      this.price = '';
      this.tax = '';
      this.tip ='';

      if($scope.myForm) {
        $scope.myForm.$setPristine();
      }
    };

    //reset the entire App
    this.resetAll = function() {
      $rootScope.invoice = initCharge();
      $rootScope.earnings = initEarnings();
      this.cancelValues();
      $location.path('/');
      $rootScope.initialized = true;
    };

    if(!$rootScope.initialized) {
      this.resetAll(true);
    }
}]);

