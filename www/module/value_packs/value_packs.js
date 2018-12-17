app.controller('value_packs', function ($translate, $scope, $http, $location, $interval, $cookieStore, loading, $rootScope, $cordovaFile) {

    //alert();
/**
     * Funtion: val_packs from value_packs.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 26/11/2018 at 06:45pm
     * sending the http request
     */
$scope.val_packs = function(){
    
    loading.active();

        var args = $.param({
            country_id : sessionStorage.country,
            language_code : sessionStorage.lang_code,
        });
        
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/get_value_pack',
            data: args 

        }).then(function (response) {

            res = response;
           
           
           if(res.data.data.status == 'success'){
               console.log(res.data.data.value_pack)
               $scope.valpacks =  res.data.data.value_pack;
               
            return;
               $location.path('/dashboard/home');
           }else{

           }

        }).finally(function () {
            loading.deactive();
        });
}

$scope.searchproducts = function(){

    if($scope.searchProduct == undefined || $scope.searchProduct == ""){
        model.show("Alert","Please Provide the Search Value");
        return false;
    }
    
    var search_key = {
        'search' : $scope.searchProduct
    }
    $cookieStore.put('search',search_key);
    $rootScope.searchProduct = $scope.searchProduct;
    $rootScope.searchBar();
}

$scope.product_list = function(id,url){
var packs = {
    'subcatid': id,
    'url' : url
}
   $cookieStore.put('value_pack','value_pack');
   $cookieStore.put('subcategoryInfo',packs);
   $location.path('/subcategory');
}

});