<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.fssa.freshstocks.model.*"%>
<%@ page import="com.fssa.freshstocks.services.*"%>
<%@ page import="com.fssa.freshstocks.services.exception.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.DecimalFormat"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin create-list</title>
<link rel="stylesheet" href="../assets/css/sellermain.css">
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Tilt+Neon&display=swap"
	rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/hint.css@2.7.0/hint.min.css"
	rel="stylesheet" integrity="">
<link rel="stylesheet" href="hint.css" />
</head>
<body>
	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} else {

		String loggedInEmail = (String) session.getAttribute("loggedInemail");
		Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");
		
		
		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);
	%>
	<nav>
		<div class="navbar">
			<img class="nav-logo"
				src="../assets/images/Screenshot 2023-02-11 021952.png" alt="">
			<span class="hint--bottom hint--info hint--rounded"
				aria-label="Search for Your Courses"><input class="search"
				type="text" placeholder="Search for courses,videos & Blogs"
				id="searchbar"></span>
			<div class="notification" id="notification-img">

				<div class="dropdown">
					<span class="hint--bottom hint--info hint--rounded"
						aria-label="notification"><img class="notificationimg"
						onclick="profile1()"
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
									<b>Chandru</b> promoted your answer
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
					<span class="hint--bottom hint--info hint--rounded"
						aria-label="Language Selector"><img class="notificationimg"
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

				<a id="notificationimg" href="contact.html"> <span
					class="hint--bottom hint--info hint--rounded"
					aria-label="Contact Support"><img class="notificationimg"
						src="../assets/images/icons8-online-support-50.png"
						alt="support-img"></span>
				</a>

			</div>
			<div class="notification">
				<span class="hint--bottom hint--info hint--rounded"
					aria-label="User Profile"><a class="dropdown" id="dropuser"
					href="userProfile.jsp"> 
					<img src="<%= profileImg %>" alt="profile Image" id="user-profile"/>
					</a></span>

			</div>

		</div>



		<div class="tab">
			<button class="tablinks active" onclick="homeon()">Home</button>
		</div>
		<div class="tab2">
			<span class="hint--right hint--info hint--rounded"
				aria-label="Add New Courses"><a class="addcourse-link"
				href="createCourse.jsp">Add Course</a></span>
		</div>

		<div class="tab4">
			<a class="logout" id="logout" href="../LogoutServlet">LogOut</a>
		</div>


	</nav>
	<main>


		<div class="bread-crumb">
			<div>
				<span class="slash">=></span> <a class="bread-crumb1" href="#">Admin
					Panel</a>
			</div>
			<span class="slash">/</span>
			<div>
				<a class="bread-crumb1" href="#">Home</a>
			</div>
			<span class="slash"></span>
		</div>


		<div>


			<div class="course-selection-div-videos">
				<h1 class="course-category">
					<br>&emsp;&emsp;Grow Your Money with Our Latest Courses
				</h1>
				<p class="course-desc">Take one of NSE's range of Our Latest
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex, futures, and Crytocurrencies. You'll learn how to trade in
					all assets and markets with using these courses...</p>
				<button class="course-btn">Explore Latest Courses</button>



				<div class="scroll-courses-div-stocks">




				</div>
			</div>
	</main>
	<%
	}
	%>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="../assets/js/sellerhome.js"></script>
	<script type="text/javascript"
		src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		integrity=""></script>
</body>
</html>