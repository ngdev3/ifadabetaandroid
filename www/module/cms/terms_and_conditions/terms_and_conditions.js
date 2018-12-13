app.controller('terms', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
    

    /**
     * Funtion aboutUsInit from terms&condition.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:10pm
     * Get the terms&condition by sending the http request
     */
    var GetDataFromApi; //what its use?

     $scope.termsInit =   function(){

        loading.active();
        var args = $.param({
            'page_url' : 'terms_n_conditions'
        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_cms',
            data: args 

        }).then(function (response) {
            
            res = response;
            
            if (res.data.data.status == 'success') {
                
                //console.log(res.data.data);return;
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
               
                $scope.termsconditions   = res.data.data.about_us;
                $scope.termsconditions.description = $($scope.termsconditions.content).text();
                 $location.path('/terms');
            } else {
                
                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                alert(res.data.status);
            }  

        }).finally(function () {    
            loading.deactive();
        }); 

     }
});