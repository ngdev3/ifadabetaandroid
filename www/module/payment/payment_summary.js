app.controller('payment_summary', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {



    $scope.paymode= function(){
        $location.path('/payment/mode');
    } 
   
    $scope.fullName = $cookieStore.get("userinfo").fullName;
    /**
     * Funtion: Payment Summary from payment_summary.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 22/10/2018 at 03:15pm
     * Get the Payment Summary by sending the http request
     */

    $scope.address_get = function () {

        loading.active();

        var args = $.param({
            address_id: $cookieStore.get('aid'),
            language_code: sessionStorage.lang_code

        })
        $http({

            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_address_by_id',
            data: args

        }).then(function (response) {

            res = response;
            console.log(res.data.data);

            if(res.data.data.status == 'success'){
               $scope.delivery_address =  res.data.data.address;
            }
           

        }).finally(function () {
            loading.deactive();
        });


    }

    $scope.formData = {}; //made model object.property in html and this line will assign empty object,then use inside function

    /**
     * Funtion: run on as soon as page loads
     * Created By: Nitin Kumar
     * Created-on: 26/10/2018 
     * if cookie is set then automatically bind the coupon already applied
     */
    
    if($cookieStore.get('promocodeData')){
        
        $scope.formData.coupon = $cookieStore.get('promocodeData');

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance,
            'promocode': $scope.formData.coupon
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/applyPromo',
            data: args
        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res);

            if (res.data.status == "success") {
                $rootScope.couponData = res.data;               
                $('#inputpromo').attr("disabled", "disabled");;
                $('#apply').removeClass('show').hide();
                $('#applied').removeClass('hide').show();
                $('#promoEdit').removeClass('hide').show();

                // alert("Coupon Applied Successfully");
                // console.log($scope.couponData);
            } else {
                alert("Coupon Code is invalid");
            }
        })
    }
    

    $scope.enablebutton = function () {
        
        $('#promoEdit').removeClass('show').addClass('hide');
        $('#inputpromo').removeAttr('disabled')
        $('#apply').removeClass('hide').addClass('show');
        $('#applied').removeClass('show').addClass('hide');
    }
    


    /**
     * Funtion: applyPromocode
     * Created By: Nitin Kumar
     * Created-on: 25/10/2018 
     * Fetch the Promocode by sending the http request
     */
    $scope.applyPromocode = function (form) {

        //$rootScope.couponData = '';
        // console.log($scope.formData.coupon);return false;
        
        loading.active();
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance,
            'promocode': $scope.formData.coupon
        });
        // console.log(args);
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/applyPromo',
            data: args
        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res);

            if (res.data.status == "success") {
                $rootScope.couponData = res.data;
                $scope.promoValue = $scope.formData.coupon;
                $cookieStore.put('promocodeData', $scope.formData.coupon);

                $('#inputpromo').attr("disabled", "disabled");
                $('#apply').removeClass('show').hide();
                $('#applied').removeClass('hide').show();
                $('#promoEdit').removeClass('hide').show();

                alert("Coupon Applied Successfully");
                // console.log($scope.couponData);
            } else {
                alert("Coupon Code is invalid");
                $cookieStore.remove('promocodeData');
            }
        })
    }

    //End of Function

});