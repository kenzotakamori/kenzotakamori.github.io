app.controller('ModalAddScholarship', function($scope, $modalInstance, items){
    $scope.items = items;
    
    // Change selection on click
    $scope.changeSelection = function(item) {
        item.selected = !item.selected;
    }

    // Button to save selected scholarships
    $scope.ok = function() {
        $modalInstance.close($scope.items);
    }

    // Button to close modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
})