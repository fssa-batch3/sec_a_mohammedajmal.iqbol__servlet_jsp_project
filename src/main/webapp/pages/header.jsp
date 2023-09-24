<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>header page</title>
     <c:choose>
        <c:when test="${not empty loggedInEmail}">
            <!-- Include CSS for logged-in users -->
            <link rel="stylesheet" href="../assets/css/headerlogged.css" />
        </c:when>
        <c:otherwise>
            <!-- Include CSS for not logged-in users -->
            <link rel="stylesheet" href="../assets/css/header.css" />
        </c:otherwise>
    </c:choose>
</head>
<body>

	<%
	String loggedInEmail = (String) session.getAttribute("loggedInEmail");

	if (loggedInEmail == null) {
	%>

	<!-- navbar start -->
	<div class="topnav" id="myTopnav">
		<a href="index.jsp" class="active"><img class="nav-logo"
			src="../assets/images/Screenshot 2023-02-11 021952.png" alt=""></a>
		<div class="navlinks">
			<a href="javascript:void(0);" style="font-size: 15px;" class="icon"
				onclick="myFunction()">&#9776;</a> <a href="./pages/userabout.jsp"
				class="navlink">About</a> <a href="./pages/marketdata.html"
				class="navlink">Market</a> <a href="#" class="navlink">Trade</a> <a
				href="#" class="navlink">Learn</a> <a
				href="./pages/userContact.jsp" class="navlink">Contact</a> <a
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

	<%
	} else {
		
		String logInEmail = (String) session.getAttribute("loggedInemail");
		Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);
	%>

	<nav>
		<div class="navbar">
			<img class="nav-logo"
				src="../assets/images/Screenshot 2023-02-11 021952.png" alt="">

			<div class="navlinks">
				<a href="./userabout.jsp" class="navlink">About</a>&emsp;
				<div class="dropdown">
					<a class="dropbtn" href="marketdata.html">Market</a>

				</div>
				<div class="dropdown">
					<a class="dropbtn" href="live_trading.html">Trade</a>

				</div>
				<div class="dropdown">
					<a class="dropbtn" href="learn.jsp">Learn</a> <a
						href="./userContact.jsp" class="navlink" id="contact">Contact</a>

				</div>



			</div>

			<!-- support images notification img start -->
			<div class="notification" id="notification-img">

				<div class="dropdown">
					<span class="hint--bottom hint--rounded" aria-label="Notifications"><img
						class="notificationimg" onclick="profile1()"
						src="../assets/images/icons8-notification-50.png"
						alt="notification-img"></span>
					<div class="dropdown-content-notification">
						<a><div class="notify-head">

								<h1 class="notify-user-h1">Notifications</h1>

							</div></a> <a href="#"><div class="notify-1">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Ajith</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-2">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Chnadru</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-1">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Kamalesh</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-2">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Durga</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-1">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Vanitha</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-2">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Vicky</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-1">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Susi kumar</b> promoted your answer
								</p>

							</div></a> <a href="#"><div class="notify-2">

								<img class="notify-user-img"
									src="../assets/images/icons8-male-user-48.png" alt="">
								<p class="notify-user-p">
									<b>Akshaya</b> promoted your answer
								</p>

							</div></a>
					</div>
				</div>

			</div>
			<div class="notification">
				<div class="dropdown1">
					<span class="hint--bottom hint--rounded"
						aria-label="Lnaguage Selector"><img class="notificationimg"
						onclick="profile1()"
						src="../assets/images/icons8-translator-50.png"
						alt="translator-img"></span>
					<div class="dropdown-content-lang">
						<br>
						<div id="google_translate_element" id="lang"></div>
					</div>
				</div>
			</div>
			<div class="notification">

				<a id="notificationimg" href="userContact.jsp"> <span
					class="hint--bottom hint--rounded" aria-label="Contact Support"><img
						class="notificationimg"
						src="../assets/images/icons8-online-support-50.png"
						alt="support-img"></span>
				</a>

			</div>

			<div class="notification">

				<!-- js code start userprofile -->
				<span class="hint--bottom hint--rounded" aria-label="User Profile"><a
					id="form" href="userProfile.jsp"> <img alt="profileImage"
						src="<%=profileImg%>" id="user-profile">
				</a></span>
			</div>

		</div>

		<hr>
	</nav>

	<!-- nav end -->

	<%
	}
	%>

</body>
</html>