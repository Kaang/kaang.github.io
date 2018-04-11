'use strict';

var messageApp = angular.module('messageApp', []);

messageApp.controller('MessageCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

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

    $scope.addNewItem = function (val){
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

    var keyMap = {13: false, 17: false};
    $scope.addComment = function (index, comment, code) {
        if (comment && code in keyMap) {
            keyMap[code] = true;
            if (keyMap[13] && keyMap[17]) {
                $scope.items[index].comments.push(comment);
                $scope.comment = undefined;

                saveData();
            }
            $timeout(function () {
                keyMap[13] = false;
                keyMap[17] = false;
            }, 100);
        }
    }

}]);