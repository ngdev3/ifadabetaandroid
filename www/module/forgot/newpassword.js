app.controller('new_pass', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope) {

 if ($cookieStore.get('userinfo')) {
    $location.path('/dashboard/home');
}

$scope.forgot = function(form){

    //if fields are invalid
    if ($scope[form].$error) {
        var error_str = '';

        if ($scope[form].new_pwd.$error.required !== undefined)
            {
                error_str += "New Password, ";
            }
            if ($scope[form].conf_pwd.$error.required !== undefined)
            {
                error_str += "Confirm New Password, ";
            }
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));

            if (error_str !== '')
            {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span> <br/> " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
            }
        }
        if ($scope[form].$valid) {   
            var reg2 = /[a-zA-Z]/;
            var reg3 = /[0-9]/;

            if (reg2.test($scope.new_pwd) == false) {
                error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            if (reg3.test($scope.conf_pwd) == false) {
                error_str = " Password should contain at least one Character & one Number and length should be 6 minimum! ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            
        }
        if ($scope[form].$valid) {
            if ($scope.conf_pwd != $scope.new_pwd)
            {
                error_str += "New Password and Confirm Password does not match.";
            }

            if (error_str !== '')
            {
                //error_str = " ollowing fields must have valid information " + error_str;
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

    loading.active();

            var args = $.param({
                'user_id_verify': $cookieStore.get('userid'),
                'change_password' : $scope.new_pwd,
                'conform_password' : $scope.conf_pwd
            });
            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/auth/reset_password',
                data: args //forms user object

            }).then(function (response) {

                res = response;
                console.log(response);
                if (res.data.responseStatus == 'success') {
                    
                   alert('Password is successfully changed');
                   $cookieStore.remove('userid');
                   if(response.data.data.result[0].user_type == '6'){
                    $location.path('/login');
                    }else{
                        var userinfo = {
                            'uid': response.data.data.result.id,
                            'phone_no': response.data.data.result.mobile_number,
                            'email_address': response.data.data.result.email,
                            'country_id': response.data.data.result.country_id,
                            'fullName' : response.data.data.result.first_name+" "+response.data.data.result.last_name,
                            'profile_image' : response.data.data.result.profile_image
                        }
                        $cookieStore.put('userinfo', userinfo);
                        
                        $location.path('/dashboard/home');
                    }
                } else {

                    alert('Password not changed')
                }
            }).finally(function () {
                loading.deactive();
            });
        }


}
});    