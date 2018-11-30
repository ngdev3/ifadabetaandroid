app.controller('login', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {

    
   // alert();
    if ($cookieStore.get('userinfo')) {

        $location.path('/dashboard/home')
    }

    //create table at local database to store the data of users information at time of login
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (id INTEGER PRIMARY KEY AUTOINCREMENT, uid, phone_no, email_address, country_id, date_added)');

    });

   /*  if ($cookieStore.get('userinfo')) {
        $location.path('/dashboard/home');
    } */

   // 
    loading.deactive();


    $scope.SentToforgot = function () {
        $location.path('/forgot');
    }

    $scope.signup = function () {
        $location.path('/register');
    }

    // $scope.mobile_no = '8299334781';
    $scope.phoneVerifiedStatus = false;
    $scope.loginuser = function (form) {
        
        if ($scope[form].$error) {
            //  alert("Error");
            var error_str = '';
            if ($scope[form].mobileno.$error.required !== undefined || $scope[form].mobileno.$error.number) {
                error_str += "Mobile No, ";
            }
            if ($scope[form].userpassword.$error.required !== undefined) {
                error_str += "Password";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
               alert(error_str);
                // model.show('Alert', error_str);
            }
        };
        if ($scope[form].$valid) {

            if (jQuery.isEmptyObject($scope.userpassword)) {
                error_str += "Password";
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
                model.show('Alert', error_str);
                // alert(error_str)
                return false;
            }

            loading.active();

            var args = $.param({
                login_mobile_number: $scope.mobileno,
                login_password: $scope.userpassword,
                language_code:country
            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/auth/login',
                data: args //forms user object

            }).then(function (response) {
                console.log("---------------");
                console.log(response);
                
                if (response.data.responseStatus == 'success') {
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO userinfo ( uid, phone_no, email_address, country_id, date_added) VALUES ("' + response.data.data.id + '","' + response.data.data.mobile_number + '","' + response.data.data.email + '","' + response.data.data.country_id + '","' + response.data.data.created_date + '")');
                    });
                    var fname = response.data.data.first_name;
                    var lname = response.data.data.last_name;

                    var fullName = fname+" "+lname;
                    // console.log(fullName);
                    var userinfo = {
                        'uid': response.data.data.id,
                        'phone_no': response.data.data.mobile_number,
                        'email_address': response.data.data.email,
                        'country_id': response.data.data.country_id,
                        'fullName' : fullName,
                        'address' : response.data.data.address,
                        'profile_image' : response.data.data.profile_image
                    }
                    $cookieStore.put('userinfo', userinfo);
                    $location.path('/splash');

                } else {

                    if(response.data.responseMessage == 'Your account is not verified please Verify OTP !'){
                        var setOTPCookies = {
                            'mobile_number': $scope.mobileno,
                            'from' : 'login'
                    }
                        $cookieStore.put('otpverification', setOTPCookies);
                        alert('Please Varify OTP');
                        $location.path('/otp');
                        return false;
                    }else if(response.data.responseMessage == 'Invalid login credentials'){
                        
                        alert('Mobile No. is Invalid');
                    
                    }else if(response.data.responseMessage =='Password does not match !'){
                        
                        alert('Password is Invalid');
                    
                    }else{

                        alert('Login Credentials are Wrong');
                    }
                    //model.show('Alert', response.data.responseMessage);
                }

            }).finally(function () {
                loading.deactive();
            });

        }
    };

});