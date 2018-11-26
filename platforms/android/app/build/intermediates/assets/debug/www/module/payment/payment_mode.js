app.controller('payment_mode', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    console.log($rootScope.currentcartitems);
    // if (!$cookieStore.get('userinfo')) {
    //     $location.path('/login');
    //     return false;
    // }

    // if (!$cookieStore.get('paymentStatus')) {
    //     $location.path('/cart');
    //     return false;
    // }

    if ($rootScope.shippingCartData == undefined || $rootScope.shippingCartData == '') {
        alert('There is Some Problem in Payment Summary');
        $location.path('/cart');
        return false;
    }

    $scope.toDeliveryTime = function () {
        $location.path("/deliverytime");
    }


    $scope.toCart = function () {
        $cookieStore.remove('paymentStatus');
        $location.path("/cart");
    }

    /**
     * Funtion: tothankyou from payment_mod.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 25/10/2018 at 11:15am
     * Get the Payment Summary by sending the http request
     */
    $scope.walletdata = '';
    $scope.applywallet = function () {
        if ($('#walletchecked').prop('checked') !== true) {
            $scope.walletdata = '';
            return false;
        }
        if($rootScope.couponData.paymoney){
            var pay = $rootScope.couponData.paymoney ;
        }else{
            var pay = $rootScope.shippingCartData.paymoney;
        }
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'payment': pay,
            'check_box_val': 'true'
        })
        $http({

            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/wallet_balance_order',
            data: args

        }).then(function (response) {
            console.log(response);
            if (response.data.status == 'success') {
                $scope.walletdata = response.data;
                $scope.order_amount = response.data.orderpaybal_amount;
                if(response.data.orderpaybal_amount > 0){
                    alert('Wallet Have Not Enough Money Please Add Another Method');
                }
            } 
        });
    }

    $scope.form ={};
    $scope.tothankyou = function (payment_form) {
        
        if ($scope.form.payby == 'card') {
            alert('Pay by Card');
            return;
        }
       
        if ($('#walletchecked').prop('checked') == true) {
            $scope.scopeorderset = 'on';
        } else {
            $scope.scopeorderset = 'off';

        }
        var error_str = '';
        
        console.log($scope.order_amount )
        if($scope.order_amount != '0.00'){
            console.log('dsfdsjf')
            if ($scope[payment_form].payby.$error.required !== undefined) {
                error_str += "Payment Method, ";
                alert('Payment Method Required')
            }   
        }
        if (error_str == "") {
            loading.active();
            var args = $.param({
                'uid': $cookieStore.get('userinfo').uid,
                'store_id': $cookieStore.get('storeinfo').store_id,
                'daydate': $cookieStore.get('deliverydaytime').date,
                'timeslot': $cookieStore.get('deliverydaytime').time,
                'promocode': $cookieStore.get('promocodeData'),
                'distance': $cookieStore.get('storeinfo').store_distance,
                'device_type': device_type,
                'payment_method': $scope.form.payby,
                'aid': $cookieStore.get('aid'),
                'check_wallet': $scope.scopeorderset
            })
            $http({

                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/itemcartapi/completeOrder',
                data: args

            }).then(function (response) {

                res = response;
                console.log(res.data);
                if (res.data.status == 'success') {
                    $scope.ordercompleted = res.data;
                    $cookieStore.put('orderid', $scope.ordercompleted.orderid);
                    console.log($scope.ordercompleted.orderid)
                    $cookieStore.remove('paymentStatus');
                    $cookieStore.put('thankyou', 'yes');
                    $location.path('/thankyou');

                } else {
                    $cookieStore.remove('paymentStatus');
                    $scope.ordercompleted = res.data;
                    alert('No Item in cart');
                    $location.path('/cart');
                }

            }).finally(function () {
                loading.deactive();
            });
        }
    }

    // alert("On the Payment Mode Page");

});