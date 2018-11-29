app.controller('view_ticket', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
  
    $scope.ticketviewData = function () {

        loading.active();

        var args = $.param({
            // user_id:$cookieStore.get("userinfo").uid,
            ticket_id:24//$cookieStore.get("ticketid").view_id,
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

          console.log(res);
          if(res.data.data.status == 'success'){
            $scope.view_ticket = res.data.data.view_ticket; 
          }

        }).finally(function () {
            loading.deactive();
        });

        

    }

});