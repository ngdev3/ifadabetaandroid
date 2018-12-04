app.controller('thankyou', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
    // alert();

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }
    $scope.thanks = function(){

        //alert();
    }

});