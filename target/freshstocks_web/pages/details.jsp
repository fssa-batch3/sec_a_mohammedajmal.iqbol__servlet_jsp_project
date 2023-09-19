<%@page import="java.util.Collections"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.text.DecimalFormat"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.fssa.freshstocks.model.*"%>
<%@ page import="com.fssa.freshstocks.services.*"%>
<%@ page import="com.fssa.freshstocks.services.exception.*"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Course Details</title>
<link rel="stylesheet" href="../assets/css/details.css" />
</head>
<body>
	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} else {

		Integer loggedInUserId = (Integer) session.getAttribute("loggedInUserID");
		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserId);
	%>
	<nav>
		<div class="navbar">
			<img class="nav-logo"
				src="../assets/images/Screenshot 2023-02-11 021952.png" alt="">
			<span class="hint--bottom hint--rounded"
				aria-label="Search for Trading Courses"><input class="search"
				type="text" placeholder="Search for courses,videos & Blogs"
				id="searchbar"></span>
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
						aria-label="Language Selector"><img class="notificationimg"
						onclick="profile1()"
						src="../assets/images/icons8-translator-50.png"
						alt="translator-img"></span>
					<div class="dropdown-content-lang">
						<br>
						<div id="google_translate_element"></div>
					</div>
				</div>
			</div>
			<div class="notification">

				<a id="notificationimg" href="userContact.html"> <span
					class="hint--bottom hint--rounded" aria-label="Contact Support"><img
						class="notificationimg"
						src="../assets/images/icons8-online-support-50.png"
						alt="support-img"></span>
				</a>

			</div>
			<div class="notification">
				<span class="hint--bottom hint--rounded" aria-label="User Profile"><a
					class="dropdown" id="dropuser" href="userProfile.jsp"> <img
						id='dropusers' alt="profilepic" src="<%=profileImg%>">

				</a></span>

			</div>

		</div>

		<div class="tab">
			<marquee class="live-marquee-heading">LIVE COURSES ARE GOING TO
				START BY NOW. IT'S 100% FREE TO LEARN. JOIN TODAY TO LEARN MORE
				ABOUT TECHNICAL ANALYSIS AND WIN EXCITING ASSURE GIFTS FOR FREE</marquee>
		</div>


	</nav>


	<!-- nav end -->


	<%
	int courseId = Integer.parseInt(request.getParameter("courseID"));

	// Get the session and set the attribute
	session.setAttribute("loggedInCourseID", courseId);

	request.setAttribute("loggedInCourseID", courseId);
	CourseService courseService = new CourseService();
	Course course = null;

	try {
		course = courseService.getCoursesFromCourseId(courseId);
	} catch (ServiceException e) {
		e.printStackTrace();
	}

	if (course == null) {
	%>
	<p>No course details available.</p>
	<%
	} 
	}
	%>

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
		<script src="../assets/js/detail.js"></script>
		<script type="text/javascript"
			src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
			integrity=""></script>
		<!-- Google Translate API -->
		<script type="text/javascript"
			src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>
</html>
