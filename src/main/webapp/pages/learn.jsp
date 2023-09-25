<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
<title>Learn</title>
<link rel="stylesheet" href="../assets/css/learn.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Tilt+Neon&display=swap"
	rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/hint.css@2.7.0/hint.min.css"
	integrity="" rel="stylesheet">
<link rel="stylesheet" href="hint.css" />
<link rel="stylesheet" href="../assets/css/loader1.css"/>
</head>

<body>
	<% 
   
   if(session.getAttribute("loggedInemail") == null) {
        response.sendRedirect("login.jsp");
     } else {
   
   String loggedInEmail = (String) session.getAttribute("loggedInemail");
   Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

   UserService userService = new UserService();
   String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);

    %>
    
   <div class="overlay" id="overlay"></div>
   <div class="loading" id="loader">
	  <div class="loading-1"></div>
	  <div class="loading-2"></div>
	  <div class="loading-3"></div>
	  <div class="loading-4"></div>
	</div>
	
	
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
						<div id="google_translate_element" id="lang"></div>
					</div>
				</div>
			</div>
			<div class="notification">

				<a id="notificationimg" href="contact.html"> <span
					class="hint--bottom hint--rounded" aria-label="Contact Support"><img
						class="notificationimg"
						src="../assets/images/icons8-online-support-50.png"
						alt="support-img"></span>
				</a>

			</div>
			<div class="notification">
				<span class="hint--bottom hint--rounded" aria-label="User Profile"><a
					class="dropdown" id="dropuser" href="userProfile.jsp"> 
					<img alt="profileImage" src="<%=profileImg%>" id="user-profile">
					</a></span>
               
			</div>

		</div>

		<div class="tab">
			<button class="tablinks active" id="tab-courses" onclick="homeon()">All
				Courses</button>
			<button class="tablinks" onclick="openCity(event, 'free-courses')">Free
				Courses</button>
			<button class="tablinks" onclick="openCity(event, 'live-courses')">Live
				Courses</button>
			<svg height="100" width="100" class="blinking">
        <circle cx="50" cy="50" r="10" fill="red" />
      </svg>
			<button class="tablinks" onclick="openCity(event, 'latest-courses')">&emsp;Latest
				Courses</button>
			<button class="tablinks" onclick="openCity(event, 'my-courses')">My
				Courses</button>
			<button class="tablinks" onclick="openCity(event, 'blogs')">Blogs</button>
			<button class="tablinks" onclick="openCity(event, 'youtube-videos')">Youtube
				Videos</button>
			<button class="tablinks" onclick="openCity(event, 'bookmarks')">Bookmarks</button>


		</div>
	</nav>
	<main>

		<div class="bread-crumb">
			<div>
				<span class="slash">=></span> <a class="bread-crumb1"
					href="../pages/userHome.html">Home</a>
			</div>
			<span class="slash">/</span>
			<div>
				<a class="bread-crumb1">Learn</a>
			</div>
		</div>


		<div id="default">


			<div class="course-selection-div">
				<h1 class="course-category">
					<br>&emsp;&emsp;Grow Your Money with Our Courses
				</h1>
				<p class="course-desc">Take one of NSE's range of Our Latest
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex, futures, and Crytocurrencies. You'll learn how to trade in
					all assets and markets with using these courses...</p>
				<button class="course-btn">Explore All Courses</button>


				<div class="scroll-courses-div-stocks">



					<%
					CourseService courseService = new CourseService();
					List<Course> courses = new ArrayList<>();

					try {
						courses = courseService.getAllCourses();
					} catch (ServiceException e) {
						e.printStackTrace();
					}

					if (courses.isEmpty()) {
					%>
					<p>No courses available.</p>
					<%
					} else {

					// Reverse the list of courses
					Collections.reverse(courses);

					for (Course course : courses) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
					<a class="first-course2-stocks" href="details.jsp?courseID=<%=course.getCourseID()%>">
						<div>
							<img class="course-img-stocks" src="<%=course.getCoverImage()%>"
								alt="">
						</div>
						<div>
							<h3 class="course-title"><%=course.getName()%></h3>
							<p class="course-description"><%=course.getDescription()%></p>
							<div class="course-details">
								<p class="course-timing">
									<span class="timing">Timing:</span>
									<%=course.getTiming()%></p>
								<p class="course-ln">
									<span class="lang">Language:</span>
									<%=course.getLanguage()%></p>
							</div>
							<div class="flexcost">
								<p class="course-cost">
									fresh Price: &#8377;<%=course.getSellingPrice()%></p>
								<p>
									Old Price: <strike class="course-oldcost">&#8377;<%=course.getMarkedPrice()%></strike>
								<p>
								<p class="course-discount">
									Discount:
									<%=df.format(discountPercentage)%>%
								</p>
							</div>
							<br>
						</div>
					</a>
					<%
					}
					}
					%>

				</div>
			</div>




		</div>


		<div id="live-courses" class="tabcontent">


			<div class="course-selection-div-videos">
				<h1 class="course-category">
					<br>&emsp;&emsp;Explore Our Variety of Live Courses
				</h1>
				<p class="course-desc">Take one of NSE's range of Market Trading
					Videos and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex and Crytocurrencies. You'll learn how to trade in all assets
					and markets using our Videos...</p>
				<button class="course-btn">Explore Learing Videos</button>


				<div class="scroll-courses-div-videos"></div>
			</div>
			<!-- videos end -->




		</div>

		<div id="free-courses" class="tabcontent">


			<div class="course-selection-div-videos">
				<h1 class="course-category">
					<br>&emsp;&emsp;Grow Your Money with Our free Courses
				</h1>
				<p class="course-desc">Take one of NSE's range of Our Latest
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex, futures, and Crytocurrencies. You'll learn how to trade in
					all assets and markets with using these courses...</p>
				<button class="course-btn">Explore Latest Courses</button>



				<div class="scroll-courses-div">
				
				
									<%
					CourseService courseService1 = new CourseService();
					List<Course> courses1 = new ArrayList<>();

					try {
						courses1 = courseService1.getFreeCourses();
					} catch (ServiceException e) {
						e.printStackTrace();
					}

					if (courses1.isEmpty()) {
					%>
					<p>No courses available.</p>
					<%
					} else {

					// Reverse the list of courses
					Collections.reverse(courses1);

					for (Course course : courses1) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
					<div class="first-course2-stocks">
						<div>
							<img class="course-img-stocks" src="<%=course.getCoverImage()%>"
								alt="">
						</div>
						<div>
							<h3 class="course-title"><%=course.getName()%></h3>
							<p class="course-description"><%=course.getDescription()%></p>
							<div class="course-details">
								<p class="course-timing">
									<span class="timing">Timing:</span>
									<%=course.getTiming()%></p>
								<p class="course-ln">
									<span class="lang">Language:</span>
									<%=course.getLanguage()%></p>
							</div>
							<div class="flexcost">
								<p class="course-cost">
									fresh Price: &#8377;<%=course.getSellingPrice()%></p>
								<p>
									Old Price: <strike class="course-oldcost">&#8377;<%=course.getMarkedPrice()%></strike>
								<p>
								<p class="course-discount">
									Discount:
									<%=df.format(discountPercentage)%>%
								</p>
							</div>
							<br>
						</div>
					</div>
					<%
					}
					}
					%>
				
				
				</div>
			</div>


		</div>
		<div id="youtube-videos" class="tabcontent">

			<div class="course-selection-div-latestcourses">
				<h1 class="course-category">
					<br>&emsp;&emsp;Grow Your Money with Our Wide Range of Youtube Videos
				</h1>
				<p class="course-desc">Take one of NSE's range of Our Latest
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex, futures, and Crytocurrencies. You'll learn how to trade in
					all assets and markets with using these courses...</p>
				<button class="course-btn">Explore Our Youtube Videos</button>


				<div class="scroll-courses-div-youtube"></div>
			</div>


		</div>
		<div id="latest-courses" class="tabcontent">

			<div class="course-selection-div-latestcourses">
				<h1 class="course-category">
					<br>&emsp;&emsp;Grow Your Money with Our Latest Courses
				</h1>
				<p class="course-desc">Take one of NSE's range of Our Latest
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex, futures, and Crytocurrencies. You'll learn how to trade in
					all assets and markets with using these courses...</p>
				<button class="course-btn">Explore All Courses</button>

				<div class="scroll-courses-div5">
				
				
				<%
					CourseService courseService2 = new CourseService();
					List<Course> courses2 = new ArrayList<>();

					try {
						courses2 = courseService2.getLatestCourses();
					} catch (ServiceException e) {
						e.printStackTrace();
					}

					if (courses2.isEmpty()) {
					%>
					<p>No courses available.</p>
					<%
					} else {

					for (Course course : courses2) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
					<div class="first-course2-stocks">
						<div>
							<img class="course-img-stocks" src="<%=course.getCoverImage()%>"
								alt="">
						</div>
						<div>
							<h3 class="course-title"><%=course.getName()%></h3>
							<p class="course-description"><%=course.getDescription()%></p>
							<div class="course-details">
								<p class="course-timing">
									<span class="timing">Timing:</span>
									<%=course.getTiming()%></p>
								<p class="course-ln">
									<span class="lang">Language:</span>
									<%=course.getLanguage()%></p>
							</div>
							<div class="flexcost">
								<p class="course-cost">
									fresh Price: &#8377;<%=course.getSellingPrice()%></p>
								<p>
									Old Price: <strike class="course-oldcost">&#8377;<%=course.getMarkedPrice()%></strike>
								<p>
								<p class="course-discount">
									Discount:
									<%=df.format(discountPercentage)%>%
								</p>
							</div>
							<br>
						</div>
					</div>
					<%
					}
					}
					%>
				
				
				
				</div>
			</div>


		</div>
		<div id="blogs" class="tabcontent">

			<div class="blogs-selection-div">
				<h1 class="course-category">
					<br>&emsp;&emsp;Explore Our Variety of Blogs Posted By
					Proffessional Traders
				</h1>
				<p class="course-desc">Take one of NSE's range of Market Trading
					Blogs and learn how to trade using this incredibly useful tips. Its
					simple logic and readability makes trading perfect for Stocks,
					forex and Crytocurrencies. You'll learn how to trade in all assets
					and markets using our Blogs...</p>
				<button class="course-btn">Explore Our Blogs</button>


				<div class="scroll-courses-div4"></div>
			</div>


		</div>

		<div id="my-courses" class="tabcontent">

			<div class="blogs-selection-div">
				<h1 class="course-category">
					<br>&emsp;&emsp;Explore the Courses Bought By You
				</h1>
				<p class="course-desc">Take one of NSE's range of Market Trading
					Blogs and learn how to trade using this incredibly useful tips. Its
					simple logic and readability makes trading perfect for Stocks,
					forex and Crytocurrencies. You'll learn how to trade in all assets
					and markets using our Blogs...</p>
				<button class="course-btn">Explore Our Blogs</button>


				<div class="scroll-courses-div-mycourses"></div>
			</div>


		</div>


		<div id="bookmarks" class="tabcontent">

			<div class="course-selection-div-videos">
				<h1 class="course-category">
					<br>&emsp;&emsp;Explore Your Recent Bookmarks
				</h1>
				<p class="course-desc">Take one of NSE's range of Market Trading
					courses and learn how to trade using this incredibly useful tips.
					Its simple logic and readability makes trading perfect for Stocks,
					forex and Crytocurrencies. You'll learn how to trade in all assets
					and markets using our Blogs...</p>
				<button class="course-btn">Your Recent Bookmarks</button>


				<div class="scroll-bookmarks-div4"></div>
			</div>
	</main>

<%
}
%>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<!-- <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> -->
	<script src="../assets/js/learn.js"></script>
	<script type="text/javascript"
		src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		integrity=""></script>

</body>
</html>