<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Course Details Page</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="../assets/css/loader1.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS -->
    <style>
        body {
            background-color: #f0f8ff; /* Light Blue */
            font-size: 16px;
        }

        .cover-image {
            max-height: 300px;
            width: 100%;
            object-fit: cover;
        }

        .course-title {
            font-size: 2em;
            font-weight: bold;
        }

        .course-details li {
            list-style-type: none;
            margin-bottom: 10px;
        }

        .course-cost {
            font-size: 1.5em;
            color: green;
        }

        .course-old-cost {
            text-decoration: line-through;
            font-size: 1em;
            color: #888;
        }

        .course-discount {
            font-size: 1.5em;
            color: #d9534f;
        }

        .instructor-details {
            margin-top: 20px;
        }

        .instructor-name {
            font-size: 1.5em;
            font-weight: bold;
        }

        .instructor-description {
            font-size: 1.2em;
            color: #888;
        }

        .video-accordion .card-header {
            cursor: pointer;
            font-size: 1.2em;
            background-color: #f8f9fa; /* Light Gray */
        }

        .video-accordion .card-body {
            display: none;
            font-size: 1em;
        }
        
        .comments {
            height:600px;
            overflow-y: scroll;
        }
        
        .comments::-webkit-scrollbar {
	display: none;
}
        

        .comments-section {
            margin-top: 20px;
        }

        .comment {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }

        .comment-box {
            width: calc(100% - 22px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
            resize: vertical;
        }
        
.submit-comment {
	position: relative;
	top: -15px;
	    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.submit-comment:hover {
	transform: scale(1.05);
}

.datenow {
	font-family: sans-serif;
	margin-top:15px;
	margin-left:15px;
}

.comment-1 {
	width: 90%;
	/* height:50px; */
	border-radius: 5px;
	background-color: beige;
	color: black;
	margin-left: 50px;
	margin-top: 10px;
}

.comment-letters {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 18px;
}

.comment-time {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 15px;
	width: 20px;
	height: 20px;
}

.comment-edit-delete1_none, .comment-edit-delete2_none {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 10px;
	width: 70px;
	height: 30px;
	display: none;
}

.comment-edit-delete1_block, .comment-edit-delete2_block {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 10px;
	width: 70px;
	height: 30px;
	display: block;
}

.comment-edit {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 10px;
	width: 200px;
	height: 20px;
	display: none;
}

.comment-edit-delete3 {
	font-size: 18px;
	font-family: sans-serif;
	margin-left: 30px;
	position: relative;
	top: 10px;
	width: 100px;
	height: 30px;
	display: none;
}

#new-comments {
	height: 600px;
	overflow-y: scroll;
}

#new-comments::-webkit-scrollbar {
	display: none;
}

.profile-img_none {
	width: 30px;
	height: 30px;
	margin-left: 20px;
	margin-top: 10px;
	border-radius: 50%;
	display: none;
}

.profile-img_block {
	width: 30px;
	height: 30px;
	margin-left: 20px;
	margin-top: 15px;
	border-radius: 50%;
	display: block;
}

.comment-img {
	display: flex;
}
        
        

.progress-container {
    margin: 20px 0;
    text-align: center;
        color: black;
    font-size: 15px;
}

.progress-label, .last-modified {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0; /* Light gray background */
    position: relative;
    border-radius: 10px;
    overflow: hidden;
}


        .accordion-arrow::before {
            content: "\f078"; /* Unicode for angle down (font-awesome) */
            font-family: 'Font Awesome 6 Free';
            margin-right: 5px;
            display: inline-block;
            transition: transform 0.3s ease;
        }

        .accordion-arrow.collapsed::before {
            transform: rotate(-180deg);
        }

.progress {
height:1.3rem;
}

.progress-fill {
    width: 0;
    height: 100%;
    background-color: #007bff; /* Dodger blue fill color */
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 0 0 10px;
}

.progress-text, #lastModifiedText {
    font-weight: bold;
    color: #007bff;
}

.last-modified {
    font-style: italic;
}


/* Add this CSS to your stylesheet */

@keyframes confettiAnimation {
  0% {
    transform: translateY(0) rotateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateY(1000px) rotateZ(720deg);
    opacity: 0;
  }
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #e2264d;
  opacity: 1;
  animation: confettiAnimation 4s ease-out infinite;
}

body.celebration-active {
  overflow: hidden;
}

body.celebration-active .confetti-container {
  pointer-events: none;
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.confetti-container .confetti {
  position: absolute;
  transform-origin: center;
}

.celebration-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

        #viewcertify {
            margin-top: 10px;
        }
        
        
        .accordion {
	background-color: #eee;
	color: #444;
	cursor: pointer;
	padding: 18px;
	width: 350px;
	margin-left: 0px;
	border: none;
	text-align: left;
	outline: none;
	font-size: 15px;
	transition: 0.4s;
}

.active, .accordion:hover {
	background-color: #ccc;
}

.accordion:after {
	content: '\002B';
	color: #777;
	font-weight: bold;
	float: right;
	margin-left: 5px;
}

.active:after {
	content: "\21E3";
}

.panel {
	padding: 0 18px;
	display: none;
	background-color: white;
	overflow: hidden;
	margin-left: 0px;
	padding-top: 10px;
}
    </style>
</head>

<body>


	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} else {

		Integer loggedInUserId = (Integer) session.getAttribute("loggedInUserID");
		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserId);
	%>
	
   <div class="overlay" id="overlay"></div>
   <div class="loading" id="loader">
	  <div class="loading-1"></div>
	  <div class="loading-2"></div>
	  <div class="loading-3"></div>
	  <div class="loading-4"></div>
	</div>
	
	
	<%
	}
	%>

    <!-- Bootstrap Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="../assets/js/details.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
</body>

</html>
