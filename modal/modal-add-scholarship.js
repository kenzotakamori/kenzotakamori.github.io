app.controller('ModalAddScholarship', function($scope, $modalInstance, items){
    $scope.items = JSON.parse(JSON.stringify(items));
    $scope.itemsShown = $scope.items;
    $scope.filters = {
        city: null,
        course: null,
        mode: {
            presential: true,
            distance: true
        },
        cost: 2000,
    }
    $scope.cityOptions = [""];
    $scope.courseOptions = [""];
    $scope.enableAddButton = false;
    $scope.reverse = false;

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
        
        if ($scope.filters.cost || $scope.filters.cost == 0)
            if ($scope.filters.cost < item.price_with_discount)
                return false;
        
        return true;
    }

    // Check Selection and enable/disable button
    function checkSelection() {
        var selectedItems = $scope.items.filter(function(item){
            return item.selected;
        })
        $scope.enableAddButton = selectedItems.length > 0;
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
        checkSelection();
    }

    $scope.changeSort = function() {
        $scope.reverse = !$scope.reverse;
    }

    // Button to save selected scholarships
    $scope.ok = function() {
        $modalInstance.close($scope.items);
    }

    // Button to close modal
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    checkSelection();
    getOptions();
    $scope.$watch('filters', $scope.filterResults, true);
})