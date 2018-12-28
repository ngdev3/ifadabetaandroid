app.controller('sub_category', function ($scope, $http, $location, $interval, $cookieStore,$window, model, $locale, loading, $rootScope) {

    // console.log($rootScope.searchresult);return;
    if($cookieStore.get('userinfo')){
        var user_type = $cookieStore.get('userinfo').user_type;
        var uid = $cookieStore.get('userinfo').uid;
    }else{
        var user_type = '';
        var uid = '';
    }

    if($cookieStore.get('value_pack')){
        $scope.value_pack = true;
        $cookieStore.remove('value_pack');
    }
    $scope.cat_id = $cookieStore.get('subcategoryInfo').subcatid;

    if ($cookieStore.get('subcategoryInfo').from == 'home') {
        loading.active();
    }

    $scope.cart = function () {
        $location.path('/cart');
    }    
    
    var ID;
    $scope.fetch_product_list = function (id,url, apply = null) {
      // alert(apply)
        var brands =$scope.brand_array;
        console.log(brands);
        var brand_str = '';
        angular.forEach(brands,(value,key)=>{
            console.log(value);
            if(brand_str == ''){
                brand_str   =   value;
            }else{
                brand_str += ','+value;
            }
        });
        console.log(brand_str);
        //var brands_input = JSON.parse(brands);
        // alert(id);
        $("#all").removeClass("input_default_focus");
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

        
        // alert(ID);
        loading.active();


        var args = $.param({
            category_id: ID,
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code,
            user_type : user_type,
            user_id : uid,
            cat_url : suburl,
            sort_by : $scope.sort,
            brand : brand_str,

            //retailer_id : 47
        });
        if(apply == 'apply'){
            var range = $scope.minRangeSlider.minValue + "-" + $scope.minRangeSlider.maxValue
            console.log(range)
            var args = $.param({
                category_id: ID,
                country_id: sessionStorage.country,
                language_code: sessionStorage.lang_code,
                user_type : user_type,
                user_id : uid,
                cat_url : suburl,
                sort_by : $scope.sort,
                brand : brand_str,
                range:range
    
                //retailer_id : 47
            });
        }

        // console.log(args);return;

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/product_list',
            data: args

        }).then(function (response) {

            res = response;
             //console.log(res.data.responseStatus);    
             //return;

            if (res.data.responseStatus == 'success') {
                console.log(res.data.data.category_product.products);
                $scope.categoryData = res.data.data.category_data[0];
                
             if($scope.brand_data == '' || $scope.brand_data == undefined){
                $scope.brand_data = res.data.data.brand_data;
             }
                
                // $scope.product_price = response.data.data.category_product.menu_varient[0].price;
                // $scope.DweightID = response.data.data.category_product.menu_varient[0].id;
                // $scope.rowid = response.data.data.category_product.menu_varient[0].cart_row_id;
                // $scope.menu_id = response.data.data.category_product.id;
                // $scope.addedQnty = response.data.data.category_product.menu_varient[0].cart_quantity;
                // $scope.is_in_stock = response.data.data.category_product.menu_varient[0].is_in_stock;
                // $scope.quantity = response.data.data.category_product.menu_varient[0].quantity;
                // $scope.manufacture_id = response.data.data.category_product.user_id;
                // $scope.is_in_wishlist = response.data.data.category_product.menu_varient[0].is_in_wishlist;
                

                
                // $scope.product_weight_value = response.data.data.category_product.menu_varient[0].unit_value;
                // $scope.product_weight_unit = + response.data.data.category_product.menu_varient[0].UNIT_NAME;
                


                //   alert(id);
                 if (!id) {
                    
                    if(id == 'all'){
                        $scope.categorysubData = "";//res.data.data.category_data[0].sub;
                    }else{
                        $scope.categorysubData = res.data.data.category_data[0].sub;
                    }
                   
                    console.log("-------------------");
                    if ($scope.categorysubData.length == 0) {
                        $scope.categorysubData = "";
                    }
                
                $scope.slickConfig0Loaded = true;
                $scope.slickConfig0 = {
                    method: {},
                    dots: false,
                    infinite: false,
                    speed: 100,
                    autoplay: false,
                   // autoplaySpeed: 2500,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                infinite: true,
                                dots: false,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 3.5,
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 2,
                            }
                        }
                    ]
                };
            }

                /*  for(var i = 0; i< $scope.categorysubData.length; i++){
                   $scope.categorysubSubData = $scope.categorysubData[i];
                 } */
                //   console.log($scope.categorysubData);
                $scope.category_product = res.data.data.category_product;
                $scope.total_rows_remainder = res.data.data.category_product.total_rows % 10;
                $scope.total_rows_page = res.data.data.category_product.total_rows / 10;
                console.log( $scope.total_rows_page);
                if($scope.total_rows_remainder >=1 && $scope.total_rows_remainder <=9 ){
                    $scope.total_rows_page = $scope.total_rows_page + 1;
                    $scope.total_pageno = Math.floor($scope.total_rows_page);
                    
                }
                $scope.product = res.data.data.category_product.products;
                $location.path('/subcategory');
            } else {

                alert(res.data.data.responseStatus);
            }

        }).finally(function () {
            loading.deactive();
        });

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
	if($cookieStore.get("userinfo")){
        var userID = $cookieStore.get("userinfo").uid;
        var user_type = $cookieStore.get("userinfo").user_type;
    }else{
        var userID = '';
        var user_type = '';
    }
    $scope.see_alls = function () {
       // loading.active();
        // alert($cookieStore.get('subcategoryInfo').subcatid);
        var args = $.param({
            product_type: $cookieStore.get('subcategoryInfo').subcatid,
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code,
            user_id : userID,
            user_type : user_type
        });

        if($cookieStore.get('subcategoryInfo').subcatid == 1){
            $scope.feature_name = 'Best_picks_of_the_season';
        }else if($cookieStore.get('subcategoryInfo').subcatid == 2){
            $scope.feature_name = 'product_of_the_day';
        }else{
            $scope.feature_name = 'Featured_Product';
        }

        // console.log(args);return;

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/home_page',
            data: args

        }).then(function (response) {

            res = response;
            // console.log(res.data);
            // return;
            

            if (res.data.data.status == 'success') {
                console.log(res.data.data.view_all)
                $scope.best_picks_of_the_season = res.data.data.view_all;
                $rootScope.is_in_wishlist = res.data.data.view_all[0].menu_varient_data.is_in_wishlist;
                $location.path('/subcategory');
            } else {

                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });

    }
    
    if ($cookieStore.get('subcategoryInfo').from == 'home') {
        $scope.see_alls();

    } else {
        $scope.fetch_product_list();
    }

	
    $scope.product_view = function (id,url) {
        // alert(url);
        // return;
        
        var productinfo = {
            'id' : id,
            'url' : url
        }
        $cookieStore.put('productinfo', productinfo);
        $location.path('/product/view');
    }

	//slider
	$scope.minRangeSlider = {
        minValue: 0,
        maxValue: 1000,
       
    };

    $scope.changeMinSlider = function(){
        console.log($scope.minRangeSlider)
    }

	//slider
    $scope.searchproducts = function(){
        // alert($scope.searchProduct);
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


    $scope.filter = function(form) {
        //console.log($scope.sort);  
        $scope.fetch_product_list('all');
        
    }

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
        console.log($scope.brand_array)
       
     }


    $scope.taptowish = function(id, wishlist_status){
        //  alert(id+ " "+ wishlist_status);
        $rootScope.addToWishlist(id, wishlist_status);
        setTimeout(function(){
            $scope.see_alls();
        }, 1000)
    }


    $scope.taptowishlist = function(id, wishlist_status){
        //  alert(id+ " "+ wishlist_status);return;
        $rootScope.addToWishlist(id, wishlist_status);
        // //  $route.reload();
        setTimeout(function(){
            $scope.fetch_product_list('all');
        }, 1000)
    }
/** 
     * Pagination on Scrolling
     */
    $scope.page = 0;
   $scope.scrollPagination = function(id,url){
        // alert(id+ " "+url);return;
        $("#all").removeClass("input_default_focus");
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

                    if(pageNo > $scope.total_pageno){
                        alert("Don't have further page");
                        return
                    }

                    
                    ++pageNo;

                   
                    loading.active();
                    var args = $.param({  
                        category_id: ID,
                        country_id: sessionStorage.country,
                        language_code: sessionStorage.lang_code,
                        user_type : user_type,
                        user_id : uid,
                        cat_url : suburl,
                        sort_by : '',
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