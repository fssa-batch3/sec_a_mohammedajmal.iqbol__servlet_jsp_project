<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<title>Create Course Form</title>
<link rel="stylesheet" href="../assets/css/create-course.css" />
<link rel="stylesheet" href="../assets/css/loader1.css"/>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet" crossorigin="anonymous" integrity="">
</head>
<body>

	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} 
	%>
   <div class="overlay" id="overlay" style="display:none;"></div>
   <div class="loading" id="loader" style="display:none;">
	  <div class="loading-1"></div>
	  <div class="loading-2"></div>
	  <div class="loading-3"></div>
	  <div class="loading-4"></div>
	</div>
								
	<h1>Create Course Form</h1>

	<form id="createcourseform" onsubmit="createcourse(event)">
		<div class="contain">
			<div>
				<label for="name">Course Name:</label> <input type="text" id="name"
					name="name" value="Complete Stock Trading Course" required><br>
				<br> <label for="coverImage">Cover Image URL:</label> <input
					type="text" id="coverImage" name="coverImage"
					value="https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg"
					required><br> <br> <label for="timing">Timing:</label>
				<input type="text" id="timing" name="timing" value="15hrs" required><br>
				<br> <label for="language">Language:</label> <input type="text"
					id="language" name="language" value="Tamil" required><br>
				<br> <label for="markedPrice">Marked Price:</label> <input
					type="number" id="markedPrice" name="markedPrice" value="3999"
					required><br> <br> <label for="sellingPrice">Selling
					Price:</label> <input type="number" id="sellingPrice" name="sellingPrice"
					value="1999" required><br> <br>

			</div>
			<div>
				<label for="description">Description:</label><br>
				<textarea id="description" name="description" rows="4" cols="50"
					required>This is the Number One ranked Stock Trading course on Udemy.In this course, you will learn how to trade the Stock Market. It's a course designed for Complete Beginners and Intermediate market participants.We start off by covering basic concepts and work our way up to more advanced level material.</textarea>
				<br> <br> <label for="instructorName">Instructor
					Name:</label> <input type="text" id="instructorName" name="instructorName"
					value="Ajmal" required><br> <br> <label
					for="companyName">Company Name:</label> <input type="text"
					id="companyName" name="companyName" value="fresh trading" required><br>
				<br> <label for="companyCategory">Company Category:</label> <input
					type="text" id="companyCategory" name="companyCategory"
					value="Trading and Finance" required><br> <br> <label
					for="topSkills">Top Skills:</label> <input type="text"
					id="topSkills" name="topSkills"
					value="you will know about basics of stock market" required><br>
				<br>

			</div>
			    <div>
        <label for="courseVideo1">Course Video 1 :</label>
        <input type="file" id="courseVideo1" name="courseVideo1" accept="video/*" onchange="Main()" required ><br><br>

        <label for="courseVideo2">Course Video 2 :</label>
        <input type="file" id="courseVideo2" name="courseVideo2"  accept="video/*"  onchange="Main1()" required ><br><br>

        <label for="courseVideo3">Course Video 3 :</label>
        <input type="file" id="courseVideo3" name="courseVideo3"  accept="video/*" onchange="Main2()" required ><br><br>

        <label for="courseVideoName1">Course Video Name 1:</label>
        <input type="text" id="courseVideoName1" name="courseVideoName1" value="Investing Basics: forex" required><br><br>

        <label for="courseVideoName2">Course Video Name 2:</label>
        <input type="text" id="courseVideoName2" name="courseVideoName2" value="forex rules and Principles" required><br><br>

        <label for="courseVideoName3">Course Video Name 3:</label>
        <input type="text" id="courseVideoName3" name="courseVideoName3" value="Various forex terms" required><br><br>
    </div>
		</div>
		<button type="submit">Create Course</button>
	</form>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="../assets/js/createCourse.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>
</html>
