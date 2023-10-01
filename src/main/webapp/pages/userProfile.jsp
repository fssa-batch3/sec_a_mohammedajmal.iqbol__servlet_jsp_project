<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="../assets/css/userprofile1.css">
</head>
<body id="body">

	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	}
	%>

   <header class="header" id="container">
   

   </header>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   <script src="../assets/js/userprofile1.js"></script>
</body>
</html>