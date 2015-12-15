app.controller('LoginController', function ($scope, $rootScope, AuthenticationService, $location) {
    $scope.credentials = {
        username: '',
        password: ''
    };

    $rootScope.logged = false;

    $scope.login = function (credentials) {
        //credentials.password = md5(credentials.password);
        AuthenticationService.Login(credentials, function(response){
            if(response.data.status == 0){
                console.log(response);
                AuthenticationService.SetCredentials(credentials.username, credentials.password);
                $rootScope.logged = true;
                $location.path('/');
            }else{
                displayMessage(response.data.message, "error");
            }
        });
    };

    $scope.logout = function (){
        AuthenticationService.ClearCredentials();
        $location.path("/login");
    }
});