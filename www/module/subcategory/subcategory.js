app.controller('sub_category', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    var ID =   $cookieStore.get('subcategoryID');
  $scope.fetch_product_list = function(){
    // alert(ID);return;
        loading.active();

        var args = $.param({
          category_id : ID,
          country_id : 2,
          language_code : 'en'
          //user_type : 4,
          //user_id : 52,
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
          // console.log(res.data);
          // return;

          if (res.data.data.status == 'success') {
              console.log(res.data.data);
              $scope.categoryData = res.data.data.category_data[0];
              $scope.product = res.data.data.product.products;
              // console.log($scope.product.length);return;
              for(var i = 0; i< $scope.product.length; i++){
                $scope.productVarient = res.data.data.product.products[i].product_varient;
              }
              // $scope.sliderCount = res.data.count;
             console.log($scope.productVarient);return;
              $location.path('/subcategory');
          } else {

              alert(res.data.status);
          }

          }).finally(function () {
              loading.deactive();
          });

      }

});