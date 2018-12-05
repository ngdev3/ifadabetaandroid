app.controller('wishlist', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope, $route) {
 
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    $scope.whiteListData = function () {

        loading.active();

        var args = $.param({
            user_id:$cookieStore.get("userinfo").uid,
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code
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
              console.log(res.data.data.wishlist);
            $scope.whitelist_data = res.data.data.wishlist; 
          }

        }).finally(function () {
            loading.deactive();
        });
    }

    $scope.removeWishlistItem = function(id){
        // alert(id);return;
        loading.active();

        var args = $.param({
            'wishlist_id' : id,
            'user_id' : $cookieStore.get("userinfo").uid
        })
        // alert(args);return;
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/delete_wishlist',
            data: args

        }).then(function (response) {

            res = response;

          console.log(res.data.data);
          if(res.data.data.delete_wishlist.status == 'success'){
            alert("Wishlist Item Deleted Successfully");
            $route.reload();
          }

        }).finally(function () {
            loading.deactive();
        });
    }
});