app.controller('otp', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope) {


    if (!$cookieStore.get('otpverification')) {
        $location.path('/login');
        return false;
    }

    $scope.sendAt = $cookieStore.get('otpverification').mobile_number
    console.log($cookieStore.get('otpverification'))


    $scope.thirdpay = function (id) {
        //  console.log(id.toString().length)

        if (id.toString().length >= 5) {
            alert('OTP must be 4 Digits allowed')
            return false;
        }


    }

    $scope.otpVerification = function (form) {
        if ($scope[form].$error) {
            var error_str = '';
            
            if ($scope[form].third.$error.required !== undefined || $scope[form].third.$error.number) {
                error_str += "OTP is required ";
                alert(error_str);
                return false;
            }


            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                alert(error_str);
                // alert(error_str)
                return false;
            }
        };
        if ($scope[form].$valid) {

            if ($scope.third.toString().length > 4 ||$scope.third.toString().length < 4 ) {
                alert('OTP must be 4 Digits allowed')
                return false;
            }

            if (!jQuery.isEmptyObject($scope.third)) {
                error_str += "OTP Number";
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                alert(error_str);
                // alert(error_str)
                return false;
            }

            // return false;
            $scope.otpcode = $scope.third; ///($scope.third) + "" + ($scope.second) + "" + ($scope.third) + "" + ($scope.fourth);
            console.log($scope.otpcode);
            loading.active();


            var args = $.param({
                mobile_number: $cookieStore.get('otpverification').mobile_number,
                otp: $scope.otpcode,
                language_code : 'en'
            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/auth/otp_verify',
                data: args //forms user object

            }).then(function (response) {

                console.log(response)
                if (response.data.data.status == 'success') {

                    //model.show('Success', 'Successfully Verified');
                    alert('OTP verified Successfully')
                    $cookieStore.remove('otpverification');
                    $location.path('/login');
                    /* if ($cookieStore.get('userid')) {
                        $location.path('/newpassword');
                    } else {
                        $location.path('/login');
                    } */

                } else {
                    alert("Please enter valid OTP");
                }

            }).finally(function () {
                loading.deactive();
            });

        }
    }


    $scope.resendOtps = function () {
        var args = $.param({
            user_id: $cookieStore.get('otpverification').uid,
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'loginapi/resendotp',
            data: args //forms user object

        }).then(function (response) {

            console.log(response);

            if (response.data.status == 'pass') {

                model.show('Alert', 'OTP Sent Successfully!');
            } else {
                model.show('Alert', response.data.error_msg);
            }

        }).finally(function () {
            loading.deactive();
        });
    }




});