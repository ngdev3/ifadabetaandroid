app.controller('address', function ($scope, $http, $location, $cookieStore, model, loading, $cordovaDialogs, $cordovaGeolocation, $rootScope,$route) {
    
    /**
     * This will check if user is registered with app or not , if not user will be redirected to login screen
     */
    if (!$cookieStore.get('userinfo')) {
        $location.path("/login");
         return false;
    }

    var GlobalUID = $cookieStore.get('userinfo').uid;  //UID used for getting data from http request
    
    

    $scope.toAddAddress = function(){
        $location.path("/address/add");
    }
    
    
    /**
     * Created By Nitin Kumar
     * Dated on 03/12/2018
     * Start of Function
     * function name : address_init
     * work on initialization and get the address list
     */
    $scope.address_init = function () {
        loading.active();

        var args = $.param({
            'user_id' : GlobalUID,
            // 'language_code' : 'en',
            'country_id' : sessionStorage.country
        })
        //Get the Address List from LocalAPI    

        $http({
            headers: {
                //'token': '40d3dfd36e217abcade403b73789d732',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            url: app_url + '/my_address',
            data : args   
        }).then(function (response) {
            //alert();
            loading.deactive();
            res = response;
            if(res.data.data.my_address.length > 0){
                $scope.address = res.data.data.my_address; 
            }
            // console.log($scope.address);return;
            res.data.data.my_address.map(function (x, key) {
                console.log(x);
                $cookieStore.put(x.id, x);
            })           
        })
    }

    // End of Address Initialization Function



    /**
     * created by Nitin
     * created on 03/12/2018
     * Function Name : edit_address
     * this function will show us the Edit Address Page
     */

    $scope.toEditAddress = function (id) {
        // alert(id);return;
        $cookieStore.put('aid',id);
        $location.path("/address/edit/:id=" + id);
        // console.log(ad_id);
    }

    // End of Edit Address Function



    /**
     * created by Nitin
     * created on 03/12/2018
     * Function Name : delete_address
     * this function will delete the address according to the id
     */

    $scope.delete_address = function (id) {
        
        // alert(id);return;

        var args = $.param({
            'user_id': GlobalUID,
            'address_id': id,
            language_code: sessionStorage.lang_code,
            'country_id' : sessionStorage.country
        });
        //var isConfirmed = confirm("Are you sure to delete this record ?");

        $.confirm({            
            title: 'Delete!',
            content: 'Are You Sure!',
            buttons: {  
                confirm: function () {     
                    loading.active();               
                    $http({                        
                        headers: {
                            //'token': '40d3dfd36e217abcade403b73789d732',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        url: app_url + '/delete_address',
                        data: args
                    }).then(function (response) {
                        loading.deactive();
                        // console.log(response);
                        if (response.data.data.status == "success") {
                            alert("Address Successfully Deleted");
                            $route.reload();
                        } else {
                            alert("Something went wrong.");
                        }
                    })
                },
                cancel: function () {
                    $.alert('Cancelled!');
                    $scope.address_init();
                }       
            }
        })

    }
    // End of Delete Address Function

    if($cookieStore.get("FullName")){
        $scope.fullName = $cookieStore.get("FullName").fullName;  
    }else{  
        if($cookieStore.get("userinfo")){
            $scope.fullName = $cookieStore.get("userinfo").fullName;
        }      
    }
});