app.controller('category', function ($filter, $scope, $http, $location, $interval, $cookieStore, model, $locale, loading, $rootScope) {


    $scope.my_account = function () {
        $location.path('/myaccount/account');
    }
    $scope.backtohome = function () {
        $location.path('/dashboard/home');
    }

    $scope.subcategory = function (id) {
        // console.log(id)
        var subcategoryInfo = {
            'subcatid': id,
        }
        $cookieStore.put('subcategoryInfo', subcategoryInfo);

        $location.path('/subcategory');
    }

    // db.transaction(function (tx) {
    //     tx.executeSql('DELETE FROM catlog');
    // });

    db.transaction(function (t) {
        t.executeSql("DROP TABLE catlog",[], 
            function(t,results){
                console.error("Table Dropped")
            },
            function(t,error){
                console.error("Error: " + error.message)
            }
        )
   })

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

    $scope.category_data = function () {

        loading.active();

        var args = $.param({
            country_id: sessionStorage.country,//$scope.search,
            Language_code: sessionStorage.lang_code
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/category_api',
            data: args

        }).then(function (response) {

            res = response;

          console.log(res.data.data);
          if(res.data.data.status == 'success'){
            $scope.category_data = res.data.data.category; 
            $location.path('/category');
            // console.log($scope.category_data);
          }

        }).finally(function () {
            loading.deactive();
        });

        

    }
var currentid;
    $scope.toggleData = function(id){
        currentid = id;
        // alert(id)
        $.each($scope.category_data, function(idx, item) {
        console.log(item.id + "-----------"+id)
        if(item.id !== id){
			//alert()
           // $('#cOne_'+item.id).slideUp();
            //$(this).find("a.all_cat_headbar").addClass("collapsed");
        }
        });
		//alert();
		//$('.all_cat_below_div').slideUp();
		$(".all_cat_below_div").not('#collapseOne_'+id).slideUp();
        $('#collapseOne_'+id).slideToggle();
		var turn_icon = $('#collapseOne_'+id).siblings(".panel-heading").find(".all_cat_headbar");
		$(".all_cat_headbar").not(turn_icon).addClass("collapsed");
		turn_icon.toggleClass("collapsed");
        //$(this).find("a.all_cat_headbar").removeClass("collapsed");
        
    }
    /**
     * Funtion: searchbar on ng-keyup from category.html
     * Name: Sajal Goyal
     * Created-on: 23/10/2018 at 04:00pm 
     * Get product on searching
     */
    $scope.searchbar = function () {
        $scope.datanotfound = false;
        $scope.resultstatus = false;
        $scope.searchresult = '';

        if (($scope.search.length >= 1) && ($scope.search.length < 3)) {
            $scope.resultstatus = true;
            return false;
        } else if ($scope.search.length == 0) {

            $scope.resultstatus = false;
            return false;
        }

        // console.log($scope.search.length)
        loading.active();

        var args = $.param({
            'search_key': $scope.search,
            'uid': $cookieStore.get('userinfo').uid,
            'mid': uuid
        })
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/search/searchapi_result/?search_key=' + $scope.search,
            data: args

        }).then(function (response) {

            res = response;

            if (res.data.count > 0) {
                console.log(res.data.data)
                $scope.searchresult = res.data.data;
                $scope.enableDiv = true;
            } else {
                $scope.resultstatus = false;
                $scope.searchresult = '';
                $scope.datanotfound = true;
            }

        }).finally(function () {
            loading.deactive();
        });



    }

    /*   $scope.product_list = function (productListID, categoryName) {

          var categoryInfo = {
              'categoryName': categoryName,
              'productListID': productListID
          }
          $cookieStore.put('categoryInfo', categoryInfo);
 
          $location.path('/product/list');
      } */
    $scope.product_view = function (pid) {
        $cookieStore.put('productviewID', pid);
        $location.path('/product/view')
    }

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (id INTEGER PRIMARY KEY AUTOINCREMENT, uid, phone_no, email_address, country_id, date_added)');

    });

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS catlog (id INTEGER PRIMARY KEY AUTOINCREMENT, seq_id, subca_id, url_type, from_where, date_added)');
// alert()
    });

  


    $scope.showProducts = function(id,url){
        console.log(url)
        var subcategoryInfo = {
            'subcatid': id,
            'url': url,
            'from':'category'
        }
        
        var date = new Date();
    fromDateString = $filter('date')(date, 'dd-MM-yyyy')
    $cookieStore.remove('seq')
    sessionStorage.seq = 0;
    sessionStorage.seq++
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO catlog (seq_id, subca_id, url_type, from_where, date_added) VALUES ("'+ sessionStorage.seq +'","'+ id +'","'+url+'","category","'+fromDateString+ '")');
        });

        $cookieStore.put('subcategoryInfo', subcategoryInfo);
        //console.log( $cookieStore.get('subcategoryInfo').url);
        $location.path('/subcategory');
    }

});