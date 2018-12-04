app.controller('payment_mode', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    $scope.payment = function(form){

        if ($scope[form].$error) {
            var error_str = '';
                if ($scope[form].payby.$error.required !== undefined) {
                    error_str += "Payment Method, ";
                }
                if (error_str !== '') {
                    error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                   alert(error_str);
                    return false;
                }
        }
        console.log($scope.payby)
        $location.path('/thankyou');
        
    }
});