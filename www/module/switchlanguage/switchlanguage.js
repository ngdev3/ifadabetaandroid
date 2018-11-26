app.controller('switchlanguage', function ($scope, $translate, $http, $location, $cookieStore, model, loading, $rootScope) {



    $scope.radio = sessionStorage.lang;

    $scope.submitlang = function (form) {
        //alert($scope.radio);
        sessionStorage.lang = $scope.radio;
        // $scope.$apply(function(){

        // });
        
        $translate.use(sessionStorage.lang);
        $location.path('dashboard/home')


    }


});