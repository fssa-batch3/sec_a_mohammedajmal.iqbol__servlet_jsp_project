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
<link rel="stylesheet" href="../assets/css/loader1.css"/>
 <link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet" crossorigin="anonymous" integrity="">
<style>
.required {
    color : #FF0000;
    font-size:20px;
}
</style>
</head>
<body>

	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} 
	%>
<div class="overlay" id="overlay"></div>
   <div class="loading" id="loader">
	  <div class="loading-1"></div>
	  <div class="loading-2"></div>
	  <div class="loading-3"></div>
	  <div class="loading-4"></div>
	</div>
	
<h1>Update Course Form</h1>
<form onsubmit="editcourse(event)" id="form">
<ul class="errorMessages" id="errormsg"></ul>
</form>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="../assets/js/editCourse.js"></script>
    	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>
</html>

