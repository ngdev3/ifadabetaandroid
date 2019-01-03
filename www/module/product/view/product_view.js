app.controller('view_product', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {

  if(!$cookieStore.get('userinfo')){

    var uid = '';
    var user_type = '';
  }else{
    var uid = $cookieStore.get('userinfo').uid;
    var user_type = $cookieStore.get('userinfo').user_type;
  }
    $scope.cart = function(){
        $location.path('/cart');
    }
    
    $scope.profile_image_path = profile_image_path;
    $scope.productpid = $cookieStore.get('productinfo').id
    // console.log($cookieStore.get("userinfo"));

    $scope.getvalueforOtherVarient = function (menu_id, id) {
      

      $( ".total" ).each(function( index ) {
       $('#enablequant_'+$( this ).attr('data-weight_id')).removeClass('marked')
      });
      $("#enablequant_" + id + menu_id ).addClass('marked')

      // return
      weightID = $("#enablequant_" + id + menu_id ).attr('data-weight_id');
      price = $("#enablequant_" + id + menu_id ).attr('data-price');
      unit = $("#enablequant_" + id + menu_id ).attr('data-unit');
      menu_id = $("#enablequant_" + id + menu_id ).attr('data-menu_id');
     
      $rootScope.varientCheck(weightID, menu_id, price, unit, $scope.manufacture_id, id);

      $('#sub_rrp').html('AED '+price)
      $('#total_quantity').html(unit);
        
      $('#addCart_'+menu_id)
      .attr('data-menuid', menu_id)
      .attr('data-user_id', $scope.manufacture_id)
      .attr('data-weightid', id)
      ;


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

    $scope.group_not_assigned = function(){
        alert('This product is not associated with any product group for you.');
        return false;
    }

$scope.product_details = '';
$scope.fetch_product_data = function () {
        /* if(!$cookieStore.get("userinfo")){
            alert("Some problem occurs in API");
            // $location.path("/dashboard/home");
            return false;
        } */
        loading.active();

        $scope.pid = $cookieStore.get('id')
        var args = $.param({
            'product_id': $cookieStore.get('productinfo').id,
            'manufacture_id':  $cookieStore.put('manu_id'),
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code ,   
            user_id: uid,
            user_type: user_type,

        });

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/product_details',
            data: args

        }).then(function (response) {
            //alert();
          // console.log(response);return;
          console.log(response.data)
            if (response.data.data.status == 'success') {

                $scope.product_details = response.data.data.product_details;
                $scope.product_details_description = $(response.data.data.product_details.description).text();
                $scope.rating_details = response.data.data.rating_details;
                $scope.rating_details_length = response.data.data.rating_details.length;
                $scope.rating_average = response.data.data.rating_average;
                $scope.product_details_varients = response.data.data.product_details.menu_varient;
                $scope.product_price = response.data.data.product_details.menu_varient[0].price;
                $scope.DweightID = response.data.data.product_details.menu_varient[0].id;
                $scope.rowid = response.data.data.product_details.menu_varient[0].cart_row_id;
                $scope.menu_id = response.data.data.product_details.id;
                $scope.addedQnty = response.data.data.product_details.menu_varient[0].cart_quantity;
                $scope.is_in_stock = response.data.data.product_details.menu_varient[0].is_in_stock;
                $scope.ALLOW_TO_ADD_IN_CART = response.data.data.product_details.menu_varient[0].ALLOW_TO_ADD_IN_CART;
                $scope.quantity = response.data.data.product_details.menu_varient[0].quantity;
                $scope.manufacture_id = response.data.data.product_details.user_id;
                $scope.is_in_wishlist = response.data.data.product_details.menu_varient[0].is_in_wishlist;
                

                
                $scope.product_weight_value = response.data.data.product_details.menu_varient[0].unit_value;
                $scope.product_weight_unit = + response.data.data.product_details.menu_varient[0].UNIT_NAME;
                
                console.log($scope.product_price)
                $scope.product_images = response.data.data.product_details.gallery_image;
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
                
            } else {
                alert("Sorry..No Data Found!");
                $scope.product_details = '';
            }
            
        }).finally(function () {
            loading.deactive();
        });
    }

    /**
     * End of Function
     */

     $scope.addToCarts = function(){
       console.log($scope.z);
     }

     $scope.taptowish = function(id, wishlist_status, pid, event){
    console.log(event.target.dataset)
    // return;

    wishlist_status = event.target.dataset.status;
    id = event.target.dataset.varient_id;

    if (!$cookieStore.get("userinfo")) {
      alert("Please Login First");
      return false;
  } else {
      var userID = $cookieStore.get("userinfo").uid;
  }



      if (wishlist_status == 1) {
        var args = $.param({
            'country_id': sessionStorage.country,
            'menu_varient_id': id,
            'user_id': userID,
            'is_for': 'delete'
        });
    } else {
        var args = $.param({
            'country_id': sessionStorage.country,
            'menu_varient_id': id,
            'user_id': userID,
            'is_for': 'add'
        });
    }


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
        console.log("wwwwwwwwwwwwwwwwwww");
        console.log(res.data.data);
        // return;
        if (wishlist_status == 1) {
            if (res.data.data.status == 'success') {
                $('#filler_' + id).addClass('ng-hide')
                $('#blank_' + id).removeClass('ng-hide')

            } else {
                model.show("Alert", "Something went wrong");
            }
        } else {
            if (res.data.data.status == 'success') {
                $('#blank_' + id).addClass('ng-hide')
                $('#filler_' + id).removeClass('ng-hide')
            } else {
                model.show("Alert", "Something went wrong");
            }
        }

    }).finally(function () {
        loading.deactive();
    });

     
    }


});