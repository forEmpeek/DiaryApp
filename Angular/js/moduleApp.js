(function () {
    'use strict'
    angular.module('myApp', [])
        .controller('myCtrl', function ($scope) {

            $scope.flag = false;
            $scope.products = [];
            //Занесения данных из local storage
            var productsLength = $scope.products.length;
            var storageElems = JSON.parse(localStorage.getItem("object"));
            for (let i = 0; i < storageElems.length; i++) {
                console.log(storageElems[i].name);
                $scope.products.push({
                    name: storageElems[i].name,
                    comments: storageElems[i].comments
                });
            };

            $scope.addItem = function () {
                $scope.errortext = "";
                if (!$scope.addMe) {
                    $scope.errortext = "Please Enter value";
                    return;
                }
                $scope.products.push({
                    name: $scope.addMe,
                    comments: []
                });
                $scope.addMe = "";
                //Adding to Storage Info
                var sObj = JSON.stringify($scope.products);
                localStorage.setItem("object", sObj);
                $scope.retObj = JSON.parse(localStorage.getItem("object"));

            }

            $scope.removeItem = function (x) {
                $scope.errortext = "";
                $scope.products.splice(x, 1);
                $scope.flag = false;
                var sObj = JSON.stringify($scope.products);
                localStorage.setItem("object", sObj);
                $scope.retObj = JSON.parse(localStorage.getItem("object"));
            }
            //Начало Добавление Коментарий
            $scope.sendMessage = function () {
                $scope.errorComments = "";
                if ($scope.products[$scope.noteIndex].comments.indexOf($scope.comment) == -1) {
                    $scope.products[$scope.noteIndex].comments.push($scope.comment);
                } else {
                    $scope.errorComments = "Same comment is already there";
                }
                $scope.comment = "";
                //Adding to Storage Info
                var sObj = JSON.stringify($scope.products);
                localStorage.setItem("object", sObj);
                $scope.retObj = JSON.parse(localStorage.getItem("object"));
            }


            $scope.addingCommentSection = function (index) {
                $scope.errorComments = "";
                $scope.noteIndex = index;
                $scope.flag = true;
            }

        })
        .directive('enterSubmit', function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.bind('keydown', function (event) {
                        var code = event.keyCode || event.which;
                        if (event.ctrlKey && code === 13) {
                            if (!event.shiftKey) {
                                event.preventDefault();
                                scope.$apply(attrs.enterSubmit);
                            }
                        }
                    });
                }
            }
        });

}());