app.controller('payment_mode', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {

    
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    if(!$cookieStore.get('cart')){
        alert('Some Problem in Cart');
        $location.path('/cart');
        return false;
    }

    if($rootScope.wallet_amount == 0 || $rootScope.wallet_amount == 0.00){
        $("#checkbox1").attr("disabled", true);
    }
    // On ng-change of wallet checkbox for check that wallet have enough amount or not
    $scope.selectwallet = function(){
        if($('#checkbox1').prop('checked') == true){
            
            if($rootScope.wallet_amount >= $rootScope.finalTotal){
                $scope.paybywallet = '1';
                $scope.is_wallet_apply = '1';
                
            }else{
                $scope.paybywallet = '';
                $scope.is_wallet_apply = '1';
               
            }
            alert('Pay by Wallet');
            //return false; 
        }else{
            $scope.paybywallet = '';
            $scope.is_wallet_apply = '';
        }
       
    }

    $scope.form ={}
    $scope.payment = function(form){
        console.log($scope.is_wallet_apply)
        if($scope.is_wallet_apply != 1){
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
    }
        if($scope.form.payby == '2'){
            alert('Online Payment');
            return false;
        }
        console.log($scope.form.payby)
        loading.active();

        var args = $.param({
            user_id : $cookieStore.get('userinfo').uid,
            country_id : sessionStorage.country,
            payment_mod : $scope.form.payby,
            is_wallet_apply : $scope.is_wallet_apply,
            address : $cookieStore.get('aid')
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
           if(res.data.data.status == 'success')
           {
                $cookieStore.put('order_id',res.data.data.order_id);
                $rootScope.usercartvalue();
                $location.path('/thankyou');
           }
           else{
               alert("Some Problem in Payment Check Your Cart Again");
                $location.path('/cart');
           }

        }).finally(function () {
            loading.deactive();
        });
       
        
    }
});