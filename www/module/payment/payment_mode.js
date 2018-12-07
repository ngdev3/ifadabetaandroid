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
        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').uid,
            country_id : sessionStorage.country,
            is_wallet_apply : '1',
            payment_mod : '1',
            address : '48'
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/place_order',
            data: args 

        }).then(function (response) {

            res = response;
           console.log(res);
           return;
           if(res.data.data.status == 'success'){
               console.log(res.data.data.value_pack)
               $scope.valpacks =  res.data.data.value_pack;
            return;
               $location.path('/dashboard/home');
               $location.path('/thankyou');
           }else{

           }

        }).finally(function () {
            loading.deactive();
        });
       
        
    }
});