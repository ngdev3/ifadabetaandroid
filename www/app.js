var project_name = '/ifadabeta/webservices';
var base_url = 'http://projects.tekshapers.in';
var country = 'en';
var WebUrl = base_url + project_name;
var app_upload_url = base_url + project_name; 
var app_url = base_url + project_name;
var FACEBOOK_APPID = '1421853664598058';
var api_key = '0ed2e4b57d1f837276553b00d3fc2a29';
var db = window.openDatabase("ifadabeta", "1.0", "ifadabeta DB", 1000000);
var store_id = '5';
var uuid = sessionStorage.u_ids;
var device_type = 'Android';
var lat;
var lng;
var profile_image_path = 'http://projects.tekshapers.in/ifadabeta/uploads/user_image/';

var app = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'slickCarousel', 'ngSanitize', 'ngCookies', 'geolocation', 'ngCordovaOauth', 'ngCordova', /* 'kendo.directives', */ 'pascalprecht.translate']);

//document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//document.getElementById("networkInfo").addEventListener("onload", networkInfo);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function networkInfo() {
    var networkState = navigator.connection.type;
    var states = {};

    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
};

function onOffline() {
    alert('You are now offline!');
    setTimeout(function () {
        navigator.app.exitApp();
    }, 1000)
    //window.location = 'no_internet.html';
};

function onOnline() {
    //  navigator.app.exitApp();
    // alert('You are now online!');
};

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "module/splash/splash.html"
        })
        .when("/login", {
            templateUrl: "module/login/login.html"
        })
        .when("/forgot", {
            templateUrl: "module/forgot/forgot.html"
        })
        .when("/changepassword", {
            templateUrl: "module/changepassword/changepassword.html"
        })
        .when("/register", {
            templateUrl: "module/register/register.html"
        })
        .when("/address", {
            templateUrl: "module/address/address.html"
        })
        .when("/address/add", {
            templateUrl: "module/address/address_add.html"
        })
        .when("/address/edit/:id", {
            templateUrl: "module/address/address_edit.html"
        })
        .when("/cart", {
            templateUrl: "module/cart/cart.html"
        })
        .when("/category", {
            templateUrl: "module/category/category.html"
        })
        .when("/contactus", {
            templateUrl: "module/cms/contactus/contactus.html"
        })
        .when("/policy", {
            templateUrl: "module/cms/privacy_policy/policy.html"
        })
        .when("/terms", {
            templateUrl: "module/cms/terms_and_conditions/terms_and_conditions.html"
        })
        .when("/dashboard/home", {
            templateUrl: "module/dashboard/home.html"
        })
        .when("/dashboard/view_all", {
            templateUrl: "module/dashboard/view_all.html"
        })
        .when("/myaccount/account", {
            templateUrl: "module/myaccount/myaccount.html"
        })
        .when("/wishlist", {
            templateUrl: "module/wishlist/wishlist.html"
        })
        .when("/myaccount/profile", {
            templateUrl: "module/myaccount/myprofile.html"
        })
        .when("/order/myorder", {
            templateUrl: "module/order/my_orders/my_orders.html"
        })
        .when("/order/myorderdetails", {
            templateUrl: "module/order/my_orders_details/my_orders_details.html"
        })
        .when("/order/track_order", {
            templateUrl: "module/order/track_order/track_order.html"
        })
        .when("/product/list", {
            templateUrl: "module/product/list/product_list.html"
        })
        .when("/product/view", {
            templateUrl: "module/product/view/product_view.html"
        })
        .when("/sidemenu", {
            templateUrl: "module/sidemenu/sidemenu.html"
        })
        .when("/splash", {
            templateUrl: "module/splash/splash.html"
        })
        .when("/dashboard/category", {
            templateUrl: "module/category/category.html"
        })
        .when("/otp", {
            templateUrl: "module/otp/otp.html"
        })
        .when("/notification", {
            templateUrl: "module/notification/notification.html"
        })
        .when("/payment", {
            templateUrl: "module/payment/payment_summary.html"
        })
        .when("/payment/mode", {
            templateUrl: "module/payment/payment_mode.html"
        })
        .when("/addressdetail", {
            templateUrl: "module/address_detail/address_detail.html"
        })
        .when("/subcategory", {
            templateUrl: "module/subcategory/subcategory.html"
        })
        .when("/deliverytime", {
            templateUrl: "module/delivery/delivery_time.html"
        })
        .when("/thankyou", {
            templateUrl: "module/thankyou/thankyou.html"

        }).when("/store", {
            templateUrl: "module/fetch_store/fetch.html"

        }).when("/offers", {
            templateUrl: "module/offers/offers.html"

        }).when("/newpassword", {
            templateUrl: "module/forgot/newpassword.html"

        }).when("/wallet", {
            templateUrl: "module/wallet/wallet.html"

        })
        .when("/language", {
            templateUrl: "module/switchlanguage/switchlanguage.html"

        })
        .when("/switch_country", {
            templateUrl: "module/switch_country/switch_country.html"

        })
        .when("/value_packs", {
            templateUrl: "module/value_packs/value_packs.html"

        }).when("/view_ticket", {
            templateUrl: "module/ticket/view/view_ticket.html"

        }).when("/list_ticket", {
            templateUrl: "module/ticket/list/list_ticket.html"

        }).when("/aboutus", {
            templateUrl: "module/cms/about_us/about_us.html"
        }).when("/rewards", {
            templateUrl: "module/myreward/myreward.html"
        }).when("/add_ticket", {
            templateUrl: "module/ticket/add/add_ticket.html"

        })


});



var currentUrl = '';

//Detect the Current Path
app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {

    //it used to show the data in all screen
    $rootScope.contentfornodata = 'No Data Found';

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

    });
}]);

app.filter('modulo', function () {
    return function (arr, div, val) {
        return arr.filter(function (item, index) {
            return index % div === (val || 0);
        })
    };
});

app.run(function ($translate, $rootScope, $cookieStore, loading, model, $http, $location, $interval) {



    $rootScope.InsertData = function (password, type, username, created_date, modified_date) {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS passwordLog (pid INTEGER PRIMARY KEY AUTOINCREMENT, password, type, username, created_date, modified_date)');
            tx.executeSql('INSERT INTO passwordLog (password, type, username, created_date, modified_date) VALUES ("' + password + '","' + type + '","' + username + '","' + created_date + '","' + '-' + '")');
        });
    }

    $rootScope.UpdateDate = function (password, type, username, id, modified_date) {
        db.transaction(function (tx) {
            //  tx.executeSql('CREATE TABLE IF NOT EXISTS passwordLog (pid INTEGER PRIMARY KEY AUTOINCREMENT, password, type, username, created_date, modified_date)');
            tx.executeSql('UPDATE passwordLog set password=?, type=?, username=?, modified_date=? where pid=?', [password, type, username, modified_date, id]);
        });
    }

    if($cookieStore.get('userinfo')){
        var user_type = $cookieStore.get("userinfo").left_data.user_type;
        var uid = $cookieStore.get("userinfo").uid;
    }else{
        var uid = '';
        var user_type = '';
    }

    $rootScope.FetchData = function (id) {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM userinfo WHERE id = ?', ['1'], function (tx, results) {

                $rootScope.user_id = results.rows[0].uid;
                $rootScope.phone_no = results.rows[0].phone_no;
                $rootScope.email_address = results.rows[0].email_address;
                $rootScope.username = results.rows[0].username;
                $rootScope.date_added = results.rows[0].date_added;
                $rootScope.$apply();

            });
        });
    }

    $rootScope.DeleteData = function () {
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM userinfo', [], function (tx, results) {
                console.log("Databse Deleted");
            });
        });
    }

    $rootScope.checkToken = function(){
    if(!$cookieStore.get('userinfo')){
        uuid = sessionStorage.u_ids;
    }else{
        uuid = '';
    }
}
    $rootScope.sort = '';
    $rootScope.searchBar = function () {
        var brands =$cookieStore.get('brand_array');
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

        if (!$cookieStore.get("userinfo")) {
            var userID = '';
            var user_type = '';
        } else {
            var userID = $cookieStore.get("userinfo").uid;
            var user_type = $cookieStore.get("userinfo").user_type;
        }
        $rootScope.searchresult = '';

        loading.active();

        var args = $.param({
            'country_id': sessionStorage.country,
            'language_code': sessionStorage.lang_code,
            'search_product': $rootScope.searchProduct,
            'sort_by': $rootScope.sort,
            'user_id': userID,
            'user_type': user_type,
            'brand': brand_str
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
                if($rootScope.brand_data == '' || $rootScope.brand_data == undefined)
                {
                    $rootScope.brand_data = res.data.data.brand_data;
                }
                $rootScope.searchProduct = '';
                // $rootScope.searchresult = '';
                $cookieStore.remove('brand_array');
                $location.path("/product/list");
            } else {
                // alert()
                // $scope.resultstatus = false;
                $rootScope.searchresult = '';
                $rootScope.searchProduct = '';
                $cookieStore.remove('brand_array');
                $location.path("/product/list");
                // $scope.datanotfound = true;
            }

        }).finally(function () {
            loading.deactive();
        });
    }
    /*    $rootScope.currentval = 0;
   
       $rootScope.getProductList = function () {
           loading.active()
           $rootScope.productlist = '';
           $http({
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               },
               method: 'GET',
               url: app_url + 'productapi?catid=' + $cookieStore.get('categoryInfo').productListID + '&uid=' + $cookieStore.get('userinfo').uid + '&store_id=' + $cookieStore.get('storeinfo').store_id + '&mid=' + uuid,
           }).then(function (response) {
               res = response;
               console.log(response.data);
               if (res.status == '200') {
                   if (res.data.data.length > 0) {
                       $rootScope.productlist = res.data.data;
                       $rootScope.get_brands_with_product_count = res.data.get_brands_with_product_count;
                       $rootScope.get_category_with_product_count = res.data.get_category_with_product_count;
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
           })
       } */



    $rootScope.addToCart = function (weightid) {

        
    $rootScope.checkToken();
        console.log(weightid.target.dataset);
        // return;
        if($cookieStore.get('userinfo')){
            var user_type = $cookieStore.get("userinfo").left_data.user_type;
            var uid = $cookieStore.get("userinfo").uid;
        }else{
            var uid = '';
            var user_type = '';
        }
     
        varient_id = weightid.target.dataset.weightid;
        manufacture_id = weightid.target.dataset.user_id;
        //menu_id = weightid.target.dataset.weightid;
        menu_id = weightid.target.dataset.menuid;

        $rootScope.currentval = 0;
        addToCartID = 'addToCart_' + varient_id;
        enableCartID = 'enableCart_' + varient_id;
        quantityID = 'quantity_' + varient_id;


        var args = $.param({
            user_type: user_type,
            user_id: uid,
            country_id: sessionStorage.country,
            manufacture_id: manufacture_id,
            menu_id: menu_id,
            menu_varient_id: varient_id,
            token:uuid
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/add_cart',
            data: args //forms user object

        }).then(function (response) {
            console.log(response)
            $rootScope.usercartvalue();
            if (response.data.data.add_cart.allow_to_add_in_cart == 'yes') {

                $('.' + addToCartID).hide();
                $('#' + addToCartID).hide();
                $('#' + enableCartID).removeClass('hide').removeClass('ng-hide');
                $('#' + quantityID).val('1');
                $('#enableCart_' + varient_id).attr('data-rowid', response.data.data.add_cart.menu_row_id);



            } else if (response.data.data.add_cart.allow_to_add_in_cart == 'no') {
                model.show('alert', 'Item is out of stock');
            } else if (response.data.status == 'outofstock') {
                alert('Stock Problem');
            }

        })

    }
    // $rootScope.usercartvalue();

    $rootScope.varientCheck = function (weightid, menu_id, price, unit, manufacture_id, varient_id) {


        $rootScope.checkToken();

       /*  if (!$cookieStore.get('userinfo')) {
            alert('Please Login First !')
            return
            //$location.path('')
        } */

        $('#firstt_' + menu_id).find('.add_item_button').attr('id', 'enableCart_' + varient_id);
        $('#firstt_' + menu_id).find('.add_item_button').find('.add_item').attr('id', 'plus_' + varient_id).attr('data-weightid', varient_id);
        $('#firstt_' + menu_id).find('.add_item_button').find('input[type="text"]').attr('id', 'quantity_' + varient_id);;
        $('#firstt_' + menu_id).find('.less_item').attr('data-weightid', varient_id).attr('id', 'minus_' + varient_id);
        $('#firstt_' + menu_id).find('.add_cart_button').attr('id', 'addToCart_' + varient_id);
        $('#firstt_' + menu_id).find('.div_in_stock').attr('id', 'outofstock_' + varient_id);
        $('#firstt_' + menu_id).find('.div_in_stock').find('.out_of_stock').attr('data-weightid', varient_id).attr('id', 'addCart_' + varient_id);
        $('#firstt_' + menu_id).find('.add_cart_button').find('.addcart_button').attr('data-weightid', varient_id).attr('id', 'addCart_' + varient_id);
        $('#firstt_' + menu_id).attr('data-attr', varient_id);

        $('.unfill').attr('id', 'blank_' + varient_id).attr('data-varient_id', varient_id);
        $('.fill').attr('id', 'filler_' + varient_id).attr('data-varient_id', varient_id);


        addToCartID = 'addToCart_' + weightid;
        enableCartID = 'enableCart_' + weightid;
        quantityID = 'quantity_' + weightid;

        var args = $.param({
            menu_id: menu_id,
            menu_varient_id: varient_id,
            manufacture_id: manufacture_id,
            country_id: sessionStorage.country,
            user_id: uid,
            token:uuid
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/select_another_varient',
            data: args //forms user object

        }).then(function (response) {

            $('#enableCart_' + varient_id).attr('data-rowid', response.data.data.menu_row_id);

            if (response.data.data.allow_to_add_in_cart == 'no') {
                // alert()
                console.log(1)
                $('#outofstock_' + varient_id).removeClass('ng-hide')
                $('#addToCart_' + varient_id).addClass('ng-hide')
                $('#enableCart_' + varient_id).addClass('ng-hide')

            }
            if (response.data.data.is_in_cart == 'yes') {
                console.log(2)
                // $('#enableCart_' + varient_id).addClass('ng-hide')
                $('#enableCart_' + varient_id).attr('data-rowid', response.data.data.menu_row_id);
                $('#enableCart_' + varient_id).val(response.data.data.qnty);
                $('#quantity_' + varient_id).val(response.data.data.qnty);
                $('#outofstock_' + varient_id).addClass('ng-hide')
                $('#addToCart_' + varient_id).addClass('ng-hide')
                $('#enableCart_' + varient_id).removeClass('ng-hide').show()



            }
            if (response.data.data.is_in_wishlist == 'yes') {
                //heart icon
                console.log(3)
                
                $('#blank_' + varient_id).addClass('ng-hide')
                $('#filler_' + varient_id).removeClass('ng-hide')

            }
            if (response.data.data.allow_to_add_in_cart == 'yes') {

                console.log(4)
                // alert('d')
                if (response.data.data.is_in_cart != 'yes') {

                    $('#enableCart_' + varient_id).addClass('ng-hide')
                    $('#addToCart_' + varient_id).removeClass('ng-hide').show()
                }

                $('#outofstock_' + varient_id).addClass('ng-hide')

            }

            if (response.data.data.is_in_wishlist == 'no') {

                console.log(5)
                $('#blank_' + varient_id).removeClass('ng-hide')
                $('#filler_' + varient_id).addClass('ng-hide')
            }


        })
        return false;
    }
    $rootScope.enableCartAction = function (enabledynmicID, disabledynamicID) {

        if (enabledynmicID != '') {
            $('#' + enabledynmicID).show();
            $('#' + disabledynamicID).hide();
        }
    }


    $rootScope.plusToCart = function (weightid) {
        $rootScope.checkToken();
        if($cookieStore.get('userinfo')){
            var user_type = $cookieStore.get("userinfo").left_data.user_type;
            var uid = $cookieStore.get("userinfo").uid;
        }else{
            var uid = '';
            var user_type = '';
        }
      
        weightid = weightid.target.dataset.weightid;
        rowid = $('#enableCart_' + weightid).attr('data-rowid');
        addToCartID = 'addToCart_' + weightid;
        enableCartID = 'enableCart_' + weightid;
        quantityID = 'quantity_' + weightid;
        // alert();
        $rootScope.currentval = $('#' + quantityID).val();
        var new_qnty = $rootScope.currentval;


        // loading.active();
        var args = $.param({
            rowid: rowid,
            qty: parseInt(new_qnty) + 1,
            language_code: sessionStorage.lang_code,
            user_id: uid,
            country_id: sessionStorage.country,
            token:uuid
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/addQtyCart',
            data: args //forms user object

        }).then(function (response) {
            //  alert($rootScope.currentval);
            console.log(response.data.status)
            if (response.data.status !== 'outofstock') {
        
                $rootScope.in_stock_check = response.data.data.allow_to_add_in_cart;
                if( $rootScope.in_stock_check == 'no'){
                    alert('Out of stock');
                    return false;
                }
                $rootScope.currentval = parseInt($rootScope.currentval) + 1;
            } else {
                alert('This Item is out of stock ')
            }
            $rootScope.usercartvalue();

            $('#' + quantityID).val($rootScope.currentval)
            if($cookieStore.get('userinfo')){

                $rootScope.apply_promo('add')
            }
        }).finally(function () {
            loading.deactive();
        });
    }

    $rootScope.minusToCart = function (weightid) {
        $rootScope.checkToken();
        if($cookieStore.get('userinfo')){
            var user_type = $cookieStore.get("userinfo").left_data.user_type;
            var uid = $cookieStore.get("userinfo").uid;
        }else{
            var uid = '';
            var user_type = '';
        }
      
        // console.log(weightid.target.dataset);
        weightid = weightid.target.dataset.weightid;
        console.log("------" + weightid)
        rowid = $('#enableCart_' + weightid).attr('data-rowid');
        addToCartID = 'addToCart_' + weightid;
        enableCartID = 'enableCart_' + weightid;
        quantityID = 'quantity_' + weightid;
        console.log("******" + rowid);
        $rootScope.currentval = $('#' + quantityID).val();
        $rootScope.currentval--

        //loading.active();
        var args = $.param({
            rowid: rowid,
            qty: $rootScope.currentval,
            language_code: sessionStorage.lang_code,
            user_id: uid,
            country_id: sessionStorage.country,
            token:uuid
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/removeQtyCart',
            data: args //forms user object

        }).then(function (response) {
            console.log(response.data.data.isEmpty)
            if (response.data.data.isEmpty == 0) {
                // $rootScope.usercartvalue();
                $('#' + addToCartID).removeClass('ng-hide').show();
                $('#' + enableCartID).addClass('ng-hide');
                $('#' + quantityID).val('1');
            } else if ($rootScope.currentval == 0 && response.data.data.status == 'success') {
                $('#' + addToCartID).removeClass('ng-hide').show();
                $('#' + enableCartID).addClass('ng-hide');
                $('#' + quantityID).val('1');
            } else {
                $('#' + quantityID).val($rootScope.currentval)
                //  $rootScope.usercartvalue();
            }
            $rootScope.usercartvalue();
            if($cookieStore.get('userinfo')){

                $rootScope.apply_promo('add')
            }
        }).finally(function () {
            loading.deactive();
        });
    }


    $rootScope.CheckProductDetails = function () {

        $rootScope.currentval++;

        var args = $.param({
            weightid: $rootScope.weightid,
            uid: $cookieStore.get('userinfo').uid,
            mid: uuid,
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'itemcartapi/checkitemCart',
            data: args //forms user object

        }).then(function (response) {
            //console.log(response)
        })
    }


    $rootScope.opencart = function () {
        $rootScope.usercartvalue();
        $location.path('/cart');
    }

    $rootScope.activeCartValue = 0;
    $rootScope.usercartvalue = function () {

        currentUrls = $location.path();
        currentUrls = currentUrls.split('/')[1];

        /* if (!$cookieStore.get('userinfo')) {

                $rootScope.cart_count = '';
                $rootScope.subtotalbeforediscount = '';
                $rootScope.tax_amount = '';
                $rootScope.finalTotal = '';
                $rootScope.cart_data = '';
                $rootScope.is_coupon_applied

            if (currentUrls == 'cart') {
                alert('Please Login First !')
                return
            } 
            return
        } */

        if($cookieStore.get('userinfo')){
            var user_type = $cookieStore.get("userinfo").left_data.user_type;
            var uid = $cookieStore.get("userinfo").uid;
        }else{
            var uid = '';
            var user_type = '';
        }
        var args = $.param({
            user_id: uid,
            page: '0'

        });

        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/wallet_list',
            data: args //forms user object

        }).then(function (response) {
          //  loading.deactive();
            res = response;

            //  alert("response from the server ");
            if (res.data.responseStatus == 'success') {
                $rootScope.wallet_amount = res.data.data.wallet_data.wallet_total_amount - res.data.data.wallet_data.wallet_used_amount;
                $rootScope.wallet_transaction = res.data.data.wallet_transaction;
               
            } else {
                alert(res.data.responseStatus);
            }

            $rootScope.mycart();
        })
    }




    $rootScope.mycart = function () {
        $rootScope.checkToken();
        if($cookieStore.get('userinfo')){
            var user_type = $cookieStore.get("userinfo").left_data.user_type;
            var uid = $cookieStore.get("userinfo").uid;
        }else{
            var uid = '';
            var user_type = '';
        }
        var args = $.param({
            country_id: sessionStorage.country,
            language_code: sessionStorage.lang_code,
            user_id: uid,
            token:uuid,

        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/cart/checkout',
            data: args //forms user object

        }).then(function (response) {
            //alert();
            // console.log(response.data)
         //   loading.deactive();
            res = response.data.data.cart_data;
            console.log(response.data.data.subtotalafterdiscount)
            $rootScope.cart_count = response.data.data.cart_item_count
            if (response.data.responseCode !== '400') {

                $rootScope.cart_data = res;
                $rootScope.cart_values = response.data.data;

                if (!$cookieStore.get("promocode")) {
                    $rootScope.subtotalbeforediscount = response.data.data.subtotalafterdiscount;
                    $rootScope.tax_amount = response.data.data.tax_amount;
                    $rootScope.finalTotal = response.data.data.finalTotal;
                    $rootScope.coupon_discount = '';
                    $rootScope.subtotalafterdiscount = '';
                    // return
                }
                var cartdata = {
                    'from': 'cart'
                }
                $cookieStore.put('cart', cartdata);
            } else {
                $rootScope.cart_data = '';
                $rootScope.cart_values = ''
            }
        })
    }

    $rootScope.apply_promo = function (type) {
       
        if(!$cookieStore.get('userinfo')){
            alert('Please Login First !');
            return false;
        }
        console.log($rootScope.promocode)
        if (type == 'remove') {
            $('#inputpromo').removeAttr('disabled', 'disabled');
            $('#apply').removeClass('ng-hide')
            $('#applied').addClass('ng-hide')
            $rootScope.promocode = ''

            
            $cookieStore.remove("promocode")
            $rootScope.mycart();
            return;
        };

        if (type == 'add') {

            if (!$cookieStore.get("promocode")) {

                return
            }
        }

        //  alert("Error");
        var error_str = '';
        if ($rootScope.promocode == '' || $rootScope.promocode == undefined) {
            error_str += "Promo Code";
        }

        if (error_str !== '') {
            error_str = "<span style='font-weight:700;'> Following field must have valid information:</span><br/>" + error_str;
            alert(error_str);
            return
            // model.show('Alert', error_str);
        }

        if ($rootScope.promocode != '' || $rootScope.promocode != undefined) {
            loading.active();

            var args = $.param({

                promo_code: $rootScope.promocode,
                country_id: sessionStorage.country,
                user_id: $cookieStore.get("userinfo").uid,
                language_code: sessionStorage.lang_code,
                user_type: $cookieStore.get("userinfo").left_data.user_type,

            });

            $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + '/cart/apply_promo_code',
                data: args //forms user object

            }).then(function (response) {
                res = response;
                console.log(res.data.data.status);
                if (res.data.data.status != 'error') {

                    console.log(response.data.data.subTotalAfterDiscount);
                    $rootScope.subtotalafterdiscount = response.data.data.subTotalAfterDiscount;
                    $rootScope.tax_amount = response.data.data.vat;
                    $rootScope.coupon_discount = response.data.data.coupon_discount;
                    $rootScope.finalTotal = response.data.data.finalTotal;

                    var promocode = {
                        codename: $rootScope.promocode
                    }
                    
                    $cookieStore.put("promocode", promocode);
                    console.log(response.data.data)
                    var coupon_data = {
                        coupon_code: response.data.data.coupon_data.coupon_code,
                        coupon_id: response.data.data.coupon_data.coupon_id,
                        percentage: response.data.data.coupon_data.percentage
                    }
                    $cookieStore.put("coupon_data", coupon_data);

                    $('#inputpromo').attr('disabled', 'disabled');
                    $('#apply').addClass('ng-hide')
                    $('#applied').removeClass('ng-hide').show();
                } else {
                    model.show('Alert', 'Promo Code Invalid')
                }
            }).finally(function () {
                loading.deactive();
            });

        }
    }

    var currentUrl;
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        currentUrl = $location.path();
        currentUrl = currentUrl.split('/')[1];
        console.log(currentUrl)
        // $rootScope.ChangeRoute = currentUrl.split('/')[1];
        if (currentUrl !== "cart" && currentUrl !== "addressdetail" && currentUrl !== "payment" && currentUrl !== "payment/mode") {
            $rootScope.promocode = '';
            $cookieStore.remove("promocode")
            $rootScope.usercartvalue();
        }
    });

});


app.run(function ($rootScope, $cookieStore, loading, model, $http, $location, $interval) {

    window.alert = function (type, content) {

        if (content == '' || content == undefined) {

            if (typeof type === 'string') {

                var j = type.toLowerCase();
                var a = j.indexOf("successfully");
                var b = j.indexOf("successful");
                var c = j.indexOf("success");
                // //console.log(c)
                if (a >= 0 || b >= 0 || c >= 0) {
                    model.show('Info', type);
                } else {
                    model.show('Alert', type);
                }

            } else {

                //it will show when u passed the object
                model.show('Info', JSON.stringify(type));
            }
        } else {

            model.show(type, content);
        }
    }


    $rootScope.back = function () {
        window.history.back();
    }

    $rootScope.cart = function () {
        $location.path('/cart');
    }

    $rootScope.initOneSignal = function () {

        console.log('some Thing Went Wrong :-  Init One Signal')
        return;

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            // Now safe to use device APIs

            window.plugins.OneSignal
                .startInit("207d52dd-d832-4cd8-b2e9-1b664e6e326f")
                .endInit();

            window.plugins.OneSignal.getPermissionSubscriptionState(function (status) {
                $rootScope.UniversalAppToken = status.subscriptionStatus.userId;
            });

            window.plugins.OneSignal.getIds(function (ids) {
                // alert(JSON.stringify(ids.userId))
                loading.active();
                $rootScope.UniversalAppToken = ids.userId;
                loading.deactive();
            });


            window.plugins.OneSignal
                .startInit("85f52950-04fc-425c-a698-ac1ce79bfaca")
                .handleNotificationOpened(function (jsonData) {


                    var data = JSON.stringify(jsonData);
                    var get = data.split('additionalData')[1];

                    var data_address = get.replace(/"/g, " ");
                    var data_address1 = get.split('},')[0];
                    var data_address2 = data_address1.replace('":{', ' ');
                    var data_address3 = data_address2.replace(/"/g, " ");
                    var data_address4 = data_address3.replace(/:/g, " ");
                    var data_address5 = data_address4.replace(/,/g, " ");
                    var data_address6 = data_address5.split('  ');

                    var timer = data_address6[2];
                    var ads_id = data_address6[4];
                    var user_id = data_address6[6];

                    var notification = {
                        user_id: user_id,
                        ads_id: ads_id,
                        timer: timer
                    }
                    $cookieStore.put('notification', notification);

                    if ($rootScope.ChangeRoute == 'push_notify') {
                        location.reload();
                    } else {

                        $location.path('/push_notify')
                        $rootScope.$apply();
                    }

                })
                .endInit();

            window.plugins.OneSignal
                .startInit("85f52950-04fc-425c-a698-ac1ce79bfaca")
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
                .endInit();

        }

    }



    $rootScope.BackgroundColor = function () {
        return false;
        // loading.active();
        var args = $.param({
            'api_key': api_key,
        });

        // Get the user info from Database
        $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'webservices/get_background_color',
            data: args //forms user object

        }).then(function (response) {
            loading.deactive();
            res = response;
            if (res.data.responseCode == '200') {

                $rootScope.bg_color = res.data.data.bg_color;
                $cookieStore.put('bgcolor', $rootScope.bg_color);
                var load = angular.element(document.querySelector('.bg-color-dynamic'));

                var color_code = '#' + $cookieStore.get('bgcolor');

                if (color_code) {
                    load.css('background-color', color_code);
                } else {
                    load.css('background-color', '#000');
                }
                //$cookieStore.put('bgcolor',$rootScope.bg_color);                              
                /*  set values in the scope for display */

            } else {
                //Throw error if not logged in    
                model.show('Alert', res.data.responseMessage);
                return false;
            }
        });
    }

    $rootScope.getCategory = function () {

        return $http({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
            url: app_url + 'categoryapi',
        })
    }


    $rootScope.activeCart = function () {
        loading.active();
        if ($cookieStore.get('userinfo') != '' || $cookieStore.get('userinfo') != undefined) {
            loading.active();
            var args = $.param({
                api_key: api_key,
                id: $cookieStore.get('userinfo').id,
            });
        }

        // Get the user info from Database
        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + 'webservices/get_advertise_upload_and_limit',
            data: args //forms user object

        }).then(function (response) {

            res = response;

            if (res.data.responseCode == '200') {
                //put cookie and redirect it    
                // $rootScope.uploadsconfig = res.data.data;
                $location.path('/upload_ads');
            } else {
                //Throw error if not logged in 

                model.show('Alert', res.data.responseMessage);
                return false;
            }
        }).finally(function () {
            loading.deactive();
        });;
    }


    $rootScope.addToWishlist = function (id, wishlist_status, from = null, pid= null) {

        // if(from == 'detail'){
        //     $('#whish_' + pid).
        // }
        // alert(pid);return;
        // console.log("aaaaaaaaaaaaa----");
        // console.log($rootScope.is_in_wishlist);
        // return;
        if (!$cookieStore.get("userinfo")) {
            alert("Please Login First");
            return false;
        } else {
            var userID = $cookieStore.get("userinfo").uid;
        }

        //  loading.active();
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
                    // $("#unclicked"+id).removeClass("fa-heart-o").addClass("fa-heart fill");         
                    //  model.show("Alert","Removed From Wishlist Successfully");
                    //$rootScope.is_in_wishlist = 0;
                    // $route.reload();
                } else {
                    model.show("Alert", "Something went wrong");
                }
            } else {
                if (res.data.data.status == 'success') {
                    $('#blank_' + id).addClass('ng-hide')
                    $('#filler_' + id).removeClass('ng-hide')
                    // $("#unclicked"+id).removeClass("fa-heart-o").addClass("fa-heart fill");         
                    //   model.show("Alert","Added To Wishlist Successfully");
                    // $rootScope.is_in_wishlist = 1;
                    //$route.reload();
                } else {
                    model.show("Alert", "Something went wrong");
                }
            }

        }).finally(function () {
            loading.deactive();
        });
    }

    $rootScope.BackgroundColor();

    $rootScope.TimeOutConnection = function (status) {


        myVar = $interval(function () {

            if ($location.path() == '/') {
                $rootScope.BackgroundColor();
            } else {
                $interval.cancel(myVar);
            }

        }, 5000); //5 Sec timeStamp


    }

    $rootScope.TimeOutConnection();
});



app.run(function ($cordovaDialogs, $q, $http, $rootScope, $location, $interval, $cordovaToast, loading, $cordovaGeolocation, $cookieStore, model) {


    $rootScope.googleHit = function (lat, lng) {
        if ($cookieStore.get('userinfo')) {
            var args = $.param({
                api_key: api_key,
                user_id: $cookieStore.get('userinfo').id,
                latitude: lat,
                longitude: lng
            });
            $http({
                headers: {
                    //'token': '40d3dfd36e217abcade403b73789d732',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                url: app_url + 'auth/google_hit',
                data: args //forms user object
            }).then(function (response) {
                // alert(JSON.stringify(response));
                loading.deactive();
                res = response;
                if (res.data.responseCode == '200') {
                    $rootScope.counts = res.data.data;
                } else {

                    model.show('alert', res.data.responseMessage);
                }


            });
        }
    }



    $rootScope.getcountry = function () {

        var lat = '';
        var lng = '';

        cordova.plugins.diagnostic.isLocationAvailable(function (available) {
            // alert('4');
            if (available) {
                // alert(available);
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: true
                };
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

                    $rootScope.lat = lat = position.coords.latitude;
                    $rootScope.lng = lng = position.coords.longitude;
                    // alert($rootScope.lat);
                    setTimeout(function () {
                        $rootScope.googleHit(lat, lng)
                    }, 300)

                }, function (err) {
                    // error
                });


            } else {
                $cordovaDialogs.confirm('Please Enable GPS Location...', 'Alert', ['Ok', 'Cancel'])
                    .then(function (buttonIndex) {
                        // no button = 0, 'OK' = 1, 'Cancel' = 2
                        //alert(buttonIndex);
                        if (buttonIndex == '1') {
                            loading.deactive();
                            cordova.plugins.diagnostic.switchToLocationSettings();
                            // $location.path('/landing');
                        } else {
                            loading.deactive();
                            return false;
                        }

                    });

            }
        });
        // alert(lat)

    };


    // if (device.platform == 'Android') {
    $rootScope.geolocation = function () {
        // alert('1')
        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, function (status) {

            if (status.hasPermission) {
                // alert(JSON.stringify(status));
                // alert('2')
                $rootScope.getcountry();
            } else {


                // alert('3')
                // alert(JSON.stringify(status));
                permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, success, error);

                function error() {
                    // alert('4')
                    // alert(JSON.stringify(status));
                    model.show('Info', 'Location permission is not turned on');
                    $rootScope.geolocation();
                }

                function success(status) {
                    if (!status.hasPermission) {

                        model.show('Info', 'Location permission is not turned on');
                        if (window.cordova && window.cordova.plugins.settings) {
                            window.cordova.plugins.settings.open("application_details");
                        }

                    } else {
                        $rootScope.getcountry();
                    }
                }
            }
        }, function (status) {
            // alert(JSON.stringify(status));
        });
    }

    myVar = $interval(function (a) {

        $rootScope.geolocation();
    }, 1800000); //30 min  timeStamp
});



//Encrypt thr Url or string also Decrypt the Url or String
//Download the offline videos, Create File , Remove File, Set the path
//CRUD Directory and File
app.run(function ($rootScope, $location, $interval, $cordovaToast, $cookieStore, $cordovaFile) {

    // Create Base64 Object

    var Base64 = {
        _keyStr: "ABCuvZaUVWXYNOklmnIdewPQRSTopqrsGHKLMt012345JfghijxyzDEFbc6789+/=",
        encode: function (r) {
            var t, e, o, a, h, n, c, d = "",
                C = 0;
            for (r = Base64._utf8_encode(r); C < r.length;) a = (t = r.charCodeAt(C++)) >> 2, h = (3 & t) << 4 | (e = r.charCodeAt(C++)) >> 4, n = (15 & e) << 2 | (o = r.charCodeAt(C++)) >> 6, c = 63 & o, isNaN(e) ? n = c = 64 : isNaN(o) && (c = 64), d = d + this._keyStr.charAt(a) + this._keyStr.charAt(h) + this._keyStr.charAt(n) + this._keyStr.charAt(c);
            return d
        },
        decode: function (r) {
            var t, e, o, a, h, n, c = "",
                d = 0;
            for (r = r.replace(/[^A-Za-z0-9+/=]/g, ""); d < r.length;) t = this._keyStr.indexOf(r.charAt(d++)) << 2 | (a = this._keyStr.indexOf(r.charAt(d++))) >> 4, e = (15 & a) << 4 | (h = this._keyStr.indexOf(r.charAt(d++))) >> 2, o = (3 & h) << 6 | (n = this._keyStr.indexOf(r.charAt(d++))), c += String.fromCharCode(t), 64 != h && (c += String.fromCharCode(e)), 64 != n && (c += String.fromCharCode(o));
            return c = Base64._utf8_decode(c)
        },
        _utf8_encode: function (r) {
            r = r.replace(/rn/g, "n");
            for (var t = "", e = 0; e < r.length; e++) {
                var o = r.charCodeAt(e);
                o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
            }
            return t
        },
        _utf8_decode: function (r) {
            for (var t = "", e = 0, o = c1 = c2 = 0; e < r.length;)(o = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(o), e++) : o > 191 && o < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), e += 3);
            return t
        }
    };


    // Encode the String
    $rootScope.encodedString = function (string) {

        return Base64.encode(JSON.stringify(string));
    }

    // Decode the String
    $rootScope.decodedString = function (string) {
        return JSON.parse(Base64.decode((string)));
    }

    $rootScope.createDir = function () {

        document.addEventListener('deviceready', function () {

            $cordovaFile.createDir(cordova.file.externalDataDirectory, "nomedia", false)
                .then(function (success) {
                    // success
                    ////alert(JSON.stringify(success));
                    return 'true';
                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    return 'false';
                });
        }, false);

    }
    $rootScope.createFile = function () {

        document.addEventListener('deviceready', function () {

            $cordovaFile.createFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt', true)
                .then(function (success) {
                    // success
                    value = success;
                    // //alert(JSON.stringify(success));

                    return value;

                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    value = error;
                    return value;

                });

        }, false);

        return value;

    }

    $rootScope.WriteFile = function (string) {

        document.addEventListener('deviceready', function () {
            $cordovaFile.writeFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt', string, true)
                .then(function (success) {
                    // success
                    ////alert(JSON.stringify(success));
                    return true;
                }, function (error) {
                    // error
                    ////alert(JSON.stringify(error));
                    return false;
                });
        }, false);

    };

    $rootScope.ReadFile = function (string) {
        // alert(string);
        // READ
        document.addEventListener('deviceready', function () {
            $cordovaFile.readAsText(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt')
                .then(function (success) {
                    // success
                    value = success;
                    // alert(JSON.stringify(success));

                    return value;

                }, function (error) {
                    // error
                    // alert(JSON.stringify(error));
                    value = error;
                    return error;

                });

        }, false);
        return value;
    };


    $rootScope.haveFile = '';
    $rootScope.CheckFile = function () {
        var IsExist = {};
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "nomedia/temp_0.txt",
            function (entries) {
                ////alert(JSON.stringify(entries.isFile));
                $rootScope.haveFile = JSON.stringify(entries.isFile);
            }
        )

    }


    $rootScope.RemoveFile = function (string) {

        // READ
        document.addEventListener('deviceready', function () {

            $cordovaFile.removeFile(cordova.file.externalDataDirectory + 'nomedia', 'temp_0.txt')
                .then(function (success) {
                    // success

                    // //alert(JSON.stringify(success));
                    return success;

                }, function (error) {
                    // error
                    // //alert(JSON.stringify(error));
                    return error;

                });

        }, false);
    };




});

//Generate the Random string throught out the Whole App
app.service('data', function ($rootScope) {

    var SetData = {};

    SetData.EncryptData = function (source) {
        return $rootScope.encodedString(source);
    };
    SetData.DecryptData = function (source) {
        return $rootScope.decodedString(source);
    };

    return SetData;
});


//End Written By Rajat Gupta//

//$httpProvider.defaults.headers.post['csrf_valid'] = '40d3dfd36e217abcade403b73789d732';
//$httpProvider.defaults.xsrfCookieName = 'csrftoken';
//$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


/* Service for loading image */
app.service('loading', function ($rootScope) {

    var process = {};
    var load = angular.element(document.querySelector('.loading-overlay'));
    process.active = function () {
        $('body').css('overflow', 'hidden');
        return load.removeClass('hide').addClass('show');

    };
    process.deactive = function () {
        $('body').css('overflow', 'auto');
        return load.removeClass('show').addClass('hide');

    };

    $rootScope.globalAction = function (callBack) {
        if (callBack) {
            $('body').css('overflow', 'auto');
            load.removeClass('show').addClass('hide');
            $rootScope.globalReaction = true;
        }
    }

    return process;
});
/* End of service for loading image */

/* Service for open popup */
app.service('model', function () {
    var process = {};
    var load = angular.element(document.querySelector('.obscure'));
    var title = angular.element(document.querySelector('.title'));
    var message = angular.element(document.querySelector('.message'));
    process.show = function (a, b) {
        title.html(a);
        message.html(b);
        return load.removeClass('hide').addClass('show');
    };
    process.hide = function () {
        return load.removeClass('show').addClass('hide');
    };
    return process;
});

/* End of Service for open popup */


/* Make a directive to allow only numbers on key press  */


app.directive('onlyNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                if (event.shiftKey) {
                    event.preventDefault();
                    return false;
                }
                ////console.log(event.which);
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers 0 to 9
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                }
                // else if ([110, 190].indexOf(event.which) > -1) {
                //     // dot and numpad dot
                //     return true;
                // }
                else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});


/* End  a directive to allow only numbers on key press  */


/* Make a directive to allow only Letters on key press  */

app.directive('onlyLetters', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^A-Za-z ]/g, '');
                // //console.log(transformedInput);
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


/* End a directive to allow only Letters on key press  */


/* Capital words of all inputs */
app.filter("ucwords", function () {
    return function (input) {
        if (input) { //when input is defined the apply filter
            input = input.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }
        return input;
    }
})
/* End filter*/

/* Making a directive for file upload*/

app.directive('fileUpload', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //console.log(files);
                //iterate files since 'multiple' may be specified on the element

                //emit event upward
                scope.$apply("fileSelected", {
                    file: files
                });

            });
        }
    };


});

app.directive('googleplace', function () {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function (scope, element, attrs, model, $scope, $rootScope) {
            var options = {
                types: [],
                componentRestrictions: {}
            };

            console.log(attrs.googleplace)

            // console.log(element[0])
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            //console.log(scope.gPlace);
            google.maps.event.addListener(scope.gPlace, 'place_changed',
                function () {
                    // console.log(scope.gPlace)
                    var place = scope.gPlace.getPlace();
                    console.log(place);

                    var components = place.formatted_address; // from Google API place object   
                    lat = place.geometry.location.lat();
                    lng = place.geometry.location.lng();

                    scope.$apply(function () {
                        model.$setViewValue(element.val());
                    });

                    if (attrs.googleplace == 'one') {

                        var myEl = angular.element(document.querySelector('#pickup_location'));
                        var myEl1 = angular.element(document.querySelector('#pickup_location_find'));
                        var store_lat = angular.element(document.querySelector('#store_lat'));
                        var store_lng = angular.element(document.querySelector('#store_lng'));

                        var e2 = components;

                        myEl.attr('ng-model', e2);
                        myEl1.attr('ng-model', e2);
                        store_lat.attr('ng-model', lat);
                        store_lng.attr('ng-model', lng);

                        myEl.val(e2).trigger('change');
                        myEl1.val(e2).trigger('change');
                        store_lat.val(lat).trigger('change');
                        store_lng.val(lng).trigger('change');

                        //var abc = angular.element(document.querySelector("#pickup_zipcode")).scope();
                        //abc.pickup_zipcode = '23';
                        // angular.element(document.querySelector("#pickup_zipcode")).val(components[6].short_name);
                    } else if (attrs.googleplace == 'two') {
                        var myE2 = angular.element(document.querySelector('#pickup_location'));


                        var e3 = components;

                        myE2.attr('ng-model', e3);
                        myE2.val(e3).trigger('change');
                    }

                });
        }
    };
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(ev) {
    var home = $("#containernew div:first-child").hasClass("homes");
    if (home) {
        if (confirm('Do You Want To Exit App!')) {

            navigator.app.exitApp();
        } else {
            $location.path('/login');
        }
    } else {
        sessionStorage.back = "";
        navigator.app.backHistory();
    }
}


app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});

app.directive("mwInputRestrict", [
    function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.on("keypress", function (event) {
                    if (attrs.mwInputRestrict === "onlynumbers") {
                        alert(event.charCode);
                        // allow only digits to be entered, or backspace and delete keys to be pressed
                        return (event.charCode >= 48 && event.charCode <= 57) || (event.keyCode === 8 || event.keyCode === 46);
                    }
                    return true;
                });
            }
        }
    }
]);
/*End a directive for file upload*/

/**
 * get the API Cart Values From One to Another
 * 
 */

