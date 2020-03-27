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
        var arr = $scope.scholarships.filter(function(item){
            return item.selected === true;
        })
        if ($scope.semester ==  'all') {
            return arr;
        } else {
            return arr.filter(function(item){
                return item.enrollment_semester == $scope.semester;
            })
        }
    }

    // Exclude scholarship on click
    $scope.exclude = function(item) {
        item.selected = false;
        localStorage.setItem('selectedScholarships', JSON.stringify($scope.scholarships));
    }

    $scope.semester = 'all';
    $scope.filterSemester = function(value) {
        $scope.semester = value;
    }

    function init() {
        getScholarships();
    }
    init();
});