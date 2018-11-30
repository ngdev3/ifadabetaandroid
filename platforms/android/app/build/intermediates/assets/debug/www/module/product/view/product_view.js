app.controller('view_product', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope) {


    $scope.cart = function(){
        $location.path('/cart');
    }


$scope.change_units = function(){
    
    //console.log($scope.z.price);
}
    

$scope.product_details = '';
$scope.fetch_product_data = function () {
       
        loading.active();

        $scope.pid = $cookieStore.get('productviewID');
        var args = $.param({
            'product_id': $cookieStore.get('id'),
            'country_id': sessionStorage.country,
            'manufacture_id': '',
            'language_code': sessionStorage.lang_code,     
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
});