app.controller('user_register', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    $scope.terms = function () {
        $location.path('/terms');
    }

    $scope.user_registers = function (form) {
    
        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "First Name, ";
            }

            if ($scope[form].lname.$error.required !== undefined) {
                error_str += "Last Name, ";
            }

            if ($scope[form].email.$error.required !== undefined || $scope[form].email.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].mob_number.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }

            if ($scope[form].password.$error.required !== undefined) {
                error_str += "Password, ";
            }
            

        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                //model.show('Alert', error_str);
                alert(error_str)
                return false;
            }
        }, 100);

        if($scope[form].$valid){
            var reg1 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg2 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            var reg4 = /^[a-zA-Z ]+$/;
            var reg5 = /^[^0][0-9]{9}$/;

            if (reg4.test($scope.fname) == false) {
                error_str = "First Name should contain Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg4.test($scope.lname) == false) {
                error_str = "Last Name should contain Alphabets Only";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }

            if (reg3.test($scope.email) == false) {
                error_str = " Please enter proper Email-ID ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg1.test($scope.password) == false) {
                error_str = " Password should contain at least one Character,one Number & one Special Char and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if (reg5.test($scope.mob_number) == false) {
                error_str = "Mobile Number should contain Numbers Only & Length should be 10";
                model.show('Alert', error_str);
                // alert(error_str);
                return false;
            }


            if($('#retailer').prop('checked') == true){
                // alert();return;
                $scope.retailer = '1';
            }else{
                $scope.retailer = '';
              }
            
        }

        if (error_str == '') {

            loading.active();
            
            var args = $.param({
                first_name: $scope.fname,
                last_name: $scope.lname,
                email: $scope.email,
                mobile_number: $scope.mob_number,
                password: $scope.password,
                language_code: sessionStorage.lang_code,
                referal_code: $scope.referal_code
               // is_retailer : $scope.retailer
            });
            
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/auth/registration',
                data: args //forms user object

            }).then(function (response) {

                res = response;

                console.log("response from the server ")
                console.log(response.data)
                if(res.data.responseCode == 200){
                   
                    var setOTPCookies = {
                        'email': res.data.data.email,
                        'first_name': res.data.data.first_name,
                        'last_name': res.data.data.last_name,
                        'mobile_number': res.data.data.mobile_number,
                        'user_id': res.data.data.user_id,
                        'user_type': res.data.data.user_type,
                        'status':res.data.data.status,
                        'is_verify': res.data.data.is_verify,
                        'from' : 'register'
                    }
                    $cookieStore.put('otpverification', setOTPCookies);
                    alert('Registered Successfully')
                    //console.log($cookieStore.get('otpverification'))
                    $location.path('/otp');
                }else{
                    alert(res.data.responseMessage.error_msg);
                    return false;
                }

            }).finally(function () {
                loading.deactive();
            })
        }

    }
});