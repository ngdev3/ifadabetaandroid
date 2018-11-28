app.controller('address_add', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    $scope.toBasic = function(){
        $location.path("/myaccount/profile");
    }
    return;
    console.log($cookieStore.get('storeinfo'))

    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    $scope.city = $cookieStore.get('storeinfo').store_city;
    console.log($cookieStore.get('userinfo').phone_no);

    var GlobalUID = $cookieStore.get('userinfo').uid; //UID used for getting data from http request


    /**
     * Created By Nitin Kumar
     * Dated on 09/10/2018
     * Start of Function
     * function name : toProduct
     * on clicking back icon render to the given path
     */
    $scope.toAddress = function () {
        //$location.path("/address");
        window.history.back();
    }

    /**
     * End of function
     */



    /**
     * Created By Nitin Kumar
     * Dated on 10/10/2018
     * Start of Function
     * function name : add_address
     * this function will add the address on to the corresponding id
     */
    $scope.add_address = function (form) {
        var res = '';
        if ($scope[form].$error) {
            // alert();return false;
            var error_str = '';

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name, ";
            }

            if ($scope[form].house_no.$error.required !== undefined) {
                error_str += "House Number, ";
            }

            if ($scope[form].street.$error.required !== undefined) {
                error_str += "Street, ";
            }
            if ($scope[form].city.$error.required !== undefined) {
                error_str += "City, ";
            }

            if ($scope[form].landmark.$error.required !== undefined) {
                error_str += "Landmark, ";
            }

            if ($scope[form].pincode.$error.required !== undefined || $scope[form].pincode.$error.number) {
                error_str += "Pincode, ";
            }

            if ($scope[form].address_type.$error.required !== undefined) {
                error_str += "Address Type, ";
            }
        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
        }, 400);

        if ($scope[form].$valid) { //if all field are filled then this will check pattern of input entered
            // alert("Success");
            var reg1 = /^[a-zA-Z ]+$/;
            var reg2 = /^[A-za-z\d-]{2,10}$/;
            var reg3 = /^[(a-zA-Z)?0-9 ]+$/;
            var reg4 = /^[a-zA-Z ]{3,20}$/;
            var reg5 = /^[a-zA-Z0-9 ]+$/;
            var reg6 = /^[0-9]{6}$/;

            if (reg1.test($scope.fname) == false) {
                error_str = "Full Name should contain Alphabets Only";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg2.test($scope.house_no) == false) {
                error_str = "House Number should contain Numbers & Alphabets Only & Length should be between 2 to 10";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg3.test($scope.street) == false) {
                error_str = "Street should contain Alphabets Only";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg4.test($scope.city) == false) {
                error_str = "City should contain Alphabets Only & Length should be between 3 to 20";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg5.test($scope.landmark) == false) {
                error_str = "Landmark should contain Alphabets Only";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg6.test($scope.pincode) == false) {
                error_str = "Pin Code should contain Numbers Only & Length should be 6";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }



            if (error_str == "") {
                loading.active();
                var args = $.param({
                    'uid': GlobalUID,
                    'fname': $scope.fname,
                    'plot_no': $scope.house_no,
                    'locality': $scope.street,
                    'city': $scope.city,
                    'landmark': $scope.landmark,
                    'pincode': $scope.pincode,
                    'title' : $scope.address_type,
                    'latitude': $cookieStore.get('storeinfo').lat,
                    'longitude': $cookieStore.get('storeinfo').lng,
                });

                $http({
                    headers: {
                        //'token': '40d3dfd36e217abcade403b73789d732',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + 'itemcartapi/addAddress',
                    data: args
                }).then(function (response) {
                    //alert();
                    loading.deactive();
                    res = response;
                    console.log(response);
                    // return false;

                    if (response.data.status == "success") {
                        alert("Address Added  Successfully");
                        //$location.path("/address");
                        window.history.back();
                    } else {
                        alert("Something went wrong.");
                    }
                })
            }
        } // End of Valid
    }
    /**
     * End of Function 
     */
    //loading.deactive();

   

});