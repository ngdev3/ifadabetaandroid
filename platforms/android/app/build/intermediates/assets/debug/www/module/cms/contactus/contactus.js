app.controller('contactus', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {


    var ID = 1; //global Id for about us

    
    loading.deactive();

    $scope.home = function () {
        //$location.path('/home');
        window.history.back();
    }

    /**
     * Funtion aboutUsInit from aboutus.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:10pm
     * Get the about us by sending the http request
     */
    var GetDataFromApi; //what its use?

    $scope.contactusform = function (form) {


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
            if ($scope[form].query.$error.required !== undefined) {
                error_str += "Message, ";
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

        if ($scope[form].$valid) {
            var reg1 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg2 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
            var reg3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


            if (reg3.test($scope.email) == false) {
                error_str = " Please enter proper Email-ID ";
                // model.show('Alert', error_str);
                alert(error_str);
                return false;
            }

           
        }

        if (error_str == '') {
            var args = $.param({
                first_name: $scope.fname,
                last_name: $scope.lname,
                email: $scope.email,
                query: $scope.query,
                language_code:sessionStorage.lang_code
            });
            loading.active();
            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/contact_us',
                data: args //forms user object

            }).then(function (response) {

                res = response;

                console.log("response from the server ")
                console.log(response.data)
                if (res.data.responseCode == 200) {
                    alert(res.data.responseStatus);
                    $location.path('/dashboard/home');
                } else {
                    alert(res.data.responseMessage.error_msg)
                }

            }).finally(function () {
                loading.deactive();
            })
        }

    }
});