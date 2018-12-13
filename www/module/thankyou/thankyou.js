app.controller('thankyou', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
    // alert();

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    if(!$cookieStore.get('cart')){
        //alert('Some Problem in Cart');
        $location.path('/cart');
        return false;
    }

    $scope.orders = function(orderID){
        
        $location.path('/order/myorderdetails');
        
    }

    $scope.home = function(){
        $location.path('dashboard/home');
    }
    
    $scope.thanks = function(){
        $scope.order_id= $cookieStore.get('order_id');
        $cookieStore.put('orderID', $scope.order_id);
        $cookieStore.remove('order_id');
        $cookieStore.remove('cart');
        $cookieStore.remove('aid');
        $cookieStore.remove('id');
    }

});