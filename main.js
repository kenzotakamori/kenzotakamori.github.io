var app = angular.module("main", ['ui.bootstrap', 'ngAnimate']);
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
      templateUrl: "directives/star-rating.html",
      controller: function($scope) {
        function validateRate(rate) {
          var arr = []
          var n = Math.floor(rate)
          var dec = rate - n
          for (var i = 0; i < 5; i++){
            if (i < n) {
              arr.push('fas fa-star')
            } else if (dec >= 0.5) {
              arr.push('fas fa-star-half-alt')
              dec = 0
            } else {
                arr.push('far fa-star')
            }       
          }
          return arr
        }
        $scope.stars = validateRate($scope.rate);
      },
    };
});
app.filter('myCurrency', ['$filter', function($filter){
  return function(input, symbol, fractionSize){
      input = $filter('currency')(input, symbol, fractionSize);
      if(symbol === 'R$'){
        var tempString = "###";
        input = input.replace(",", tempString).replace(".", ",").replace(tempString, ".");
      }
      return input;
  }
}])
app.filter('translateWords', function(){
  return function(input){
    if (input === 'EaD') {
      return 'Ensino à Distância';
    } else {
      return input;
    }
  }
})