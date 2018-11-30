app.controller('switchlanguage', function ($scope, $translate, $http, $location, $cookieStore, model, loading, $rootScope) {

    if(sessionStorage.lang_code != ''){
        
        $scope.radio = sessionStorage.lang_code;
    }

    $scope.submitlang = function (form) {
        //alert($scope.radio);
        sessionStorage.lang_code = $scope.radio;
        // $scope.$apply(function(){

        // });
        
        $translate.use(sessionStorage.lang_code);
        $location.path('dashboard/home')


    }


});