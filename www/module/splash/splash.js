app.controller('splash', function ($translate, $scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {


    $scope.redirect = function () {
        // $location.path('/dashboard/home');
    }

    setTimeout(function () {
        $scope.redirect();
    }, 100)

    $scope.season_fetch =   function(){
        loading.active();

        var args = $.param({
           
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/default_lang_country',
            data: args 

        }).then(function (response) {

            res = response;

           console.log(res.data.data.default_language_country);

           if(res.data.data.status == 'success'){
            sessionStorage.country = res.data.data.default_language_country.default_country_id;
            sessionStorage.country_name = res.data.data.default_language_country.COUNTRY_NAME;
                sessionStorage.lang = res.data.data.default_language_country.default_language;
                sessionStorage.lang_code = res.data.data.default_language_country.language_code;
               console.log("-----aaa-------"); 
               console.log(sessionStorage) 
               $translate.use(sessionStorage.lang_code);
               $location.path('/dashboard/home');
           }else{

           }

        }).finally(function () {
            loading.deactive();
        });

    }

   

});