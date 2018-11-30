app.controller('cart', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter, $route) {


    $scope.homePage = function () {
        $location.path('/dashboard/home');
    }

    $scope.back = function () {
        $location.path('/dashboard/home');
    }

    $scope.singleDelete = function (weightID) {
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'weightid': weightID
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/deleteItem',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response.data;
            console.log(res);
            if (res.status == 'deleted') {
                alert('Product Deleted Successfully')
                $rootScope.usercartvalue();
            } else {
                alert('Item Not Deleted ')
            }
        })

    }


    $scope.paymentsummary = function () {
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'distance': $cookieStore.get('storeinfo').store_distance
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/usercheckout',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response.data;
            $rootScope.shippingCartData = response.data;

            if (res.paymoney > res.minamount) {
                $cookieStore.put('paymentStatus', 'true')
                $location.path('/payment');
            } else {
                alert('Minimum Amount Should Greater Than Rs. ' + res.minamount)
            }

        })


    }

    /**
     * Funtion: empty_cart from cart.html on ng-click
     * Name: Sajal Goyal
     * Created-on: 26/10/2018 at 04:00pm
     * Empty the cart
     */


    $scope.empty_cart = function () {
        if ($rootScope.currentcartitems.length == 0) {
            model.show('Info', 'You Have No Items In Your Shopping Cart.')
            return false;
        }
        loading.active();

        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid,
            'device_type': device_type
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/itemcartapi/clearCart',
            data: args

        }).then(function (response) {
            loading.deactive();
            res = response.data;

            if (res.error == false) {
                $route.reload()
            } else {
                alert('Error Occured')
            }

        })

    }
});