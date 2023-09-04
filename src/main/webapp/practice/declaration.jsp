<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%! 
    int count = 0;  // declaring a variable
    
    public int incrementCount() {  // declaring a method
        return count++;
    }
    
%>


    The current count is: <%= incrementCount() %>
</body>
</html>