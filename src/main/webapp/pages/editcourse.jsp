<%@page import="com.fssa.freshstocks.model.Course"%>
<%@page import="com.fssa.freshstocks.services.CourseService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="../assets/css/editcourses.css"/>
 <link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet" crossorigin="anonymous" integrity="">
</head>
<body>
<h1>Update Course Form</h1>
<form action="../SaveCourseServlet" method="post">
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
    <%
    int courseId = Integer.parseInt(request.getParameter("courseId"));
    CourseService courseService = new CourseService();
       Course course1 = courseService.getCoursesFromCourseId(courseId);
    %>
    <input type="hidden" name="courseId" value="<%= courseId %>" />
    <label for="updatedCoverImage">Updated Cover Image:</label>
    <input type="text" id="updatedCoverImage" name="updatedCoverImage" value="<%= course1.getCoverImage() %>"><br>
    
    <label for="updatedTiming">Updated Timing:</label>
    <input type="text" id="updatedTiming" name="updatedTiming" value="<%= course1.getTiming() %>"><br>
    
    <label for="updatedLanguage">Updated Language:</label>
    <input type="text" id="updatedLanguage" name="updatedLanguage" value="<%= course1.getLanguage() %>"><br>
    
    <label for="updatedMarkedPrice">Updated Marked Price:</label>
    <input type="text" id="updatedMarkedPrice" name="updatedMarkedPrice" value="<%= course1.getMarkedPrice() %>"><br>
    
    <label for="updatedSellingPrice">Updated Selling Price:</label>
    <input type="text" id="updatedSellingPrice" name="updatedSellingPrice" value="<%= course1.getSellingPrice() %>"><br>
         </div>
        <div>
    <label for="updatedDescription">Updated Description:</label>
    <textarea id="updatedDescription" name="updatedDescription"><%= course1.getDescription() %></textarea><br>
   
    <label for="updatedInstructorName">Updated Instructor Name:</label>
    <input type="text" id="updatedInstructorName" name="updatedInstructorName" value="<%= course1.getInstructorName() %>"><br>
    
    <label for="updatedCompanyName">Updated Company Name:</label>
    <input type="text" id="updatedCompanyName" name="updatedCompanyName" value="<%= course1.getCompanyName() %>"><br>
    
    <label for="updatedCompanyCategory">Updated Company Category:</label>
    <input type="text" id="updatedCompanyCategory" name="updatedCompanyCategory" value="<%= course1.getCompanyCategory() %>"><br>
    
    <label for="updatedTopSkills">Updated Top Skills:</label>
    <input type="text" id="updatedTopSkills" name="updatedTopSkills" value="<%= course1.getTopSkills() %>"><br>
    <br>
     </div>
        </div>
    <button type="submit">Save Changes</button>
</form>
    	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>
</html>

