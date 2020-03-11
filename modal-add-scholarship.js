app.controller('ModalAddScholarship', function($scope, items){
    $scope.items = items;
    
    // Change selection on click
    $scope.changeSelection = function(item) {
        item.selected = !item.selected;
    }

    // Button to save selected scholarships
    $scope.ok = function() {

    }

    // Button to close modal
    $scope.cancel = function() {

    }
})