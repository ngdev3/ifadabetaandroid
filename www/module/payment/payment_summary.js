app.controller('payment_summary', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $routeParams) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    if(!$cookieStore.get('cart')){
        alert('Some Problem in Cart');
        $location.path('/cart');
        return false;
    }

    $scope.paymode= function(){

        if (!$cookieStore.get('userinfo')) {
            alert('Please Login First !')
             return
             //$location.path('')
         }
 
         var args = $.param({
             user_id: $cookieStore.get('userinfo').uid,
             country_id: sessionStorage.country,
 
         });
 
         $http({
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
             method: 'POST',
             url: app_url + '/cart/check_stock_for_cart',
             data: args //forms user object
 
         }).then(function (response) {
             loading.deactive();
             res = response;
            // console.log(res.data.status)
             if(res.data.status == 'valid'){
                 
                 data = true;
                 $location.path('/payment/mode');
                 
             }else{
                 
                 model.show('Alert','Some products in cart is out of stock');
                 $location.path('/cart')
             }
 
             
         })


       // $location.path('/payment/mode');
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
   

    $scope.enablebutton = function () {
        
        $('#promoEdit').removeClass('show').addClass('hide');
        $('#inputpromo').removeAttr('disabled')
        $('#apply').removeClass('hide').addClass('show');
        $('#applied').removeClass('show').addClass('hide');
    }
    

});