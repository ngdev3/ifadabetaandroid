app.controller('sub_category', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    // console.log($rootScope.searchresult);return;
if($cookieStore.get('userinfo')){
    var user_type = $cookieStore.get('userinfo').user_type;
    var uid = $cookieStore.get('userinfo').uid;
}else{
    var user_type = '';
    var uid = '';
}

    $scope.cart = function () {
        $location.path('/cart');
    }

    var ID;
    $scope.fetch_product_list = function (id,url) {
        // alert(id);
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
            language_code: 'en',
            user_type : user_type,
            user_id : uid,
            cat_url : suburl,
            sort_by : $scope.sort,
            //retailer_id : 47
        });

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
                    autoplay: true,
                    autoplaySpeed: 2500,
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
    }else{
        var userID = '';
    }
    $scope.see_alls = function () {
       // loading.active();
        // alert($cookieStore.get('subcategoryInfo').subcatid);
        var args = $.param({
            product_type: $cookieStore.get('subcategoryInfo').subcatid,
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code,
            user_id : userID
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
        // alert(id);return;
        var productinfo = {
            'id' : id,
            'url' : url
        }
        $cookieStore.put('productinfo', productinfo);
        $location.path('/product/view');
    }

 $scope.filter = function(form) {
     //console.log($scope.sort);  
     $scope.fetch_product_list();
     
 }

 $scope.taptowish = function(id, wishlist_status){
    //  alert(id+ " "+ wishlist_status);
     $rootScope.addToWishlist(id, wishlist_status);
     setTimeout(function(){
        $scope.see_alls();
     }, 1000)
 }


 //$rootScope.is_in_wishlist == 1;

//  $scope.addToWishlist = function(id){     
//     // alert(id);return;
//         if(!$cookieStore.get("userinfo")){
//             alert("Please Login First");
//             return false;
//         }else{
//             var userID = $cookieStore.get("userinfo").uid;
//         }
        
//         loading.active();
//         if($rootScope.is_in_wishlist == 1){
//             var args = $.param({
//                 'country_id': sessionStorage.country,
//                 'menu_varient_id' : id,
//                 'user_id' : userID,
//                 'is_for' : 'delete'
//             });
//         }else{
//             var args = $.param({
//                 'country_id': sessionStorage.country,
//                 'menu_varient_id' : id,
//                 'user_id' : userID,
//                 'is_for' : 'add'
//             });
//         }
        

//         // alert(args);return;
//         $http({
//             headers: {
//                 //'token': '40d3dfd36e217abcade403b73789d732',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             method: 'POST',
//             url: app_url + '/add_wishlist',
//             data: args

//         }).then(function (response) {

//             res = response;
//             console.log("wwwwwwwwwwwwwwwwwww");
//             console.log(res.data.data);
//             // return;
//             if($rootScope.is_in_wishlist == 1){
//                 if (res.data.data.status == 'success') {  
//                     // $("#unclicked"+id).removeClass("fa-heart-o").addClass("fa-heart fill");         
//                     model.show("Alert","Removed From Wishlist Successfully");
//                     $rootScope.is_in_wishlist = 0;
//                 } else {
//                     model.show("Alert","Something went wrong");
//                 }
//             }else{
//                 if (res.data.data.status == 'success') {  
//                     // $("#unclicked"+id).removeClass("fa-heart-o").addClass("fa-heart fill");         
//                     model.show("Alert","Added To Wishlist Successfully");
//                     $rootScope.is_in_wishlist = 1;
//                 } else {
//                     model.show("Alert","Something went wrong");
//                 }
//             }
            
//         }).finally(function () {
//             loading.deactive();
//         });
//     }
    
});