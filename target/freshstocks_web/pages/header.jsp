<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="" crossorigin="anonymous">
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>header page</title>
     <c:choose>
        <c:when test="${not empty loggedInEmail}">
            <!-- Include CSS for logged-in users -->
            <link rel="stylesheet" href="../assets/css/headerlog.css" />
        </c:when>
        <c:otherwise>
            <!-- Include CSS for not logged-in users -->
            <link rel="stylesheet" href="../assets/css/headernotlog.css" />
        </c:otherwise>
    </c:choose>
</head>
<body>

	<%
	String loggedInEmail = (String) session.getAttribute("loggedInEmail");

	if (loggedInEmail == null) {
	%>

    <div class="navbar">
        <a href="home.jsp"><img class="logo"
			src="../assets/images/Screenshot 2023-02-11 021952.png" alt=""></a>
        <div class="hamburger-icon" onclick="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <ul class="nav-links">
            <li><a href="userabout.jsp">About</a></li>
            <li><a href="marketdata.html">Market</a></li>
            <li><a href="live_trading.jsp">Trade</a></li>
            <li><a href="learn.jsp">Learn</a></li>
            <li><a href="userContact.jsp">Contact</a></li>
        </ul>
        <div class="login-signup">
        <form action="login.jsp">
            <button>Login</button></form>
            <form action="register.jsp"><button>Signup</button></form>
        </div>
    </div>

    <script>
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>

	<!-- nav end -->

	<%
	} else {
		
		String logInEmail = (String) session.getAttribute("loggedInemail");
		Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);
	%>
	
    <div class="navbar">
        <a href="home.jsp"><img class="logo"
			src="../assets/images/Screenshot 2023-02-11 021952.png" alt=""></a>
        <div class="hamburger-icon" onclick="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <ul class="nav-links">
            <li><a href="userabout.jsp">About</a></li>
            <li><a href="marketdata.html">Market</a></li>
            <li><a href="live_trading.jsp">Trade</a></li>
            <li><a href="learn.jsp">Learn</a></li>
            <li><a href="userContact.jsp">Contact</a></li>
        </ul>
       <div class="login-signup">
    <a href="userContact.jsp"><i class="fas fa-envelope"></i></a>&nbsp; <!-- Contact Icon -->
    <a href="userProfile.jsp"><img id="userProfile" src="<%= profileImg %>" alt="User Profile"></a> <!-- User Profile Icon -->
</div>
    </div>

    <script>
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        }
    </script>

	<%
	}
	%>

</body>
</html>