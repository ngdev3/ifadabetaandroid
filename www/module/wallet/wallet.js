app.controller('wallet', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    $scope.my_wallet_data = function(){
        loading.active();
        var args = $.param({
            user_id: $cookieStore.get('userinfo').uid,
            page : '0'

        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/wallet_list',
            data: args //forms user object

        }).then(function (response) {
            loading.deactive();
            res = response;
            
            //  alert("response from the server ");
            if (res.data.responseStatus == 'success') {
                $scope.wallet_amount = res.data.data.wallet_data.wallet_total_amount - res.data.data.wallet_data.wallet_used_amount;
                $scope.wallet_transaction = res.data.data.wallet_transaction;
                   console.log($scope.wallet_transaction)
            } else {
                alert(res.data.responseStatus);
            }
            // console.log(response);

        }).finally(function () {
            //loading.deactive();
        })
    }


    $scope.update_profile = function (form) {

        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].amount.$error.required !== undefined || $scope[form].amount.$error.number) {
                error_str += "Enter Amount, ";
            }

            if ($scope[form].creditpay.$error.required !== undefined) { 
                alert('Please Select Payment Method')
            }
            
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }
        if ($scope[form].$valid) {
            var reg1 = /^[0-9]*$/;
            
            if (reg1.test($scope.amount) == false) {
                error_str = "Please Enter Positive integers";
                alert(error_str);
                return false;
            }
        
        if (error_str == '') {
            loading.active();
            var args = $.param({
                user_id: $cookieStore.get('userinfo').uid,
                language_code: sessionStorage.lang_code,
                wallet_amount: $scope.amount,

            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/cart/add_wallet',
                data: args //forms user object

            }).then(function (response) {
                loading.deactive();
                res = response;
                //console.log(res)
                //  alert("response from the server ");
                if (res.data.responseStatus == 'success') {
                    alert('Amount Successfully Added Into Wallet')
                    $scope.my_wallet_data();
                    $scope.amount="";
                    $scope.creditpay= "";
                    
                } else {
                    alert(res.data.responseStatus);
                }
                // console.log(response);

            }).finally(function () {
                //loading.deactive();
            })
        }
    }
    }
});