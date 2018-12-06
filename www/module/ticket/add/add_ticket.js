app.controller('add_ticket', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    $scope.cart = function(){
        $location.path('/cart');
    }

    $scope.addticket = function (form) {

        if ($scope[form].$error) {
            //  alert("Error");
            var error_str = '';
            if ($scope[form].getorder.$error.required !== undefined ) {
                error_str += "Order Id, ";
            }
            if ($scope[form].getcomplainttype.$error.required !== undefined) {
                error_str += "Complaint Type";
            }
            if ($scope[form].des.$error.required !== undefined) {
                error_str += "Description";
            }

            if (error_str !== '') {
                error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
               alert(error_str);
                // model.show('Alert', error_str);
            }
        };
        if ($scope[form].$valid) {
            loading.active();

            var args = $.param({
                user_id: $cookieStore.get("userinfo").uid,
                country_id: sessionStorage.country,
                language_code: sessionStorage.lang_code,
                complaint_id: $scope.getcomplainttype,
                description: $scope.des,
                order_id: $scope.getorder,
            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/raise_ticket',
                data: args //forms user object

            }).then(function (response) {
                console.log("---------------");
                console.log(response);
            }).finally(function () {
                loading.deactive();
            });

        }

    }


    $scope.view_ticket = function(id){
        
        var ticketid = {
            'view_id': id,           
        }
        $cookieStore.put('ticketid', ticketid);

        $location.path('/view_ticket');
    }
});