app.controller('home', function ($scope, $http, $location, $cookieStore, $timeout, loading, model, $rootScope, $route) {
    
    if (!$cookieStore.get('userinfo')) {
        $scope.loggedin = false;
       
    }

    if ($cookieStore.get('userinfo')) {
        $scope.loggedin = true;
        
    }
    
    $scope.product_view = function(id){
        $cookieStore.put('id',id);
        $location.path('/product/view');
    }
    // if (!$cookieStore.get('storeinfo')) {
    //     $location.path('/store');
    //     return false;
    // }

    $scope.login = function(){
        $location.path('/login');
    }

    $scope.season_fetch =   function(){
        loading.active();

        var args = $.param({
            country_id: sessionStorage.country,
        });
        
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

           console.log(res);

           if(res.data.data.status == 'success'){
                $scope.best_picks_of_the_season = res.data.data.best_picks_of_the_season;
                $scope.offer = res.data.data.offer;
                $scope.product_of_the_day = res.data.data.product_of_the_day;
                $scope.best_picks_of_the_featured_products = res.data.data.best_picks_of_the_featured_products;
                $scope.dairy_product = res.data.data.dairy_product;
                $scope.slider = res.data.data.banner;
                $scope.country_name = res.data.data.country_name.name;
                $scope.slickConfig0Loaded = true;
                $scope.slickConfig0 = {
                  method: {},
                  dots: false,
                  infinite: false,
                  speed: 100,
                   autoplay:true,
                   autoplaySpeed:2500,
                   arrows:false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 1,
                        infinite: true,
                        dots: false,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                      }
                    },
                    {
                      breakpoint: 360,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                  ]
                };
                console.log($scope.slider);
                $scope.sliderCount =  $scope.slider.length;
           }else{

           }

        }).finally(function () {
            loading.deactive();
        });

    }

    var i = 1;
    var j = 3;
    var first_length = 3;
    var second_length = 5;
    setInterval(function(){ 
        

        if(first_length > i){

            $('#custom_slider').attr('src',$scope.offer[i].ad_big_image)
            i++;
        }else{
            i = 0;
        }

        if(second_length > j){

            $('#custom_second_slider').attr('src',$scope.offer[j].ad_big_image)
            j++;
        }else{
            j = 3;
        }

    },3000);



    // return false;
    $scope.toLocationFetch = function () {
        $location.path('/store');
    }

    $scope.category = function () {
        $location.path('dashboard/category')
    }
    $scope.useroffers = function () {
        $location.path('offers')
    }

    $scope.home = function () {
        //$location.path('dashboard/home')
        $route.reload()
    }
    $scope.notification = function () {

        $location.path('notification')

    }

    $scope.see_all = function(subcatid){
        var subcategoryInfo = {
            'subcatid': subcatid,
            'from':'home'
        }
        $cookieStore.put('subcategoryInfo', subcategoryInfo);

        $location.path('/subcategory');
    }

    $scope.signout = function () {
        $rootScope.DeleteData();
        $cookieStore.remove("userinfo");
        $cookieStore.remove("storeinfo");
        $location.path('/login');
    }

    $scope.subcategory = function (id) {
        $cookieStore.put('id', id);
        $location.path('subcategory')

    }

/* Function For Hot Deals */

    $scope.hot_deals = function(){
        $cookieStore.put('id', 7);
        $location.path('subcategory')
    }

    $scope.product_list = function (productListID, categoryName) {

        var categoryInfo = {
            'categoryName': categoryName,
            'productListID': productListID
        }
        $cookieStore.put('categoryInfo', categoryInfo);

        $location.path('/product/list');
    }



    /**
     * Funtion: slider from home.html on ng-init
     * Name: Sajal Goyal
     * Created-on: 12/10/2018 at 06:45pm
     * slider by sending the http request
     */

    $scope.sliders = function () {
// alert()/
        loading.active();

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + '/bannerapi'
            //data: args 

        }).then(function (response) {

            res = response;

            if (res.data.response == 'success') {
                //console.log(res.data.data)
                $scope.slider = res.data.data;
                $scope.sliderCount = res.data.count;
                //console.log($scope.slider)
                $location.path('/dashboard/home');
            } else {

                alert(res.data.status);
            }

        }).finally(function () {
            loading.deactive();
        });



    }

    /* $scope.initAutocomplete =  function(){
            console.log("hellooo");
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -33.8688, lng: 151.2195},
              zoom: 13,
              mapTypeId: 'roadmap'
            });
    
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            console.log(searchBox);
    
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
    
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              console.log("in the listener");
              var places = searchBox.getPlaces();
              alert(places);
              if (places.length == 0) {
                return;
              }
    
              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];
    
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
    
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
    
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
          }
 */

        
        
$scope.searchBar = function () {
   
$rootScope.searchresult = '';

loading.active();

var args = $.param({
    'country_id': sessionStorage.country,
    'language_code': sessionStorage.lang_code,
    'search_product': $scope.searchProduct
})
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
    
    if (res.data.data.category_product.total_rows > 0) {
        $rootScope.searchresult = res.data.data.category_product.products;
        $rootScope.search_product = res.data.data.category_product;
        $cookieStore.put('search','search');
        $location.path("/subcategory");
    } else {
        // alert()
        // $scope.resultstatus = false;
        $rootScope.searchresult = '';
        $location.path("/subcategory");
        // $scope.datanotfound = true;
    }

}).finally(function () {
    loading.deactive();
});
}



   /*  $scope.product_view = function (pid) {
        $cookieStore.put('productviewID', pid);
        $location.path('/product/view')
    } */


    $scope.language = function(){
        $location.path('/language');
    }
    $scope.myorder = function(){
        $location.path('/order/myorder');
    }
    $scope.category = function(){
        $location.path('/category');
    }
    $scope.profile = function(){
        $location.path('/myaccount/profile');
    }
    $scope.cart = function(){
        $location.path('/cart');
    }
    $scope.wishlist = function(){
        $location.path('/wishlist');
    }
    $scope.valuedpack = function(){
        $location.path('/value_packs');
    }
    $scope.manage_ticket = function(){
        $location.path('/list_ticket');
    }
    $scope.switch_country = function(){
        $location.path('/switch_country');
    }
    $scope.language = function(){
        $location.path('/language');
    }
    $scope.change_password = function(){
        $location.path('/changepassword');
    }
    $scope.contact_us = function(){
        $location.path('/contactus');
    }
    $scope.my_address = function(){
        $location.path('/address');
    }
    $scope.logout = function(){
        $cookieStore.remove('userinfo');
        $cookieStore.remove('FullName');
        $location.path('/login');
    }

   /*  if($cookieStore.get("userinfo")){
        $scope.fullName = $cookieStore.get("userinfo").fullName;
        $scope.profileImage = $cookieStore.get("userinfo").profile_image;
        
    } */

    if($cookieStore.get("FullName")){
        $scope.fullName = $cookieStore.get("FullName").fullName;  
    }else{  
        if($cookieStore.get("userinfo")){
            $scope.fullName = $cookieStore.get("userinfo").fullName; 
            if($cookieStore.get("userinfo").profile_image == ''){
                $scope.profileImage = '';
            }
            $scope.profileImage = 'http://projects.tekshapers.in/ifadabeta/uploads/user_image/'+$cookieStore.get("userinfo").profile_image; 
        }      
    }

    if($cookieStore.get("userinfo")){
        $scope.address = $cookieStore.get("userinfo").address;
    }

    $scope.toswitchCountry = function(){
        $location.path("/switch_country");
    }

    $scope.addToWishlist = function(id){
        // alert(id);
        if(!$cookieStore.get("userinfo")){
            alert("Please Login First");
            return false;
        }else{
            var userID = $cookieStore.get("userinfo").uid;
        }
        loading.active();
        var args = $.param({
            'country_id': sessionStorage.country,
            'menu_varient_id' : id,
            'user_id' : userID
        });

        // alert(args);return;
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/add_wishlist',
            data: args

        }).then(function (response) {

            res = response;
            // console.log("wwwwwwwwwwwwwwwwwww");
            // console.log(res.data.data);
            // return;
            if (res.data.data.add_wishlist == 'success') {
                model.show("Alert","Added To Wishlist Successfully");
            } else {
                model.show("Alert","Something went wrong");
            }
        }).finally(function () {
            loading.deactive();
        });
    }

    $scope.taptowish = function(id, wishlist_status){
        // alert(id+ " "+wishlist_status);return;
        $rootScope.addToWishlist(id, wishlist_status);
       /*  setTimeout(function(){
           $scope.season_fetch();
        }, 1000) */
  }

});


