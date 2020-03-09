app.controller('myAccount', function($scope, $http, $modal) {
    $scope.scholarships = {}
    $scope.openModal = function() {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal-add-scholarship.html',
            controller: 'ModalAddScholarship',
            size: 'lg',
            resolve: {
                items: $scope.scholarships
            }
        })
    }
    function init() {
        $http.get('https://testapi.io/api/redealumni/scholarships').then(function(response){
            $scope.scholarships = response;
        }, function(error){
            console.log('Ooops! Something went wrong.')
        })
    }
    init();
});