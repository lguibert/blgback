app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: 'templates/alerts.html'})
        .when("/login", {templateUrl: 'templates/login.html'})

        .otherwise({redirectTo: '/login'});
}]);

app.run(['$rootScope', '$location', '$cookies', '$http', function ($rootScope, $location, $cookies, $http) {
// keep user logged in after page refresh
    $rootScope.globals = $cookies.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        $rootScope.logged = true;
    }

    $rootScope.$on("$routeChangeStart", function (event, next) {

        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.logged;

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }

        /*if(loggedIn){
         if(next.data){
         var roles = next.data.role;

         var right = $.inArray($rootScope.globals.currentUser.role, roles);

         if(right === -1){
         $location.path('/');
         }
         }
         }*/
    });
}]);