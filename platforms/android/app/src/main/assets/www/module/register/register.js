app.controller('user_register', function ($rootScope, $scope, $http, $location, $interval, $cookieStore, model, loading, $filter) {


    if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    }


    $scope.terms = function () {
        $location.path('/terms');
    }

    if ($cookieStore.get('newregister') != '' || $cookieStore.get('newregister') != undefined) {
        if ($cookieStore.get('newregister')) {
            $scope.mob_number = $cookieStore.get('newregister').mobile;
        }
    }

    $scope.user_registers = function (form) {

        let ipAddress;
        var getIPAddress = function () {
            $.getJSON("https://jsonip.com?callback=?", function (data) {
                ipAddress = data.ip
            });
        }
        getIPAddress();
        var error_str = '';
        if ($scope[form].$error) {

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name, ";
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
            if ($scope[form].confirm_password.$error.required !== undefined) {
                error_str += "Confirm Password, ";
            }

            if ($scope[form].term_conditions.$error.required !== undefined) {
                error_str += "Terms & Conditions, ";
            }

        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }, 100);

        if($scope[form].$valid){
            var reg1 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg2 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


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

            if (reg2.test($scope.confirm_password) == false) {
                error_str = " Confirm Password should contain at least one Character,one Number & one Special Char and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

            if ($scope.confirm_password != $scope.password)
            {
                error_str += "Password and Confirm Password does not match.";
                alert(error_str);
                return false;
            }           
        }

        if (error_str == '') {
            var args = $.param({
                user_name: $scope.fname,
                user_email: $scope.email,
                user_mob: $scope.mob_number,
                user_password: $scope.password,
                user_ip: ipAddress,
                login_type: device_type
            });
            loading.active();
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/loginapi',
                data: args //forms user object

            }).then(function (response) {

                res = response;

                console.log("response from the server ")
                console.log(response)

                if (res.data.status == 'success') {
                    var setOTPCookies = {
                        'mobile': $scope.mob_number,
                        'uid': res.data.uid,
                        'status':res.data.status,
                        'from': 'register'
                    }
                    $cookieStore.put('otpverification', setOTPCookies);
                    $location.path('/otp');
                    $cookieStore.remove('newregister');
                    model.show('Info', 'Registered Successfully');
                } else {

                    //Throw error if not logged in
                    alert('Mobile number or Email-id already Exists')
                    //model.show('Alert', res.data.responseMessage);
                    $location.path('/register');
                }
            }).finally(function () {
                loading.deactive();
            })
        }

    }
});