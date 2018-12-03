function openNav() {
	
    document.getElementById("mySidenav").style.width = "280px";
    //document.getElementById("main").style.marginLeft = "250px";
	//document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementById("main").style.width = "100%";
	$('.backdrop').css('display', 'block');
	$('body').css('overflow', 'hidden');
}
function closeNav() {
	if(event.target.id != 'asdf'){
		$("#mySidenav").attr('style','width=block');
		//document.getElementById("main").style.marginLeft= "0";
		$('body').css('overflow', 'auto');
		$('.backdrop').css('display', 'none');
		
	}
}



/* scroller nav*/

$(document).ready(function(){
	// Hide header on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// If scrolled down and past the navbar, add class .nav-up.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('header').removeClass('nav-up').addClass('nav-down');
			}
		}
	  
		lastScrollTop = st;
	}	
});


$(document).ready(function() {
	
	//  START Banner SLIDER 
	
	  var owl = $('.owl1');
	  owl.owlCarousel({
		nav: false,
		loop: true,
		autoplay:true,
		autoplayTimeout:5000,
		smartSpeed: 1000,
		dots: false,
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  });
	  
	  
	  //  START [Pulses _ Sub category Buttons] SLIDER 
	  
	  var owl1 = $('.owl2');
	  owl1.owlCarousel({
		margin: 10,
		nav: false,
		loop: false,
		autoplay:false,
		dots: false,
		autoWidth:true,
		responsive: {
		  0: {
			items: 4
		  },
		  600: {
			items: 4
		  },
		  1000: {
			items: 4
		  }
		}
	  });
	  	//  !. START [Pulses _ Sub category Buttons] SLIDER 
	  
	  //  Product Details Product Slider 
	  
	  var owl2 = $('.owl3');
	  owl2.owlCarousel({
		margin:10,
		nav: false,
		loop: true,
		autoplay:false,
		dots: true,
		/*autoWidth:true,*/
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  });
	  
	   //  !. Product Details Product Slider 

	  //  START boutique SLIDER 
	  
	  var owl3 = $('.owl4');
	  owl3.owlCarousel({
		margin: 0,
		nav: false,
		loop: true,
		autoplay:false,
		dots: false,
		responsive: {
		  0: {
			items: 2
		  },
		  600: {
			items: 2
		  },
		  1000: {
			items: 2
		  }
		}
	  });
	  
	  //  START product view SLIDER 
	  
	  var owl4 = $('.owl5');
	  owl4.owlCarousel({
		margin: 0,
		nav: false,
		loop: false,
		autoplay:false,
		dots: true,
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  });

});


//PROFILE IMAGE EDITOR
$(document).ready(function() {
	function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

$("#imgInp").change(function(){
    readURL(this);
}); 
});


// Cart ADd_Subs Button 

$(document).ready(function() {


	$(".add_cart_button > button").click(function(){
		$(this).parents(".add_cart_button").siblings().show();
		$(this).parents(".add_cart_button").hide();
		//$(this).parents(".add_item_container").append('<div class="add_item_button"><button class="less_item">-</button><input type="text" value="1" disabled=""><button class="add_item">+</button></div>')
	});
	
	var incrementPlus;
	var incrementMinus;

	var buttonPlus  = $(".add_item");
	var buttonMinus = $(".less_item");

	var incrementPlus = buttonPlus.click(function() {
	//alert("increment");
	var $n = $(this).siblings("input");
	$n.val(Number($n.val())+1 );
	});

	var incrementMinus = buttonMinus.click(function() {
	//alert("decrement");
	var $n = $(this)
	.siblings("input");
	var amount = Number($n.val());
	if (amount > 1) {
		$n.val(amount-1);
	}
	else if(amount == 1){
		//$(this).parents(".add_item_button").siblings().show();
		//$(this).parents(".add_item_button").hide();

		if ($(this).parents(".add_item_button").hasClass("cart-btn"))
		{
			//alert("2");
			$(this).parents(".deleted_item").remove();
		}
		else
		{
			//alert("1");
			$(this).parents(".add_item_button").siblings().show();
			$(this).parents(".add_item_button").hide();
		}
 	}

	});     
});




// location button click

$(document).ready(function() {
	$(".location_view").click(function(){
        $("#myLocation").modal();
    });
});


//wishlist icon
$(document).ready(function(){
	$(".wishlist-container .heart").click(function(){
		$(this).toggleClass("fa-heart-o");
		$(this).toggleClass("fa-heart");
		$(this).toggleClass("fill");
		
	});
});
   
//wishlist icon
$(document).ready(function(){
	$(".delete_item").click(function(){
		//alert("hello")
		$(this).parents(".deleted_item").remove();
	
		
	});
});

//add address checked radio
$(document).ready(function(){
	$(".addr_heading input").click(function(){
		//alert("hello")
		$(".addr_heading .radio label").css("color", "#a2a2a2");
		$(this).siblings("label").css("color", "#39a91c");
	
		
	});
});

//filter
function openFilter() {
	
    document.getElementById("mySidenav-right").style.left = "0";
    //document.getElementById("filter-header").style.left = "0";
    document.getElementById("main").style.width = "100%";
}

function closeFilter() {
	 document.getElementById("mySidenav-right").style.left = "100vw";
}

// Filter Accordian code

$(document).ready(function() {
	var acc = document.getElementsByClassName("accordion");
	var i;
	
	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		//$(this).siblings(acc).removeClass("selected");
		//$(this).siblings(".accordion-panel").css("max-height", "0px");
		this.classList.toggle("selected");
		var panel = this.nextElementSibling;
		var allPanel = $(this).siblings(".accordion-panel");
		if (panel.style.maxHeight){
		  
		  panel.style.maxHeight = null;
		} else {
			//allPanel.style.maxHeight = null;
		  panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	  });
	}
});
