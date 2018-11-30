app.controller('track_order', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope, $cordovaFileTransfer) {

    
    $scope.home = function () {
        //$location.path('/home');
        window.history.back();
    }


    /**
     * Funtion: ordersDetalisInit from my_orders_details.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 10/10/2018 at 11:00am
     * Get the order details by sending the http request
     */


    $scope.trackorderDetail = function () {
        loading.active();

        var args = $.param({
            order_id: $cookieStore.get('orderID'),
            user_id:$cookieStore.get("userinfo").uid,
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code
        });
        loading.active();
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/order_summary',
            data: args //forms user object

        }).then(function (response) {

            res = response;

            console.log(res.data.data)
            if (res.data.data.status == 'success') {
                $scope.detail = res.data.data.basic_info;
                $scope.delivery_address = res.data.data.delivery_address;
                $scope.detail_distribution = res.data.data.basic_info.order_manufacturer_distribution;
                $scope.item= [];
                for(var i=0; i<$scope.detail_distribution.length;i++){
                    $scope.item = res.data.data.basic_info.order_manufacturer_distribution[i].items;
                    
                }
                console.log($scope.item)
            } else {

                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });
    }

  $scope.orderinfo = $cookieStore.get('orderinfo');
    /**
     * Created By Nitin Kumar
     * Dated on 17/10/2018
     * Start of Function
     * function name : orderAgain
     * work on clicking on Order Again and work using reorder API
     */
    $scope.orderAgain = function (no) {
        loading.active();

        var args = $.param({
            'uid': GlobalUID,
            'order_no': no,
            'device_type': "android"
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/profileapi/reorder',
            data: args

        }).then(function (response) {
            res = response;
            // console.log(res);
            if (res.data.status == 'success') {
                console.log(res);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
                $location.path('/cart');

            } else {
                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });
    }

    //End of Function


});