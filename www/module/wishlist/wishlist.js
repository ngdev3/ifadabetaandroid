app.controller('wishlist', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
 
    $scope.whiteListData = function () {

        loading.active();

        var args = $.param({
            user_id:'52',
            country_id: '2',//$scope.search,
            language_code: 'en'//$cookieStore.get('userinfo').uid,
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/wishlist',
            data: args

        }).then(function (response) {

            res = response;

          console.log(res.data.data);
          if(res.data.data.status == 'success'){
            $scope.whitelist_data = res.data.data.wishlist; 
          }

        }).finally(function () {
            loading.deactive();
        });

        

    }
});