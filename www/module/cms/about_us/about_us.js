app.controller('aboutus', function ($scope, $http, $location, $cookieStore, model, loading, $rootScope) {
    
    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    } 
    
   

    $scope.home = function() {
        //$location.path('/home');
        window.history.back();
    }

    /**
     * Funtion aboutUsInit from aboutus.html on nginit
     * Name: Sajal Goyal
     * Created-on: 05/10/2018 at 12:10pm
     * Get the about us by sending the http request
     */
    var GetDataFromApi; //what its use?

     $scope.aboutUsInit =   function(){

        loading.active();
        var args = $.param({
            'page_url' : 'aboutus'
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
                console.log(res.data.data.about_us);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);
               
                $scope.about   = res.data.data.about_us;
                $scope.about.description = $($scope.about.content).text();
                 $location.path('/aboutus');
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