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


app.controller('AlertsController', ['$scope', '$rootScope', 'AlertsFactory', 'LoadingState', '$interval', function ($scope, $rootScope, AlertsFactory, LoadingState, $interval) {
    refrechAlerts();

    $interval(refrechAlerts, 5000);


    function refrechAlerts(){
        LoadingState.setLoadingState(true);
        $scope.loading = LoadingState.getLoadingState();

        AlertsFactory.getAlerts().then(function (data) {
            if($scope.alerts){
                console.log("alerts existe");
                if(Object.keys($scope.alerts).length != Object.keys(data).length){
                    console.log("on change data");
                    $scope.alerts = data;
                }
            }else{
                console.log("alert existe pas");
                $scope.alerts = data;
            }


            LoadingState.setLoadingState(false);
            $scope.loading = LoadingState.getLoadingState();
        }, function (msg) {
            LoadingState.setLoadingState(false);
            $scope.loading = LoadingState.getLoadingState();
            displayMessage(msg, "error");
        });
    };



    $scope.showDetails = function (event) {
        var id = '#' + event.target.parentElement.parentElement.lastElementChild.id;
        if ($(id).hasClass("details")) {
            $(id).removeClass("details").addClass("details-active");
        } else {
            $(id).removeClass("details-active").addClass("details");
        }
    };

    $scope.seriousness = function (speed) {
        if(speed < 30){
            return "seriousness-easy";
        }else if(speed > 30 && speed < 70){
            return "seriousness-normal";
        }else if(speed > 70 && speed < 130){
            return "seriousness-hard";
        }else if(speed > 130){
            return "seriousness-ultra-hard";
        }
    };

    $scope.end_alert = function (uuid) {
        LoadingState.setLoadingStateAction(true);
        $scope.loading_action = LoadingState.getLoadingStateAction();
        document.getElementsByClassName('actionable').disabled = true;

        AlertsFactory.endAlert(uuid).then(function(data){
            console.log(data);
            LoadingState.setLoadingStateAction(false);
            $scope.loading_action = LoadingState.getLoadingStateAction();
        }, function(msg){
            LoadingState.setLoadingStateAction(false);
            $scope.loading_action = LoadingState.getLoadingStateAction();
        });
    };
}]);
