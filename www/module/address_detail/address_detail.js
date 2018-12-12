app.controller('address_detail', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $route) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    if(!$cookieStore.get('cart')){
      //  alert('Some Problem in Cart');
        $location.path('/cart');
        return false;
    }
    // if (!$cookieStore.get('paymentStatus')) {
    //     $location.path('/cart');
    //     return false;
    // }

    var GlobalUID = $cookieStore.get('userinfo').uid;

    // $scope.toPaymentSummary = function () {
    //     $location.path("/payment");
    // }
    // $scope.toDeliveryTime = function (ad_id) {
    //     $cookieStore.put('aid', ad_id);
    //     $location.path("/deliverytime");
    // }
    $scope.toAddAddress = function () {
        $location.path("/address/add");
    }
    $scope.paySummary = function (id) {
        $cookieStore.put('aid', id);
        $location.path("/payment");
    }
    

    // /**
    //  * Funtion: all_address from address_detail.html on ng-init
    //  * Name: Nitin Kumar
    //  * Created-on: 04/12/2018 
    //  * Get the Address Details by sending the http request
    //  */

    $scope.all_address = function () {

        loading.active();

        var args = $.param({
            'user_id' : GlobalUID,
            // 'language_code' : 'en',
            'country_id' : sessionStorage.country
        })
        //Get the Address List from LocalAPI    

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/my_address',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            if(res.data.responseCode != 400){
                if(res.data.data.my_address.length > 0){
                    $scope.address = res.data.data.my_address; 
                } 
                res.data.data.my_address.map(function (x, key) {
                    // console.log(x);
                    $cookieStore.put(x.id, x);
                })
            }
                
        })

    }

    /**
     * Funtion: toEditAddress from address_detail.html on ng-click on edit
     * Name: Nitin Kumar
     * Created-on: 04/12/2018 at 02:15pm
     * Send data to the edit page on the bases of its id.
     */
    $scope.toEditAddress = function (ad_id) {
        $location.path("/address/edit/:id=" + ad_id);
        console.log(ad_id);
    }


    // /**
    //  * Funtion: delete_address from address_detail.html on ng-click on delete
    //  * Name: Sajal Goyal
    //  * Created-on: 23/10/2018 at 02:45pm
    //  * Delete the Address
    //  */

    // $scope.delete_address = function (ad_id) {

    //     // alert(ad_id);

    //     var args = $.param({
    //         'uid': GlobalUID,
    //         'aid': ad_id
    //     });
    //     //var isConfirmed = confirm("Are you sure to delete this record ?");

    //     $.confirm({
    //         title: 'Delete!',
    //         content: 'Are You Sure!',
    //         buttons: {
    //             confirm: function () {
    //                 loading.active();
    //                 $http({
    //                     headers: {
    //                         //'token': '40d3dfd36e217abcade403b73789d732',
    //                         'Content-Type': 'application/x-www-form-urlencoded'
    //                     },
    //                     method: 'POST',
    //                     url: app_url + 'itemcartapi/deleteAddress',
    //                     data: args
    //                 }).then(function (response) {
    //                     loading.deactive();
    //                     // console.log(response);
    //                     if (response.data.status == "success") {
    //                         alert("Address Successfully Deleted");
    //                         $route.reload();
    //                     } else {
    //                         alert("Something went wrong.");
    //                     }
    //                 })
    //             },
    //             cancel: function () {
    //                 $.alert('Cancelled!');
    //                 $scope.all_address();
    //             }
    //         }
    //     })

    // }
    if($cookieStore.get("userinfo")){
        $scope.fullName = $cookieStore.get("userinfo").fullName;
    }
});