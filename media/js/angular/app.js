var app = angular.module('blgback', ['ngRoute']);
var server = "http://10.133.128.36:3000/";

app.service('LoadingState', ['$rootScope', function ($rootScope) {
    return {
        getLoadingState: function () {
            return this.loading;
        },
        setLoadingState: function (state) {
            this.loading = state;
            $rootScope.$emit("ChangedState");
        },
        getLoadingStateAction: function () {
            return this.loading_action;
        },
        setLoadingStateAction: function (state) {
            this.loading_action = state;
            $rootScope.$emit("ChangedStateAction");
        }
    }
}]);

app.controller('MainController', ['$scope', '$rootScope', 'LoadingState', function ($scope, $rootScope, LoadingState) {
    $rootScope.$on('ChangedState', function () {
        $scope.loading = LoadingState.getLoadingState();
    });
    $rootScope.$on('ChangedStateAction', function () {
        $scope.loading_action = LoadingState.getLoadingStateAction();
    });
}]);