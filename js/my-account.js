app.controller('myAccount', function($scope, $http, $modal) {
    $scope.scholarships = [];
    $scope.openModal = function() {
        var modalInstance = $modal.open({
            animation: true,
            scope: $scope,
            templateUrl: 'modal/modal-add-scholarship.html',
            controller: 'ModalAddScholarship',
            size: 'lg',
            resolve: {
                items: function(){
                    return $scope.scholarships;
                }
            }
        })
        modalInstance.result.then(function(response){
            $scope.scholarships = response
            localStorage.setItem('selectedScholarships', JSON.stringify(response));
        }, function(){

        })
    }

    function getScholarships() {
        var selection = JSON.parse(localStorage.getItem('selectedScholarships')) || [];
        // checking if the scholarships are saved on browser
        if (selection.length > 0) {
            $scope.scholarships = selection;
        } else {
            // if not, call http GET
            $http.get('common/db.json').then(function(response){
                $scope.scholarships = response.data;
                angular.forEach($scope.scholarships, function(item){
                    item.selected = false;
                })
            }, function(error){
                
            })
        }
    }

    $scope.getSelectedScholarships = function() {
        return $scope.scholarships.filter(function(item){
            return item.selected === true;
        })
    }

    // Exclude scholarship on click
    $scope.exclude = function(item) {
        item.selected = false;
        localStorage.setItem('selectedScholarships', JSON.stringify($scope.scholarships));
    }

    // See Offer?
    $scope.seeOffer = function(item) {
        console.log('Redirecting to status page.')
    }

    function init() {
        getScholarships();
    }
    init();
});