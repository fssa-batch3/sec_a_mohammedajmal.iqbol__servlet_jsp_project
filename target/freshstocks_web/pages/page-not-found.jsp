<%@ page isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Error Page</title>
<link rel="stylesheet" href="../assets/css/pagenotfound.css"/>
</head>
<body>

    	<!-- navbar start -->
	<div class="topnav" id="myTopnav">
		<a href="../index.html" class="active"><img class="nav-logo"
			src="../assets/images/Screenshot 2023-02-11 021952.png" alt=""></a>
		<div class="navlinks">
			<a href="javascript:void(0);" style="font-size: 15px;" class="icon"
				onclick="myFunction()">&#9776;</a> <a href="./pages/userabout.html"
				class="navlink">About</a> <a href="./pages/marketdata.html"
				class="navlink">Market</a> <a href="#" class="navlink">Trade</a> <a
				href="./learn.jsp" class="navlink">Learn</a> <a
				href="./pages/userContact.html" class="navlink">Contact</a> <a
				class="login1" href="#contact">
				<div class="notification">
					<form class="login1" action="pages/login.jsp">
						<button class="login" alt="">Log In</button>
					</form>
					</span>
				</div>
			</a> <a class="login2" href="#contact"><div class="notification">
					<span class="hint--left" aria-label="Sign Up / Register">
						<form action="pages/register.jsp">
							<button class="registration" alt="">FREE TRIAL</button>
						</form>
					</span>
				</div></a>
		</div>
	</div>


	<!-- nav end -->
	
	<img src="../assets/images/2488756.jpg" alt="error Image" class="errormessage" />
	
	<div style="margin-top:-85px;">
    <jsp:include page="footer.jsp" />
	</div>
	<script>
		function myFunction() {
			var x = document.getElementById("myTopnav");
			if (x.className === "topnav") {
				x.className += " responsive";
			} else {
				x.className = "topnav";
			}
		}
	</script>
</body>
</html>