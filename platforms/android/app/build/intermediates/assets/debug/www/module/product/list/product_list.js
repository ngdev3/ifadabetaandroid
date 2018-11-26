app.controller('productlist', function ($scope, $http, $location,$route, $interval, $cookieStore, model, $locale, loading, $rootScope) {

    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
        return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid; //UID used for getting data from http request


    if (!$cookieStore.get('categoryInfo')) {
        return false;
    }
    
    var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		this.classList.toggle("selected");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight){
		  panel.style.maxHeight = null;
		} else {
		  panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	  });
    }
    

    $scope.catName = $cookieStore.get('categoryInfo').categoryName;
    $scope.getvalueforOtherVarient = function (a, th) {

        // console.log(a);
        // console.log(th);

        // console.log($("#product_" + a + " option:selected").attr('data-added'));
        // console.log($("#product_" + a + " option:selected").attr('data-addedQnty'));
        // console.log($("#product_" + a + " option:selected").attr('data-stock_type'));
        // console.log($("#product_" + a + " option:selected").attr('data-stock_value'));

        weightID = $("#product_" + a + " option:selected").attr('data-weight_id');
        pid = $("#product_" + a + " option:selected").attr('data-product_id');
        $rootScope.varientCheck(weightID, $cookieStore.get('storeinfo').store_id, pid);
    }




    $scope.product_detail = function () {
        $location.path('/product/view');
    }

    $scope.product_view = function (productviewID) {
        $cookieStore.put('productviewID', productviewID);
        $location.path('/product/view');
    }

    $scope.getpid = function (id) {
        // console.log(id);
        // console.log($('input[name=productPrice]').val());
        // console.log($scope.product);
    }

   
    $scope.filterCategory = function(id,cat){
    //    console.log(id);
    //    console.log(cat)

    }

    $scope.filterbrand = function(id){
       // console.log(id);
          
     }


    /**
 * function = Filtering on ng-click() of filter categories & brands
 * created on 11-03-18
 * created by sajal
 */ 

     $scope.category_array = [];
     $scope.Filtering = function(id){
           
         getDataFromFilter  = {
             'id':id
         }
        getBrandDataFromFilter  = {
            'brand_id':id
        }
         if($('#cat_'+id).prop("checked") == true){

            category_array = $scope.category_array.push(getDataFromFilter); 
        }else if($('#cat_'+id).prop("checked") == false){
            // index = $scope.category_array.indexOf(id)
            // $scope.category_array.splice(index, id);
            let index = $scope.category_array.findIndex( getDataFromFilter => getDataFromFilter.id === id );
            //console.log(index)
            
            $scope.category_array.splice(index,1);
        }


        if($('#brand_'+id).prop("checked") == true){
            
            category_array = $scope.category_array.push(getBrandDataFromFilter); 
           //console.log(id) 
        }
        else if($('#brand_'+id).prop("checked") == false){
            let index = $scope.category_array.findIndex( getBrandDataFromFilter => getBrandDataFromFilter.id === id );
            //console.log(index)
            $scope.category_array.splice(index, 1);
        }
        console.log($scope.category_array)
        
     }

/**
 * function = getFilteredData on ng-click() of filter form submission
 * created on 11-03-18
 * created by sajal
 */
     //$scope.category_array = [];
     $scope.cat_id = [];
     $scope.brands_id = [];
     $scope.getFilteredData = function(){

    for(var i=0 ; i<$scope.category_array.length  ; i++){
        if($scope.category_array[i].brand_id != undefined){
            
            brands_id = $scope.brands_id.push($scope.category_array[i].brand_id) ;
        }
        
        if($scope.category_array[i].id != undefined){
            cat_id = $scope.cat_id.push($scope.category_array[i].id) ;
            
        }  
        
    }
    var cat_ids = $scope.cat_id.join();
    var brand_ids =$scope.brands_id.join();
    console.log(cat_ids)
    console.log(brand_ids)

    loading.active();
 
 $http({
     headers: {
         //'token': '40d3dfd36e217abcade403b73789d732',
         'Content-Type': 'application/x-www-form-urlencoded'
     },
     method: 'GET',
     url: app_url + '/productapi?catid='+$cookieStore.get('id')+'&uid='+GlobalUID+'&store_id='+$cookieStore.get('storeinfo').store_id+'&mid='+uuid+'&brands='+brand_ids+'&category='+cat_ids+'',
     //data: args //forms user object

 }).then(function (response) {

     res = response;
     if (res.status == '200') {
        if (res.data.data.length > 0) {
            console.log(res.data.data)
            $rootScope.productlist = res.data.data;
            $rootScope.get_brands_with_product_count = res.data.get_brands_with_product_count;
            $rootScope.get_category_with_product_count = res.data.get_category_with_product_count;
            // $scope.category_array = [];
            $scope.cat_id = [];
            $scope.brands_id = [];
        } else {
            $rootScope.productlist = '';
        }
    } else {
        //Throw error if not logged in
        model.show('Alert', res.data.responseMessage);
        $location.path('/register');
    }

 }).finally(function () {
     loading.deactive();
 });
    
   }

/* $scope.cleararray = function(){
    $scope.category_array = [];
    $scope.cat_id = [];
    $scope.brands_id = [];
} */

});