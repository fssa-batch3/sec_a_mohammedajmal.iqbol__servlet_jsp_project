<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<!-- This is how you write comments in JSP -->
	
	<!--  Example of JSP Declaration -->
	<%!public String getMessage() {
		return "Success";
	}%>
	
	<!--  Example of Scriptlet -->
	<%
	String message = "Success";
	%>
	
	<!-- Expressions -->
	<%=message%>
	<%=getMessage()%>
</body>
</html>