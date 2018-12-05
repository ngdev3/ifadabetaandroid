app.controller('wallet', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

});