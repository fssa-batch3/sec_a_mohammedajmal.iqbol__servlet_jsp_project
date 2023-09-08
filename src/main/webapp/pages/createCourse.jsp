<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<title>Create Course Form</title>
<link rel="stylesheet" href="../assets/css/createCourse.css" />
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet" crossorigin="anonymous" integrity="">
</head>
<body>

	<h1>Create Course Form</h1>

	<form action="../CreateCourseServlet" method="post">
		<%
		String errormsg = request.getParameter("error");
		if (errormsg != null) {
		%>
		<div class="alert alert-danger" role="alert">
			<%=errormsg%>
		</div>
		<%
		}
		%>
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
		</div>
		<button type="submit">Create Course</button>
	</form>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>
</html>
