app.controller('thankyou', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
    // alert();

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    $scope.orders = function(){
        $location.path('order/myorder');
    }

    $scope.home = function(){
        $location.path('dashboard/home');
    }
    
    $scope.thanks = function(){

        //alert();
    }

});