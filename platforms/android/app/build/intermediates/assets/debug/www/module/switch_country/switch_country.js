app.controller('SwitchCntry', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {

    
    /**
     * Funtion: switch_country from switch_country.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 26/11/2018 at 04:45pm
     * sending the http request
     */
    $scope.switch_country = function () {
        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/switch_country',
            //data: args 

        }).then(function (response) {

            res = response;

            console.log(res.data.data.order_list)
            if (res.data.data.status == 'success') {
                $scope.countries = res.data.data.order_list;
            } else {
                alert('No Countries Found');
            }

            if (sessionStorage.country !== '') {
                console.log(sessionStorage.country)
                
                $scope.form.country = sessionStorage.country;
            }
            
        }).finally(function () {

            loading.deactive();
        });


    }

    /**
     * Function Created For Switch Country
     * Created By Sajal Goyal
     * Date : 27/11/18
     */

    $scope.form = {}
    $scope.country = function (form) {
        var res = '';
        if ($scope[form].$error) {
            // alert();return false;
            var error_str = '';

            if ($scope[form].country.$error.required !== undefined) {
                error_str += "Country Name, ";
            }
            if (error_str !== '') {
                //error_str = " <span style='font-weight:700;'>Following fields must have valid information:</span></br>" + error_str;
                // model.show('Alert', error_str);
                alert('Country name is Required');
                return false;
            }
        }
        console.log($scope.form.country);
        sessionStorage.country = $scope.form.country;
        $location.path('/dashboard/home')
    }


});