var app = angular.module("main", ['ui.bootstrap']);
app.directive("headerQuero", function() {
    return {
      templateUrl: "directives/header-quero.html"
    };
});
app.directive("footerQuero", function() {
    return {
      templateUrl: "directives/footer-quero.html"
    };
});
app.directive("starRating", function() {
  return {
    scope: {
      rate: '@'
   },
   templateUrl: "directives/star-rating.html"
  };
});