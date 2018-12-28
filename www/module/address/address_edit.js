app.controller('address_edit', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope,$routeParams) {
     
    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
         return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request
    
    
/**
 * Created By Nitin Kumar
 * Dated on 08/10/2018
 * Start of Function
 * function name : address_edit_data
 * work on initialization and will fetch address based on id
 */
  $scope.address_edit_data = function(){
    loading.active();
    var paramid = $routeParams.id.split('=');
    // alert(paramid);return;
    // console.log("edit address init ");
    console.log($cookieStore.get(paramid[1]))
    $scope.addressEdit = $cookieStore.get(paramid[1]);
    // console.log(address);return;
    // $scope.form.country = $scope.addressEdit.COUNTRY_NAME;
     $scope.country = $scope.addressEdit.country;
     $scope.city = $scope.addressEdit.city;
    $scope.address = $scope.addressEdit.address;
    $scope.landmark = $scope.addressEdit.landmark;
    $scope.zip = parseInt($scope.addressEdit.zipcode);
    $scope.instruction = $scope.addressEdit.delivery_instruction;
    $scope.mobile = $scope.addressEdit.mobile_number;
    loading.deactive();
    //console.log(address);

  }


  /**
 * Created By Nitin Kumar
 * Dated on 03/12/2018
 * Start of Function
 * function name : edit_address
 * this function will check the validation first and then update the address if all fields are correct
 */

  $scope.saveEditAddress = function(form){
    
     //console.log(form);
     //return false;
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
            //var reg1 = /^([a-zA-Z0-9- ]{6,})$/; 
            //var reg2 = /^[0-9]{6}$/;
            var reg3 = /^[^0][0-9]{9}$/;;
            //var reg4 = /^[a-zA-Z- ]+$/;
        //     var reg5 = /^[a-zA-Z ]+$/;
        //    var reg2 = /^[A-za-z\d-]{2,10}$/;
        //     var reg4 = /^[a-zA-Z ]{3,20}$/;

        /*  if (reg1.test($scope.landmark) == false) {
                error_str = "Landmark should contain Numbers & Alphabets Only & Length should be 6 Minimum";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg2.test($scope.zip) == false) {
                error_str = "Zip Code should contain Numbers Only & Length should be 6";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg1.test($scope.instructions) == false) {
                error_str = "Delivery Instruction should contain Numbers & Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            } */

            if (reg3.test($scope.mobile) == false) {
                error_str = "Mobile Number should contain Numbers Only & Length should be 10";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            } 
        
        //End of pattern checking


        if(error_str == ""){
            loading.active(); 
            var args = $.param({    
                'id' : $scope.addressEdit.id,
                'country_id' : $scope.country,        
                'city_id': $scope.city,
                'address': $scope.address,
                'landmark': $scope.landmark,
                'delivery_instructions': $scope.instruction,
                'mobile_number': $scope.mobile,
                'zip_code': $scope.zip,
                'lattitude' : 28.5355161,
                'longitude' : 25.3019341,
                language_code: sessionStorage.lang_code
            });
        
            //Edit Address from LocalAPI    

            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method : 'POST',
                url : app_url + '/edit_Address',
                data : args   
                }).then(function(response){
                    //alert();
                    loading.deactive();
                    //res = response;
                    // console.log(response);return;
                    
                    if(response.data.data.status == 'success'){
                        alert("Address Updated Successfully"); 
                        //$location.path("/address"); 
                        window.history.back(); 
                                    
                    }else{
                        alert("Sorry..No Data Found!");
                    }
                })  
            }
        }       // End of $valid 
    }           // edit_address function ends    


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
                // $scope.country = res.data.data.country[0].id;
                $scope.fetchcity();   
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
            'country_id': sessionStorage.country
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
});