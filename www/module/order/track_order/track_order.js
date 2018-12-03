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
            'order_id': $cookieStore.get('orderids').order_id,
            'm_order_id': $cookieStore.get('orderids').m_id,
            'language_code':sessionStorage.lang_code
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/track_order',
            data: args

        }).then(function (response) {
            res = response;
            
            if (res.data.responseStatus == 'success') {
                
                $scope.trackorder = res.data.data.order_status;
                $scope.orderhistory = res.data.data.orderHistory;
                /* console.log($scope.orderhistory)
                for(var i=0; i<$scope.orderhistory.length; i++){
                    $scope.trackhistory = $scope.orderhistory[i].order_status;
                }
                console.log($scope.trackhistory) */
                $scope.trackorder_location = res.data.data.order_location;
                $location.path('/order/track_order');

            } else {
                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.responseStatus);
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