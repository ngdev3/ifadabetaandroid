app.controller('view_product', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {


    $scope.cart = function(){
        $location.path('/cart');
    }

    $scope.productpid = $cookieStore.get('id')
console.log($cookieStore.get("userinfo"));

    $scope.getvalueforOtherVarient = function (a, th) {
      

      $( ".total" ).each(function( index ) {
       $('#enablequant_'+$( this ).attr('data-weight_id')).removeClass('marked')
      });
      $("#enablequant_" + th + a ).addClass('marked')


      console.log(a)
     console.log(th);
      // return
      weightID = $("#enablequant_" + th + a ).attr('data-weight_id');
      // weightID = $("#disablequant_ " + a + th ).attr('data-weight_id');
      // pid = $("#disablequant_" + a + " option:selected").attr('data-product_id');
   // $rootScope.varientCheck(weightID, $cookieStore.get('storeinfo').store_id, pid);
      console.log(weightID)
      // console.log(pid)

  }
    

$scope.product_details = '';
$scope.fetch_product_data = function () {
       
        loading.active();

        $scope.pid = $cookieStore.get('id')
        var args = $.param({
            'product_id': $cookieStore.get('id'),
            'manufacture_id': '20',
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code ,   
            user_id:$cookieStore.get("userinfo").uid,
            user_type:$cookieStore.get("userinfo").left_data.user_type,

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
        
            if (response.data.data.status == 'success') {

                $scope.product_details = response.data.data.product_details;
                $scope.product_details_varients = response.data.data.product_details.menu_varient;
                $scope.product_price = response.data.data.product_details.menu_varient[0].price;
                $scope.DweightID = response.data.data.product_details.menu_varient[0].id;
                $scope.menu_id = response.data.data.product_details.id;
                $scope.addedQnty = response.data.data.product_details.menu_varient[0].quantity;
                $scope.manufacture_id = response.data.data.product_details.user_id;
                console.log($scope.product_price)
                $scope.product_weight_value = response.data.data.product_details.menu_varient[0].unit_value;
                $scope.product_weight_unit = +response.data.data.product_details.menu_varient[0].UNIT_NAME;
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
});