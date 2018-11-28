app.controller('myprofile', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $route) {


    // return;
    $scope.maxDate = new Date();
    $scope.monthSelectorOptions = {
        format: "dd-MM-yyyy"
    }
    

    /* Upload adds link */

    $scope.upload_ad = function () {
        $location.path('/upload_ads');
    }

    $scope.my_account = function () {
        $location.path("myaccount/account");
    }

    /* End Upload adds link  Here*/

    /* Update Profile of advertiser Link Form */

    $scope.update_advertise_info = function () {
        $location.path('myaccount/advertise_up');
    }

    /* End Update Profile of advertiser Link Form */


    /* Change Password  for advertiser Link Form */

    $scope.changepassword_advertise = function () {
        $location.path('/changepassword');
    }
    /* get Profile data for perticular user id  */


    //Function to fetch the User's Data

    $scope.myprofile_data = function () {
        loading.active();
        //console.log("Profile data initialize")

        var args = $.param({
            'user_id': $cookieStore.get("userinfo").uid,
            'language_code' : 'en'
        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/basic_info',
            data: args //forms user object

        }).then(function (response) {
            loading.deactive();
            res = response;
            // console.log(res.data.data);return;
            if (res.data.data.status == 'success') {
                console.log(res);
                //put cookie and redirect it    
                $scope.fname = res.data.data.basic_info.first_name;
                $scope.lname = res.data.data.basic_info.last_name;
                $scope.email = res.data.data.basic_info.email;
                $scope.mobile = res.data.data.basic_info.mobile_number;
                $scope.address = res.data.data.address_details[0].address;
                $scope.country = res.data.data.address_details[0].COUNTRY_NAME;
                $scope.city = res.data.data.address_details[0].CITY_NAME;
                console.log($scope.country);
                $scope.image = res.data.data.basic_info.image;
            } else {

                //Throw error if not logged in
                model.show('Alert', res.data.responseMessage);
            }
        });

    }

    /*Update user profile */

    $scope.update_profile = function (form) {
        var error_str = '';
        
        if ($scope[form].$error) {

            if ($scope[form].fname.$error.required !== undefined) {
                error_str += "Full Name, ";
            }

            if ($scope[form].email.$error.required !== undefined || $scope[form].email.$error.email) {
                error_str += "Email Id, ";
            }
            if ($scope[form].mobile.$error.required !== undefined) {
                error_str += "Mobile Number, ";
            }

            if ($scope[form].dob.$error.required !== undefined) {
                error_str += "Date of Birth, ";
            }
            
            if ($scope[form].gender.$error.required !== undefined) {
                error_str += "Gender, ";
            }
        }
        setTimeout(function () {
            error_str = error_str.substr(0, error_str.lastIndexOf(', '));
            if (error_str !== '') {
                error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                model.show('Alert', error_str);
                return false;
            }
        }, 400);
        if (error_str == '') {

            var reg1 = /[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}/;

            if (reg1.test($scope.dob) == false) {
                error_str = "Date Format Is Wrong";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }
            loading.active();
            var args = $.param({
                uid: GlobalUID,
                email: $scope.email,
                mobile: $scope.mobile,
                dob: $scope.dob,
                gender: $scope.gender,
                name: $scope.fname,

            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'profileapi/updateProfile',
                data: args //forms user object

            }).then(function (response) {
                loading.deactive();
                res = response;

                console.log("response from the server ");
                console.log(response);

                if (res.data.status == 'success') {
                   
                    //console.log("Profile updated")
                    model.show('Alert', 'Profile Updated Successfully');
                    $route.reload();
                    //$location.path('/dashboard/home');
                    
                } else {

                    //Throw error if not logged in

                    model.show('Alert', res.data.responseMessage);
                    $location.path('/dashboard/myprofile');
                }
            }).finally(function () {
                //loading.deactive();
            })
        }
    }

  
    $scope.profile_update = function(files){
        
      
        //console.log(files)
         this.files = event.target.files;
         var profile_image = this.files[0].name;	
        
        console.log(profile_image)
        loading.active();
        
        // return false
        var args = $.param({
            'uid': $cookieStore.get('userinfo').uid,
            'file' : profile_image
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded' //'multipart/form-data' 
            },
            method: 'POST',
            url: app_url + '/profileapi/update_profile_image',
            data: args
        }).then(function (response) {  
            loading.deactive();
            console.log(response)    
        })
    }


    $scope.toAddress = function(){
        $location.path("/address/add");
    }
});

