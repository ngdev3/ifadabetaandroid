app.controller('view_ticket', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
  
    $scope.ticketviewData = function () {

        loading.active();

        var args = $.param({
            user_id:52,//$cookieStore.get("userinfo").uid,
            language_code: sessionStorage.lang_code
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/ticket_list',
            data: args

        }).then(function (response) {

            res = response;

          console.log(res.data.data);
          if(res.data.data.status == 'success'){
            $scope.order_list = res.data.data.order_list; 
          }

        }).finally(function () {
            loading.deactive();
        });

        

    }

});