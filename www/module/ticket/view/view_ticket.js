app.controller('view_ticket', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {


    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }



    if (!$cookieStore.get('ticketid')) {
        $location.path('/list_ticket');
        return false;
    }

    $scope.ticket_logs = function () {
        loading.active();
        var args = $.param({
            user_id:$cookieStore.get("userinfo").uid,
            ticket_id: $cookieStore.get("ticketid").view_id,
            // language_code: sessionStorage.lang_code
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/ticket_log',
            data: args

        }).then(function (response) {

            res = response;

            //console.log(res.data);
            if (res.data.responseCode != 200) {
                $scope.ticket_logs_details = '';//res.data.data.view_ticket;
            }else{
                
                $scope.ticket_logs_details = res.data.data.result;
            }

        }).finally(function () {
            loading.deactive();
        });



    }
    $scope.ticketviewData = function () {

        loading.active();

        var args = $.param({
            // user_id:$cookieStore.get("userinfo").uid,
            ticket_id: $cookieStore.get("ticketid").view_id,
            // language_code: sessionStorage.lang_code
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/view_ticket',
            data: args

        }).then(function (response) {

            res = response;

          //  console.log(res);
            if (res.data.data.status == 'success') {
                $scope.view_ticket = res.data.data.view_ticket;
            }

        }).finally(function () {
            loading.deactive();
        });



    }



    $scope.replyaatticket = function (form) {
        
       // console.log($scope.customer_rep)
        // return

        if($scope.customer_rep == '' || $scope.customer_rep == undefined){
            alert('Enter Some reply')
            return;
        }

        // return;
        loading.active();
        var args = $.param({
            user_id:$cookieStore.get("userinfo").uid,
            ticket_id: $cookieStore.get("ticketid").view_id,
            content: $scope.customer_rep
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/reply_ticket',
            data: args

        }).then(function (response) {

            res = response;

            console.log(res.data);
            if (res.data.responseCode != 200) {
                $scope.ticket_logs_details = '';//res.data.data.view_ticket;
            }else{
                $scope.customer_rep = '';
                $scope.ticket_logs();
            }

        }).finally(function () {
            loading.deactive();
        });



    }

});