app.controller('ModalAddScholarship', function($scope, $uibModalInstance, items){
    $scope.items = items;
    
    // Change selection on click
    $scope.changeSelection = function(item) {
        item.selected = !item.selected;
    }

    // Button to save selected scholarships
    $scope.ok = function() {
        $uibModalInstance.close($scope.items);
    }

    // Button to close modal
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
})