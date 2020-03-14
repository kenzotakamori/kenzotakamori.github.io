var app = angular.module("main", ['ui.bootstrap']);
app.directive("headerQuero", function() {
    return {
      templateUrl: "directives/header-quero.html"
    };
});
app.directive("footerQueroDirective", function() {
    return {
      templateUrl: "directives/footer-quero.html"
    };
});