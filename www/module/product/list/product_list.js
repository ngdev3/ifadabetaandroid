app.controller('productlist', function ($scope, $http, $location,$route, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    
console.log($rootScope.searchresult)
    
$scope.product_view = function (id,url) {
    // alert(id);return;
    var productinfo = {
        'id' : id,
        'url' : url
    }
    $cookieStore.put('productinfo', productinfo);
    $location.path('/product/view');
}

$scope.searchproducts = function(){
    $rootScope.searchProduct = $scope.searchProduct;
    $rootScope.searchBar();
}

$scope.filter = function(form) {
    //console.log($scope.sort); 
    $rootScope.sort = $scope.sort;
    $rootScope.searchBar();
    
}
});