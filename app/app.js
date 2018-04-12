'use strict';

var messageApp = angular.module('messageApp', []);

messageApp.controller('MessageCtrl', ['$scope', function ($scope) {

    $scope.selectedItem = {
        index: 0
    };

    if (localStorage.getItem("userItems")) {
        $scope.items = JSON.parse(localStorage.getItem("userItems"));
        $scope.selectedItem.index = parseInt(localStorage.getItem("selectedItem"));
    } else {
        $scope.items = [{
            name: 'First item with custom name',
            comments: [
                'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, ' +
                'when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the ' +
                'Information Age in the mid-1980s',
                'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier,' +
                ' when it was popularized by advertisements for Letraset transfer sheets. It was introduced to' +
                ' the Information Age in the mid-1980s',
                'A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, ' +
                'when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the ' +
                'Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in ' +
                'typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset ' +
                'transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary ' +
                'lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by ' +
                'advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s'
            ]
        }, {
            name: 'Second  item is active',
            comments: [
                'some comment 11',
                'some comment 21',
                'some comment 31',
                'some comment 41'
            ]
        }
        ];
    }

    function saveData() {
        localStorage.setItem("userItems", JSON.stringify($scope.items));
        localStorage.setItem("selectedItem", $scope.selectedItem.index);
    }

    $scope.onSelectItem = function (index) {
        $scope.selectedItem.index = index;
        saveData();
    };

    $scope.addNewItem = function (val) {
        if (val) {
            var item = {
                name: val,
                comments: []
            };
            $scope.items.push(item);
            $scope.itemName = undefined;
            $scope.itemForm.$setPristine();
            saveData();
        }
    };

    $scope.deleteItem = function (index) {
        $scope.selectedItem.index = index - 1;
        $scope.items.splice(index, 1);
        saveData();
    };

    //add comment with directive
    $scope.addComment2 = function (index, comment) {
        console.log("val:", index, comment);
        if (comment) {
            $scope.items[index].comments.push(comment);
            $scope.comment = undefined;
        }
        saveData();
    }

}]);

messageApp.directive('ngCtrlEnter', function () {
    return function (scope, element, attrs) {
        var map = {13: false, 17: false};

        element.bind("keydown", function (event) {
            if (event.which in map) {
                map[event.which] = true;
                if (map[13] && map[17]) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngCtrlEnter, {'event': event});
                    });
                    event.preventDefault();
                }
            }
        });
        element.bind("keyup", function (event) {
            if (event.which in map) {
                map[event.keyCode] = false;
            }
        });
    };
});