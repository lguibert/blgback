app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: 'templates/alerts.html'})

        //.when('/user/new/', {templateUrl: 'templates/user/add_user.html', data: {role: ['admin']}})
        .otherwise({redirectTo: '/'});
}]);

/*
app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
// keep user logged in after page refresh

    $rootScope.$on( "$routeChangeStart", function(event, next) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            $rootScope.logged = true;
            $rootScope.role = $rootScope.globals.currentUser.role;
        }

        var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn = $rootScope.globals.currentUser;

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }

        if(loggedIn){
            if(next.data){
                var roles = next.data.role;

                var right = $.inArray($rootScope.globals.currentUser.role, roles);

                if(right === -1){
                    $location.path('/myaccount');
                }
            }
        }
    });
}]);*/