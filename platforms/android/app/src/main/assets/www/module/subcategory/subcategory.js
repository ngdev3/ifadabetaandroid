app.controller('sub_category', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    if (!$cookieStore.get('userinfo')) {
        $location.path('/login');
        return false;
    }

    $scope.my_account = function(){
        $location.path('/myaccount/account');
    }

    $scope.opencart = function(){
        $location.path('/cart');
    }
    /**
     * Funtion: subcatagory from subcatagory.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 17/10/2018 at 12:45pm
     * Get the sub catagory by sending the http request
     */

$scope.subcategories = function(){
//    alert()

        loading.active();
    
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/subcategoryapi?catid='+$cookieStore.get('id')
            //data: args 

        }).then(function (response) {

            res = response;

            if (res.data.status == 'success') {
                
                console.log(res);
                //put cookie and redirect it    
                //model.show('Alert', res.data.responseMessage);

                $location.path('/subcategory');

                if (res.data.data.length > 0) {
                   
                    $scope.subcategory = res.data.data;
                    //console.log($scope.subcategory);
                }
                else {
                    alert('No Sub Categories');
                }
            } else {

                //Throw error if not logged in
                //model.show('Alert', res.data.responseMessage);
                 alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });


    }

/**
     * Funtion: searchbar on ng-keyup from subcategory.html
     * Name: Sajal Goyal
     * Created-on: 23/10/2018 at 04:00pm 
     * Get product on searching
     */
    $scope.searchbar = function(){
        $scope.datanotfound = false; 
        $scope.resultstatus = false;
        $scope.searchresult =''; 

        if(($scope.search.length >= 1) && ($scope.search.length < 3))
        {   
                $scope.resultstatus = true;
                return false;
        }else if($scope.search.length == 0){
        
        $scope.resultstatus = false;
            return false;
        } 

        // console.log($scope.search.length)
            loading.active();
    
            var args = $.param({
                'search_key' : $scope.search,
                'uid' : $cookieStore.get('userinfo').uid,
                'mid' : uuid
            })
            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/search/searchapi_result/?search_key='+$scope.search,
                data: args 
    
            }).then(function (response) {
    
                res = response;
    
                if (res.data.count > 0) {
                    //console.log(res.data.data)
                    $scope.searchresult = res.data.data;
                    $scope.enableDiv = true;
                } else {
                    $scope.resultstatus = false;
                    $scope.searchresult ='';
                    $scope.datanotfound = true;
                }   
    
            }).finally(function () {
                loading.deactive();
            });
    
    
       
    }

$scope.product_list = function (productListID, categoryName) {

    var categoryInfo = {
        'categoryName': categoryName,
        'productListID': productListID
    }
    $cookieStore.put('categoryInfo', categoryInfo);
    $location.path('/product/list');
}

$scope.product_view = function(pid){
    $cookieStore.put('productviewID', pid);
    $location.path('/product/view')
  } 

});