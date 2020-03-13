app.controller('ModalAddScholarship', function($scope, $modalInstance, items){
    $scope.items = items;
    $scope.itemsShown = $scope.items
    $scope.filters = {
        city: null,
        course: null,
        mode: {
            presential: true,
            distance: true
        },
        cost: null,
    }
    $scope.cityOptions = [];
    $scope.courseOptions = [];
    
    // Get City and Course options
    function getOptions() {
        angular.forEach($scope.items, function(item){
            if ($scope.cityOptions.indexOf(item.campus.city) < 0) {
                $scope.cityOptions.push(item.campus.city);
            }
            if ($scope.courseOptions.indexOf(item.course.name) < 0) {
                $scope.courseOptions.push(item.course.name);
            }
        })
        $scope.cityOptions.sort();
        $scope.courseOptions.sort();
    }

    function validateItem(item) {
        if ($scope.filters.city)
            if ($scope.filters.city !== item.campus.city)
                return false;

        if ($scope.filters.course)
                if ($scope.filters.course !== item.course.name)
                    return false;

        if ((!$scope.filters.mode.presential && item.course.kind === 'Presencial')
            || (!$scope.filters.mode.distance && item.course.kind === 'EaD'))
                return false;
        
        if ($scope.filters.cost)
            if ($scope.filters.cost < item.price_with_discount)
                return false;
        
        return true;
    }

    // change mode on click
    $scope.changeModeFilter = function(key) {
        $scope.filters.mode[key] = !$scope.filters.mode[key];
    }

    // Function called on any change on filters
    $scope.filterResults = function() {
        $scope.itemsShown = $scope.items.filter(validateItem);
    }

    // Change selection on click
    $scope.changeSelection = function(item) {
        item.selected = !item.selected;
    }

    // Check Selection and enable/disable button
    $scope.checkSelection = function() {
        var selectedItems = $scope.items.filter(function(item){
            return item.selected;
        })
        return selectedItems.length >= 0;
    }

    // Button to save selected scholarships
    $scope.ok = function() {
        $modalInstance.close($scope.items);
    }

    // Button to close modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    getOptions();
    // $scope.$watch('filters', $scope.filterResults);
})