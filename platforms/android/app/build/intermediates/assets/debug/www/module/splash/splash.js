app.controller('splash', function ($scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {


    $scope.redirect = function () {
        $location.path('/language');
    }

    setTimeout(function () {
        $scope.redirect();
    }, 100)

    //alert(sessionStorage.lang );
    $translateProvider.preferredLanguage(sessionStorage.lang);

});