<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Seller Dashboard</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="" crossorigin="anonymous">
    <style>
    
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

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white">
    <a class="navbar-brand mr-auto" href="#"><img src="../assets/images/Screenshot 2023-02-11 021952.png" alt="Logo" height="55" width="169"></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="sellerhome.jsp">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="sellercourses.jsp">Courses</a>
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

<!-- Sales Overview -->
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6">
            <h2>Courses Sold</h2>
            <canvas id="salesChart"></canvas>
        </div>
        <div class="col-md-6">
            <h2>Revenue from Sales</h2>
            <canvas id="revenueChart"></canvas>
        </div>
        <div class="col-md-6 mt-4">
            <h2>Highest Sale</h2>
            <canvas id="mostPopularChart"></canvas>
        </div>
        <div class="col-md-6 mt-2">
            <h2>Lowest Sale</h2>
            <canvas id="leastPopularChart"></canvas>
        </div>
    </div>
</div>

<%
}
%>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="../assets/js/sellerhomepage.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>
</html>
    