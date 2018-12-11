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

$scope.init =function(id){
    var max_heightss = $(".accordion-panel_"+id).css("maxHeight");
 var iScrollHeight = $(".accordion-panel_"+id).prop("scrollHeight");
 if(max_heightss!="0px"){
     $("#accord_"+id).removeClass("selected");
      $(".accordion-panel_"+id).css('max-height', '0');
 }else{
     $("#accord_"+id).addClass("selected");
       $(".accordion-panel_"+id).css('max-height', iScrollHeight+'px');
 }
}
 
$scope.filter = function(form) {
    //console.log($scope.sort); 
    $rootScope.searchProduct = $cookieStore.get('search').search;
    $rootScope.sort = $scope.sort;
    $rootScope.searchBar();
    
}


$scope.taptowishlist = function(id, wishlist_status){
    //  alert(id+ " "+ wishlist_status);return;
    $rootScope.addToWishlist(id, wishlist_status);
    /* setTimeout(function(){
        $scope.searchproducts();
    }, 1000) */
}


});


