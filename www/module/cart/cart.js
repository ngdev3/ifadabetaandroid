app.controller('cart', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter, $route) {



    
    $scope.homePage = function () {
        $location.path('/dashboard/home');
    }

    $scope.back = function () {
        $location.path('/dashboard/home');
    }

   




    /**
     * Funtion: empty_cart from cart.html on ng-click
     * Name: Sajal Goyal
     * Created-on: 26/10/2018 at 04:00pm
     * Empty the cart
     */


    $scope.empty_cart = function () {
    console.log($scope.cart_data)
        if ($scope.cart_data.length == 0) {
            model.show('Info', 'You Have No Items In Your Shopping Cart.')
            return false;
        }
        loading.active(); 

        var args = $.param({
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code ,   
            user_id:$cookieStore.get("userinfo").uid,
            token: sessionStorage.u_ids
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/empty_cart',
            data: args

        }).then(function (response) {
            loading.deactive();
            res = response.data;
// console.log(res)
            if (res.data.status == 'success') {
                alert(res.responseMessage)
               $rootScope.usercartvalue()
            } else {
                alert('Error Occured')
            }

        })

    }

    $scope.deleteproduct = function (rowid) {

        // alert(rowid);
        // return
        loading.active();

        var args = $.param({
            rowid: rowid,
            language_code: sessionStorage.lang_code,
            user_id: $cookieStore.get("userinfo").uid,
            country_id: sessionStorage.country,
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/removeItemCart',
            data: args

        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response.data;
            console.log(res);
            $rootScope.usercartvalue();
            if(res.data.cart_count == 0){
                $rootScope.usercartvalue();
                alert('Product Deleted Successfully');
            }
           
        })

    }



    $scope.address_delivery = function() {
        


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
                    $location.path('/addressdetail');
                    
                }else{
                    
                    model.show('Alert','Some products in cart is out of stock');
                    $location.path('/cart')
                }
    
                
            })
                  
    }

    // $scope.promocode = 'COP223229';
    
 //   $rootScope.promocode = $scope.promocode 

    $scope.initpomo = function(){
        if ($cookieStore.get('promocode')) {

            $rootScope.promocode = $cookieStore.get("promocode").codename
            $rootScope.apply_promo('apply');
            //$location.path('/dashboard/home')
        }
    }
    
});