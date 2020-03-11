app.controller('myAccount', function($scope, $http, $modal) {
    $scope.scholarships = [];
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
        modalInstance.result.then(function(){
            localStorage.setItem('selectedScholarships', JSON.stringify(response));
        }, function(){

        })
    }

    function getScholarships() {
        var selection = JSON.parse(localStorage.getItem('b2bUnits')) || [];
        // checking if the scholarships are saved on browser
        if (selection.length > 0) {
            $scope.scholarships = selection;
        } else {
            // if not, call http GET
            $http.get('db.json').then(function(response){
                $scope.scholarships = response.data;
                console.log('Scholarships: ', $scope.scholarships)
                angular.forEach($scope.scholarships, function(item){
                    item.selected = false;
                })
            }, function(error){
                // TODO: add treatment in case of service going wrong
                console.log('Ooops! Something went wrong.')
            })
        }
    }

    function init() {
        getScholarships();
    }
    init();
});