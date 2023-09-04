<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="com.fssa.freshstocks.services.*"%>
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

String loggedInEmail = (String) session.getAttribute("loggedInemail");

if (loggedInEmail == null) { 

response.sendRedirect("login.html");

} else {

int loggedInseller = (int) session.getAttribute("loggedInseller");
 Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

 String dateOfBirthStr = (String) session.getAttribute("loggedIndateOfBirth");

 UserService userService = new UserService();
   String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);

%>


	<!-- Loading container -->
	<div id="loading" style="display: none;">
		<div class="loader">
			<video class="loader2" autoplay muted>
				<source
					src="../assets/website images/istockphoto-1300261742-640_adpp_is.mp4"
					type="video/mp4">
				<source
					src="../assets/website images/istockphoto-1300261742-640_adpp_is.mp4"
					type="video/ogg">
			</video>
		</div>
	</div>
	<!-- Loading container -->

	<div class="header">
		<form class="section-head" action="../UpdateUserServlet" method="POST">
			<div class="profilecontainer">
				<div>
					<img id="userprofile-img" src="<%= profileImg %>" alt="">
					<button class="delbtn" id="delbtn" type="button">
						<a href="../deleteUserServlet?userEmail=<%=loggedInEmail%>">
							DELETE PROFILE</a>
					</button>
					&nbsp;
					<button class="delUserProfile" id="delUserProfile" type="button">
						DELETE USER PROFILE PIC</a>
					</button>
					&nbsp;
					<button class="logout" id="logout" type="button">
						<a href="../LogoutServlet">LOG OUT</a>
					</button>
				</div>
				<div class="username-city">
					<h2 class="username"><%= session.getAttribute("loggedInusername") %></h2>
					<h5 class="useremail"><%= session.getAttribute("loggedInemail") %></h5>
				</div>
			</div>
			<div class="section2">
				<br>
			</div>
			<div class="section-about-head">
				<h1>About</h1>
				<div class="section-about">
					<div>
						<p class="labels">About Me</p>
						<textarea name="about" type="text" id="about">About Me</textarea>
						<br>
						<p class="labels">Type of User</p>
						<input name="typeOfUser" type="text" id="address"
							value="<% if (loggedInseller == 1) { %>Seller<% } else { %>Buyer<% } %>"
							disabled><br>
					</div>
					<div>
						<p class="labels">Date Of Birth</p>
						<input type="date" id="date" name="newDateOfBirth"
							value="<%= session.getAttribute("loggedIndateOfBirth") %>"><br>
						<p class="labels">Gender</p>
						<input name="newGender" type="text" id="gender"
							value="<%= session.getAttribute("loggedIngender") %>"><br>
						<input name="editprofile" type="file" id="editprofile"><br>
					</div>
					<div>
						<p class="labels">Mobile Number</p>
						<input type="number" id="number" name="newMobileNumber"
							value="<%= session.getAttribute("loggedInmobileNumber") %>"><br>
						<p class="labels">Age</p>
						<input name="age" type="number" id="age" disabled><br>
						<button type="submit" id="edit" name="edit">Update</button>
					</div>
				</div>
			</div>
		</form>
	</div>
	<% 
   }
    %>
	<script src="../assets/js/userprofile1.js"></script>
	<script>
    // Get the birth date string from the session attribute
    let dateOfBirthStr = "<%= session.getAttribute("loggedIndateOfBirth") %>
		";
		let calculatedAge = calculateAge(dateOfBirthStr);

		// Set the value of the input field
		document.getElementById("age").value = calculatedAge;
	</script>
</body>
</html>