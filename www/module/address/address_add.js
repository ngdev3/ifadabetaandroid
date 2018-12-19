app.controller('address_add', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    
    $scope.toBasic = function(){
        $location.path("/myaccount/profile");
    }

    

    $scope.country = sessionStorage.country;
    // return;
    // console.log($cookieStore.get('storeinfo'))

   /*  if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    } */

    // $scope.city = $cookieStore.get('storeinfo').store_city;
    // console.log($cookieStore.get('userinfo').phone_no);

    // var GlobalUID = $cookieStore.get('userinfo').uid; //UID used for getting data from http request


    /**
     * Created By Nitin Kumar
     * Dated on 09/10/2018
     * Start of Function
     * function name : toProduct
     * on clicking back icon render to the given path
     */
   /*  $scope.toAddress = function () {
        //$location.path("/address");
        window.history.back();
    }
 */
    /**
     * End of function
     */



    /**
     * Created By Nitin Kumar
     * Dated on 29/11/2018
     * Start of Function
     * function name : saveAddress
     * this function will add the address on to the corresponding id
     */
    //$scope.form = {};
    $scope.saveAddress = function (form) {
        console.log($scope.zip);
        var res = '';
        if ($scope[form].$error) {
            // alert();return false;
            var error_str = '';                       

            if ($scope[form].country.$error.required !== undefined) {
                error_str += "Country, ";
            }

            if($scope[form].city.$error.required !== undefined){
                error_str += "City, ";
            }

            if ($scope[form].address.$error.required !== undefined) { 
                error_str += "Address, ";
            } 
           
            if ($scope[form].landmark.$error.required !== undefined) {
                error_str += "Landmark, ";
            } 

            if ($scope[form].zip.$error.required !== undefined || $scope[form].zip.$error.number) {
                error_str += "Zip Code, ";
            }

            if ($scope[form].instruction.$error.required !== undefined) {
                error_str += "Delivery Instructions, ";
            }
            if ($scope[form].mobile.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }
           
        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }
        }, 400);

        if ($scope[form].$valid) { //if all field are filled then this will check pattern of input entered
            // alert("Success");
           // var reg1 = /^([a-zA-Z0-9- ]{6,})$/;
            //var reg2 = /^[0-9]{6}$/;
            var reg3 = /^[^0][0-9]{9}$/;
            var reg4 = /^([a-zA-Z- ])+$/;
        //     var reg5 = /^[a-zA-Z ]+$/;
        //    var reg2 = /^[A-za-z\d-]{2,10}$/;
        //     var reg4 = /^[a-zA-Z ]{3,20}$/;

         /* if (reg1.test($scope.landmark) == false) {
                error_str = "Landmark should contain Numbers & Alphabets Only & Length should be 6 Minimum";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            } */

          /*   if (reg2.test($scope.zip) == false) {
                error_str = "Zip Code should contain Numbers Only & Length should be 6";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            } */

            if (reg4.test($scope.instructions) == false) {
                error_str = "Delivery Instruction should contain Numbers & Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg3.test($scope.mobile) == false) {
                error_str = "Mobile Number should contain Numbers Only & Length should be 10";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

           /*  if (reg5.test($scope.landmark) == false) {
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
            } */



            if (error_str == "") {
               
                // alert();return;
                loading.active();
                var args = $.param({
                    'user_id': $cookieStore.get("userinfo").uid,
                    'country_id': $scope.country,
                    'city_id': $scope.city,
                    'address': $scope.address,
                    'zip_code': $scope.zip,
                    'landmark': $scope.landmark,
                    'delivery_instructions': $scope.instruction,
                    'mobile_number': $scope.mobile,
                    'lattitude': 28.5355161,
                    'longitude': 25.3019341,
                });

                $http({
                    headers: {
                        //'token': '40d3dfd36e217abcade403b73789d732',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: app_url + '/add_address',
                    data: args
                }).then(function (response) {
                    //alert();
                    loading.deactive();
                    res = response;
                    console.log(response);
                    // return false;

                    if (response.data.data.status == "success") {
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

   

    $scope.fetchcountry = function(){
        loading.active();      
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded' //'multipart/form-data' 
            },
            method: 'POST',
            url: app_url + '/get_country',
            //data: args
        }).then(function (response) {  
            loading.deactive();
            console.log(response);
            res = response;   
            if (res.data.data.status == 'success') {
                $scope.Countries = res.data.data.country;   
                console.log($scope.Countries);             
            } else {    
                model.show('Alert', res.data.responseMessage);
                $location.path('/address/add');
            }
        }).finally(function () {
            loading.deactive();
        })
    }

     //default city
     $scope.fetchcity = function(){
        loading.active();
        var args = $.param({
            'country_id': $scope.country
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded' //'multipart/form-data' 
            },
            method: 'POST',
            url: app_url + '/get_city',
            data: args
        }).then(function (response) {  
            loading.deactive();
            // console.log(response);

            res = response;   
            if (res.data.data.status == 'success') {
                // console.log(res.data.data.city);
                if(!res.data.data.city){
                    model.show('Alert','No Cities Found!');
                    $scope.Cities = "";
                    console.log($scope.Cities);
                    return false;
                }else{
                    $scope.Cities = res.data.data.city;   
                    console.log($scope.Cities); 
                }
            } else {    
                model.show('Alert', res.data.responseMessage);
                $location.path('/address/add');
            }
        }).finally(function () {
            loading.deactive();
        })
    }

    $scope.fetchcity();
});