<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <title>Create Course Form</title>
    <link rel="stylesheet" href="../assets/css/createCourse.css"/>
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
        <label for="name">Course Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="coverImage">Cover Image URL:</label>
        <input type="text" id="coverImage" name="coverImage" required><br><br>
        
        <label for="timing">Timing:</label>
        <input type="text" id="timing" name="timing" required><br><br>
        
        <label for="language">Language:</label>
        <input type="text" id="language" name="language" required><br><br>
        
        <label for="markedPrice">Marked Price:</label>
        <input type="number" id="markedPrice" name="markedPrice" required><br><br>
        
        <label for="sellingPrice">Selling Price:</label>
        <input type="number" id="sellingPrice" name="sellingPrice" required><br><br>
        
        </div>
        <div>
             <label for="description">Description:</label><br>
        <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>
        
        <label for="instructorName">Instructor Name:</label>
        <input type="text" id="instructorName" name="instructorName" required><br><br>
        
        <label for="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" required><br><br>
        
        <label for="companyCategory">Company Category:</label>
        <input type="text" id="companyCategory" name="companyCategory" required><br><br>
        
        <label for="topSkills">Top Skills:</label>
        <input type="text" id="topSkills" name="topSkills" required><br><br>
        
        </div>
        </div>
        <button type="submit">Create Course</button>
    </form>
    	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>
</html>
    