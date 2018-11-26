app.controller('fetch', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {

    //this cookieStore will check if user is logged in or not 
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    $scope.backToHome = function () {
        $location.path('/dashboard/home');
    }

    /**
     * created on : 24/10/2018
     * created by : Nitin kumar
     * function name : getStore
     * this function will get the store id based on user's selected location 
     * if store is available then id & name is stored in the cookie else alert msg will be shown to the user to select other location
     */

    $scope.getStore = function (form) {
        // console.log($scope.pickup_location);return;
        // loading.active();
        /* if(lat !== undefined || lng !== undefined){
            alert("Please Select Proper Location");
        } */

        if ($scope[form].$error) {
            var error_str = '';

            if ($scope[form].pickup_location.$error.required !== undefined) {
                error_str += "Location";
                alert("Location Field must have valid information");
            }
        }


        if (error_str == '') {
            loading.active();

            var args = $.param({
                'latitude': lat,
                'longitude': lng
            });

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/itemcartapi/getlocationapi',
                data: args

            }).then(function (response) {

                res = response;
                console.log(res); //return;            
                if (res.data.status == 'pass') {

                    var storeinfo = {
                        'store_id': res.data.store_id,
                        'store_name': res.data.store_name,
                        'address': $scope.pickup_location,
                        'store_distance': res.data.store_distance,
                        'store_city' : res.data.store_city,
                        'lat': lat,
                        'lng': lng,
                    }
                    $cookieStore.put('storeinfo', storeinfo);
                    lat = "";
                    lng = "";
                    $location.path('/dashboard/home');

                } else {
                    alert("Sorry..We Don't serve in this location");
                    lat = "";
                    lng = "";
                    return false;
                }

            }).finally(function () {
                loading.deactive();
            });
        }
    }
    //End of Function

});