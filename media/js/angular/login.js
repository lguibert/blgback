app.controller('LoginController', function ($scope, $rootScope, AuthenticationService, $location) {
    $scope.credentials = {
        username: '',
        password: ''
    };

    $rootScope.logged = false;

    $scope.login = function (credentials) {
        //credentials.password = md5(credentials.password);
        AuthenticationService.Login(credentials, function(response){
            if(response.success){
                AuthenticationService.SetCredentials(credentials.username, credentials.password, response.data.id);
                $rootScope.logged = true;
                $location.path('/');
            }else{
                displayMessage(response.msg, "error");
            }
        });
    };

    $scope.logout = function (){
        AuthenticationService.ClearCredentials();
        $rootScope.logged = false;
        $location.path("/login");
    }
});