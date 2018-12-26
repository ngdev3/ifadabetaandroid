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
    var range = $scope.minRangeSlider.minValue + "-" + $scope.minRangeSlider.maxValue
    console.log(range)
    $rootScope.range = range;
    $rootScope.sort = $scope.sort;
    $rootScope.searchBar();
    
}

 //slider
 $scope.minRangeSlider = {
    minValue: $rootScope.search_product,
    maxValue: 1000,

    };

    $scope.changeMinSlider = function(){
    console.log($scope.minRangeSlider)
    }

    //slider

$scope.brand_array = [];
//$scope.brand_ids = [];
 $scope.Filtering = function(id){
    
   /*  getBrandDataFromFilter  = {
        'brand_id':id
    }
      */
    if($('#brand_'+id).prop("checked") == true){
        console.log($scope.brands);
        brand_array = $scope.brand_array.push(id); 
       console.log(brand_array) 
    }
    else if($('#brand_'+id).prop("checked") == false){
        //let index = $scope.brand_array.findIndex( getBrandDataFromFilter => getBrandDataFromFilter.id === id );
        //console.log(index)
        var index = $scope.brand_array.indexOf(id);
        $scope.brand_array.splice(index, 1);
    }
    $cookieStore.put('brand_array',$scope.brand_array);
   
 }


$scope.taptowishlist = function(id, wishlist_status){
    //  alert(id+ " "+ wishlist_status);return;
    $rootScope.addToWishlist(id, wishlist_status);
    /* setTimeout(function(){
        $scope.searchproducts();
    }, 1000) */
}

/** 
     * Pagination on Scrolling
     */
    $scope.page = 0;
   $scope.scrollPagination = function(id,url){
        // alert(id+ " "+url);return;
        var suburl;
        if(url){
            suburl = url ;
        }else{
            suburl = $cookieStore.get('subcategoryInfo').url
        }
        if (id) {

            if (id !== 'all') {
                ID = id;
            }else{
                ID = $cookieStore.get('subcategoryInfo').subcatid;
            }


        } else {
            ID = $cookieStore.get('subcategoryInfo').subcatid;
        }
        // alert(id+ " "+url);return;       
        // alert();return  
        $(window).scroll(function () {
            var window_top = $(window).scrollTop();
            var div_top = $('#main-div2').offset().top;
            var div_height = $('#main-div2').outerHeight();
            console.log("outside");
            var sum = div_top + div_height + 3 - window.innerHeight;
            console.log(window_top + " " + sum + " outside");  
            // console.log($scope.product.length);return;
            if (window_top == sum) {
                console.log("inside");
                // alert("Reached the bottom");return;
                if($scope.product.length < 10){
                    alert("Don't have further page");
                }else{
                    var pageNo = $scope.page;
                 //   alert(pageNo);

                    if(pageNo >= 1){
                        alert("Don't have further page");
                        return
                    }

                    
                    ++pageNo;

                   
                    loading.active();
                    var args = $.param({  
                        country_id: sessionStorage.country,
                        language_code: sessionStorage.lang_code,
                        search_product: $rootScope.searchProduct,
                        sort_by: $rootScope.sort,
                        user_id: userID,
                        user_type: user_type,
                        brand: brand_str,
                        page : pageNo                   
                    });
                    // alert(args);
                    $http({
                        method: 'POST',
                        url: app_url + '/product_list',
                        data: args, //forms user object
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                            loading.deactive();
                            //console.log(response.data);return;
                            if (response.data.responseStatus == 'success'){                                
                                $scope.page = pageNo;
                                angular.forEach(response.data.data.category_product.products, function (value, key) {
                                    $scope.product.push(value);                                   
                                });
                            } else {
                                alert("Something went wrong");
                            }
                        });
                        // paused = true;
                    }
                }else{

                }
                    
                 /* }else{
                    if( paused ){
                       paused = false;
                   }  */
                });
            }
        
 
        /**
         * End of Function
         */

       
});


