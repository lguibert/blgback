app.factory('AlertsFactory', ['$http', '$q', function ($http, $q) {
    return {
        alerts: false,
        getAlerts: function () {
            var deferred = $q.defer();
            $http.get(server + 'alerts/')
                .success(function (data) {
                    deferred.resolve(angular.fromJson(data));
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        endAlert: function (uuid) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server + 'alert/',
                data: uuid,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (msg) {
                    deferred.reject(msg);
                });
            return deferred.promise;
        }
    };
}]);


app.controller('AlertsController', ['$scope', '$rootScope', 'AlertsFactory', 'LoadingState', '$route', function ($scope, $rootScope, AlertsFactory, LoadingState, $route) {

    LoadingState.setLoadingState(true);
    $scope.loading = LoadingState.getLoadingState();

    AlertsFactory.getAlerts().then(function (data) {
        $scope.alerts = data;

        LoadingState.setLoadingState(false);
        $scope.loading = LoadingState.getLoadingState();
    }, function (msg) {
        LoadingState.setLoadingState(false);
        $scope.loading = LoadingState.getLoadingState();
        displayMessage(msg, "error");
    });


    $scope.showDetails = function (event) {
        var id = '#' + event.target.parentElement.parentElement.lastElementChild.id;
        if ($(id).hasClass("details")) {
            $(id).removeClass("details").addClass("details-active");
        } else {
            $(id).removeClass("details-active").addClass("details");
        }
    };

    $scope.seriousness = function (state) {
        switch (state) {
            case 0:
                return "seriousness-hard";
                break;
            case 1:
                return "seriousness-normal";
                break;
            case 2:
                return "seriousness-easy";
                break;
            default:
                return null;
                break;
        }
    };

    $scope.end_alert = function (uuid) {
        AlertsFactory.endAlert(uuid).then(function(data){

        }, function(msg){

        });
    };
}]);
