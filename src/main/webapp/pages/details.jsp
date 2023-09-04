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
		response.sendRedirect("login.html");
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
						id='dropusers' alt="profilepic" src="<%= profileImg %>">

				</a></span>

			</div>

		</div>

		<div class="tab">
			<div class="live-marquee-heading">LIVE COURSES ARE GOING TO
				START BY NOW. IT'S 100% FREE TO LEARN. JOIN TODAY TO LEARN MORE
				ABOUT TECHNICAL ANALYSIS AND WIN EXCITING ASSURE GIFTS FOR FREE</div>
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
	} else {

	double markedPrice = course.getMarkedPrice();
	double sellingPrice = course.getSellingPrice();
	double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

	DecimalFormat df = new DecimalFormat("#.00");
	%>


	<div class="heropage">


		<div class="heropage">
			<div class="breadcrumb">
				<a href="home.jsp" class="breadcrumblink">Home</a> <a
					href="learn.jsp" class="breadcrumblink">Learn</a> <a href="#"
					class="breadcrumblink">Details</a>
			</div>

			<div class="course-details">
				<p>Course Title :</p>
				<h1><%=course.getName()%></h1>


				<div class="course-detail-time">
					<p>
						<b>Course Timing</b> <br> <br><%=course.getTiming()%></p>
					<p>
						<b>Course Language</b> <br> <br><%=course.getLanguage()%></p>
					<p>
						<b>Students Intake</b> <br> <br>200 Per Batch
					</p>
					<p>
						<b>Course Cost</b> <br> <br>&emsp; &#8377;
						<%=course.getSellingPrice()%></p>



					<div>
						<div class="course-price" id="course-price">
							<p>
								<b>Course Cost</b> <br> <br>&#8377;
								<%=course.getSellingPrice()%></p>
							<br> <br>
							<p>
								<b>Course Old Cost</b> <br> <br> <strike>&#8377;
									<%=course.getMarkedPrice()%></strike>
							</p>
							<br> <br>
							<p>
								<b>Course Discount</b> <br> <br><%=df.format(discountPercentage)%>
								%
							</p>
						</div>
						<p id="course-days">
							<span><b>Days Left</b> <br> <br>30 days</span>&nbsp;left
							at this price!
						</p>

						<div class="buttons-div">

							<button class="add-to-cart" id="add-to-cart">Add to cart</button>
							<br>
							<button id="deletecourse" class="delete">Delete from My
								Courses</button>
							<br>
							<button id="deletebookmark" class="delete">Remove from
								Bookmark</button>
							<br> <a class="full-access-para" href="">Full Lifetime
								Access</a>
							<button class="share" id="share" onclick="share()">Share</button>
							<br>
							<button class="gift" onclick="gift()">Gift this course</button>
							<br>

						</div>
					</div>




				</div>

				<br>


				<div class="navlinks" id="navlinks">
					<a href="#about" class="link1">About</a> <a href="#instructor"
						class="link1">Instructor</a> <a href="#offered-by" class="link1">Offered
						By</a> <a href="#videos" class="link1">Videos</a> <a href="#comment"
						class="link1">Comments</a> <a href="../pages/userContact.html"
						class="link1">Contact</a>
				</div>



				<h1 class="learn-couse" id="about">About</h1>

				<h1 class="learn-couse">What you'll learn from this course</h1>

				<ul class="list-learnings">
					<h2 class="list-learning">Course Description</h2>
					<p class="course-desc"><%=course.getDescription()%></p>
					<br>
					<h2 class="list-learning">Top Skills You'll Learn</h2>
					<br>
					<div id="list-learn">

						<li class="list-learning"><%=course.getTopSkills()%>
				</ul>




				<ul class="list-learnings">
					<br>
					<h2 class="list-learning">Highlights</h2>
					<li class="list-learning">100% worth of money</li>
					<li class="list-learning">You will get a certificate once you
						completed the course</li>
					<li class="list-learning">You always get 24/7 Chat Support</li>
					<li class="list-learning">Participate the Live trading session</li>
				</ul>
				<br>



				<div class="instructorcontainer">
					<p class="learn-couse" id="instructor">Instructor</p>

					<div class="instructor-div">
						<div>
							<img src="<%=course.getCoverImage()%>" alt="" id="instruct-image">
						</div>
						<div class="letters-instuct">
							<a href="#" class="instruct-namelink"><h2><%=course.getInstructorName()%></h2></a>
							<p><%=course.getCompanyCategory()%></p>
							<p class="courses-add">
								<b>4</b> Courses
							</p>
						</div>

					</div>

				</div>





				<div class="offered-by" id="offered-by">
					<p class="learn-couse" id="about">Offered By</p>

					<div class="instructor-div">
						<div>
							<img src="<%=course.getCoverImage()%>" alt="" id="instruct-image">
						</div>
						<div class="letters-instuct">
							<a href="#" class="instruct-namelink"><h2><%=course.getCompanyName()%></h2></a>
							<p><%=course.getCompanyCategory()%></p>
							<p class="courses-add">
								<b>4</b> Courses
							</p>
						</div>

					</div>

				</div>


				<div class="offered-by-videos" id="videos">
					<p class="learn-couse" id="about1">Videos</p>


					<button class="accordion">Beginner's Module</button>
					<div class="panel">
						<a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 1</li></a><a class="quiz-btn"
							id="quiz1" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 2</li></a><a class="quiz-btn" id="quiz2" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 3</li></a><a class="quiz-btn"
							id="quiz3" href="">take quiz</a><br> <br>
					</div>

					<button class="accordion">Intermediate Module</button>
					<div class="panel">
						<a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 4</li></a><a class="quiz-btn"
							id="quiz4" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 5</li></a><a class="quiz-btn" id="quiz5" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 6</li></a><a class="quiz-btn"
							id="quiz6" href="">take quiz</a><br> <br>
					</div>

					<button class="accordion">Advanced Module</button>
					<div class="panel">
						<a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 7</li></a><a class="quiz-btn"
							id="quiz7" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 8</li></a><a class="quiz-btn" id="quiz8" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 9</li></a><a class="quiz-btn"
							id="quiz9" href="">take quiz</a><br> <br>
					</div>


				</div>


				<div class="offered-by" id="comment">
					<p class="learn-couse" id="about">Comments</p>

					<div class="what-you-learn">

						<form action="../AddCommentServlet" method="post">
							<span class="hint--bottom hint--rounded"
								aria-label="Use this textarea to Give Comments for this course">
								<textarea type="text" name="comment" id="comment-input"
									placeholder="comment here"></textarea>
							</span> <span class="hint--top hint--rounded"
								aria-label="Submit Your Comments"><button
									class="submit-comment" type="submit" id="submit-comment">Submit</button></span>
						</form>

						<div id="new-comments">
							<!-- comments div start -->


							<%
							CommentService commentService = new CommentService();
							List<Comment> comments = new ArrayList<>();

							try {
								comments = commentService.listComment(courseId);
							} catch (ServiceException e) {
								e.printStackTrace();
							}

							if (comments.isEmpty()) {
							%>
							<p style="margin-left: 50px; margin-top: 20px;">No comments
								currently available for this course.</p>
							<%
							} else {

							//placing new comments in the top
							Collections.reverse(comments);

							for (Comment comment : comments) {
							%>

							<div class="comment-1" id="comment-1">
								<div class="comment-img">
									<img class="profile-img_block" id="profile-pic"
										src="<%=comment.getUserProfile()%>">
									<p class="comment-letters" id="comment-letters"><%=comment.getComment()%></p>
									&emsp;
									<p class="datenow"><%=comment.getCreatedTime()%></p>

									<%
									int loggedInUserID = (int) session.getAttribute("loggedInUserID");
									int commentUserID = comment.getUserId(); // The ID of the user who posted the comment

									if (loggedInUserID == commentUserID) {

										session.setAttribute("commentId", comment.getCommentId());
									%>
									<a href="editcomment.jsp?commentId=<%=comment.getCommentId()%>"
										style="display: inline-block; padding: 5px 16px; /* Adjust padding as needed */ background-color: #007bff; /* Blue background color */ color: #fff; /* White text color */ text-decoration: none; /* Remove underlines from links */ border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 20px;">Edit</a>
									<a
										href="../DeleteCommentServlet?commentId=<%=comment.getCommentId()%>"
										style="display: inline-block; padding: 5px 16px; /* Adjust padding as needed */ background-color: red; /* Blue background color */ color: #fff; /* White text color */ text-decoration: none; /* Remove underlines from links */ border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 0px;">Delete</a>
									<%
									} else {
									%>
									<button style="display: none;">Edit</button>
									<button style="display: none;">Delete</button>
									<%
									}
									%>

								</div>
							</div>
							<%
							}
							}
							%>

						</div>
						<!-- comments div end -->
						<br> <br> <br> <br>

					</div>

				</div>


			</div>


		</div>
		<div class="heropage2">
			<img src="<%=course.getCoverImage()%>" alt="" id="course-image">
		</div>
	</div>

	<div class="course-container">

		<div class="course">

			<div class="course-div">
				<button class="add-to-cart" id="add-to-cart">Add to cart</button>
				<br>
				<button id="deletecourse" class="delete">Delete from My
					Courses</button>
				<br>
				<button id="deletebookmark" class="delete">Remove from
					Bookmark</button>
				<br> <a class="full-access-para" href="">Full Lifetime
					Access</a>
				<div>
					<button class="share" id="share" onclick="share()">Share</button>
					<br>
					<button class="gift" onclick="gift()">Gift this course</button>
					<br>
				</div>
			</div>
		</div>




		<div class="share-div" id="share-div" style="display: none;">
			<h1 class="share-h1">Share The Course</h1>
			<p class="share-p">
				You can Share this Course to your friends and relatives<br>
				through these Social Media or using this link to get the course
			</p>
			<div class="social-media">
				<a href="https://www.google.com/"><img class="google"
					src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
					alt=""></a> <a href="https://www.facebook.com/"><img
					class="facebook"
					src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
					alt=""></a> <a href="https://www.instagram.com/"><img
					class="instagram"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
					alt=""></a> <a href="https://twitter.com/home"><img
					class="instagram"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&amp;usqp=CAU"
					alt=""></a> <a href="https://mail.google.com/mail/u/0/#inbox"><img
					class="instagram"
					src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI"
					alt=""></a>
			</div>
			<p class="share-p">
				<b>Or Use the link to share the Course</b>
			</p>
			<input class="link-input" id="link-input" type="text" name=""
				value="" disabled="">
			<button class="share-p" id="back" onclick="back()">Back</button>
		</div>


		<div class="gift-div" id="gift-div" style="display: none;">
			<h1 class="share-h1">Gift The Course</h1>
			<p class="share-p">
				You can Gift this Course to your friends and relatives<br>
				through these Social Media or using this link to get the course for
				free
			</p>
			<div class="social-media">
				<a href="https://www.google.com/"><img class="google"
					src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
					alt=""></a> <a href="https://www.facebook.com/"><img
					class="facebook"
					src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
					alt=""></a> <a href="https://www.instagram.com/"><img
					class="instagram"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
					alt=""></a> <a href="https://twitter.com/home"><img
					class="instagram"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&amp;usqp=CAU"
					alt=""></a> <a href="https://mail.google.com/mail/u/0/#inbox"><img
					class="instagram"
					src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI"
					alt=""></a>
			</div>
			<p class="share-p">
				<b>Or Use the link to Gift the Course</b>
			</p>
			<input class="link-input" id="link-input1" type="text" name=""
				value="" disabled="">
			<button class="share-p" id="back" onclick="giftback()">Back</button>
		</div>


		<!-- edit new tab -->

		<form class="edit-comment" id="edit-comment"
			action="../EditCommentServlet" style="display: none;" method="post">
			<h1 class="share-h1">Edit Comment</h1>
			<input class="comment-input" id="comment-edit" type="text"
				name="comment" placeholder="  Enter a new Comment"> <input
				type="hidden" name="commentId" value="${commentId}" />
			<button class="share-p" id="submit-edit" onclick="submitedit()"
				type="submit">Submit</button>
			<button class="share-p" id="back" onclick="backedit()">Back</button>
		</form>

		<%
		}
		}
		%>

		<script src="../assets/js/detail.js"></script>
		<script type="text/javascript"
			src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
			integrity=""></script>
		<!-- Google Translate API -->
		<script type="text/javascript"
			src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>
</html>
