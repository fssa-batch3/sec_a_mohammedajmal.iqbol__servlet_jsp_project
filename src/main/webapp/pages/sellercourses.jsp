<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Seller Page</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/loader1.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="" crossorigin="anonymous">
    <style>
        .card {
            height: 100%;
        }
        .card-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        .card-text {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 3.6em;
        }
        .price {
        display :flex;
        gap:20px;
        }
        
         #addNewCourse {
              margin-top: 50px;
        }
        
            
           #userProfile {
    width: 40px; /* Set the desired width */
    height: 40px; /* Set the desired height */
    border-radius: 50%; /* Optional: Add a rounded border for a circular effect */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
}

.navbar-nav i {
    font-size: 35px;
    color: dodgerblue;
    margin-left: 20px;
    cursor: pointer;
    margin-top:7px;
}

.navbar-nav {
  display:flex;
  gap:20px;
}

.navbar {
 border-bottom:1px solid grey;
}
    </style>
</head>
<body>

<%

   if(session.getAttribute("loggedInemail") == null) {
        response.sendRedirect("login.jsp");
     } else {
   
   String loggedInEmail = (String) session.getAttribute("loggedInemail");
   Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

   UserService userService = new UserService();
   String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);

    %>
    
    <div class="overlay" id="overlay"></div>
   <div class="loading" id="loader">
	  <div class="loading-1"></div>
	  <div class="loading-2"></div>
	  <div class="loading-3"></div>
	  <div class="loading-4"></div>
	</div>


<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <a class="navbar-brand mr-auto" href="#"><img src="../assets/images/Screenshot 2023-02-11 021952.png" alt="Logo" height="55" width="169"></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="sellerhome.jsp">Home</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="sellercourses.jsp">Courses <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="userContact.jsp">Contact</a>
            </li>
        </ul>
    </div>
    <div class="navbar-nav ml-auto">
    <a href="userContact.jsp"><i class="fas fa-envelope"></i></a>&nbsp; <!-- Contact Icon -->
    <a href="userProfile.jsp"><img id="userProfile" src="<%= profileImg %>" alt="User Profile"></a> <!-- User Profile Icon -->
    </div>
    </nav>
    
<!-- Product Listings -->
<div class="container mt-5" id="nav">
 <div class="text-left mb-3">
        <a class="btn btn-success" id="addNewCourse" href="createCourse.jsp">Add New Course</a>
    </div>
    <div class="row">


    </div>
</div>

<%
     }
%>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="../assets/js/sellerhome.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>
</html>
    