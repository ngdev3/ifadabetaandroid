app.controller('sub_category', function ($scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    // console.log($rootScope.best_picks_of_the_season);return;

  

    var ID;
    $scope.fetch_product_list = function(id){
        if(id){
            ID = id;
        }else{
            ID =   $cookieStore.get('subcategoryInfo').subcatid;
        }
    // alert(ID);return;
        loading.active();


        var args = $.param({
          category_id : ID,
          country_id : sessionStorage.country,
          language_code : sessionStorage.lang_code
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
              if(!id){
                  $scope.categorysubData = res.data.data.category_data[0].sub;
                }
             /*  for(var i = 0; i< $scope.categorysubData.length; i++){
                $scope.categorysubSubData = $scope.categorysubData[i];
              } */
            //   console.log($scope.categorysubData);
              $scope.product = res.data.data.product.products;
            //   console.log($scope.product);
              for(var i = 0; i< $scope.product.length; i++){
                $scope.productVarient = res.data.data.product.products[i].product_varient;
                // console.log($scope.productVarient);
              } 
              // $scope.sliderCount = res.data.count;
              $location.path('/subcategory');
          } else {

              alert(res.data.status);
          }

          }).finally(function () {
              loading.deactive();
          });

    }


      $scope.see_alls = function(){
        loading.active();

        var args = $.param({
        product_type :$cookieStore.get('subcategoryInfo').subcatid,
        country_id : sessionStorage.country,
        language_code : sessionStorage.lang_code
        });

        // console.log(args);return;

        $http({
        headers: {
            //'token': '40d3dfd36e217abcade403b73789d732',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        url: app_url + '/get_pick_season_product', 
        data: args 

        }).then(function (response) {

        res = response;
        // console.log(res.data);
        // return;

        if (res.data.data.status == 'success') {
            $scope.best_picks_of_the_season = res.data.data.best_picks_of_the_season;
            $location.path('/subcategory');
        } else {

            alert(res.data.status);
        }

        }).finally(function () {
            loading.deactive();
        });

      }

      if($cookieStore.get('subcategoryInfo').from == 'home'){
        $scope.see_alls();
       
    }else{
        $scope.fetch_product_list();
    }

});