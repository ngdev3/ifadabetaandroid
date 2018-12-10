<?php include 'header.php';?>

<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container no-padding">
			<ul class="nav navbar-nav top_header text-center">
			  
				<li class="page_name">
					<a href="#" class="text-left text-center">
						<p>Raise Ticket</p>
					</a>
				</li>
			  
			</ul>
			
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>
<!-- END HEADER -->
	

	<div class="container">
		<div class="login_form">
			<div class="form_container">
				<form class="mui-form">
				  
				  
				  <div class="mui-select col-sm-6 col-xs-12">
					<select id="order" required>
					  <option>Select</option>
					  <option>#111111</option>
					  <option>#222222</option>
					  <option>#333333</option>
					  <option>#444444</option>
					  <option>#555555</option>
					  <option>#666666</option>
					</select>
					<label for="order">Order Id</label>
				  </div>
				  <div class="mui-textfield  col-sm-6 col-xs-12">
					<input type="text" id="complaint" placeholder="Enter complaint type" required>
					<label for="complaint">Complaint Type</label>
				  </div>
				  <div class="mui-textfield contactmessage  col-sm-6 col-xs-12">
					<textarea rows="2" placeholder="Enter description"></textarea>
					<label>Description</label>
				  </div>
				  
				  <div class="submit_2btn col-xs-6 text-center">
					<a href="index.php">Send</a>
				  </div>
				  <div class="submit_2btn col-xs-6 text-center">
					<a href="index.php">Cancel</a>
				  </div>
				 
					
				</form>
			</div>
		</div>
	</div>
<!--  END Banner SLIDER -->

<?php include 'footer.php';?>