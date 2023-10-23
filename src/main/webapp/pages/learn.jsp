<%@page import="java.text.DecimalFormat"%>
<%@page import="java.util.Collections"%>
<%@page import="com.fssa.freshstocks.services.exception.ServiceException"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.fssa.freshstocks.model.Course"%>
<%@page import="java.util.List"%>
<%@page import="com.fssa.freshstocks.services.CourseService"%>
<%@page import="com.fssa.freshstocks.services.UserService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Course Learn Page</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/loader1.css"/>
    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS -->
    <style>
        body {
            background-color: #f0f8ff; /* Light Blue */
        }

        header {
            background-color: #87cefa; /* Dodger Blue */
        }

        header a {
            color: #ffffff; /* White */
        }
        
        .form-inline {
        width:auto;
        }

            .search-input {
        width: 500px; /* Set the width to 500 pixels */
        border: 2px solid #87cefa;
        padding: 10px;
        border-radius: 5px;
        outline: none;
    }
    
        #searchbar {
        width: 500px;
        }
        
        .nav-tabs .nav-item .nav-link {
    color: #000000; /* Black */
}

        .search-input:focus {
            border-color: #007bff; /* Blue */
        }
        
        .card ,.card:hover {
          text-decoration:none;
          color:black;
        }
       

        .btn-primary {
            background-color: #007bff !important; /* Blue */
            border-color: #007bff !important; /* Blue */
            color: #ffffff; /* White */
        }
        
                #description {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
        display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
}
        
        .card-img-top {
          max-width:350px;
        }

        .btn-primary:hover {
            background-color: #0056b3 !important; /* Darker Blue */
            border-color: #0056b3 !important; /* Darker Blue */
        }
        
        .card {
    border: none;
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
    transition: transform 0.3s; 
}

.card:hover {
    transform: scale(1.05);
}
        
                   #userProfile {
    width: 40px; 
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

   #fa-envelope {
       font-size: 40px;
    color: dodgerblue;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    top:15px;
   }
   
   .row {
    display:flex;
    gap:30px;
   }
   
    /* Pagination css */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination a {
  color: #007bff;
  background-color: #fff;
  border: 1px solid #007bff;
  padding: 6px 12px;
  text-decoration: none;
  transition: background-color 0.3s;
  margin: 3px;
  border-radius: 5px;
}

/* Active Page Style */
.pagination a.active {
  background-color: #007bff;
  color: white;
}

/* Disabled Button Style */
.pagination a.disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* Next Button Style */
.pagination .next {
  border: 1px solid #007bff;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 5px;
  margin: 3px;
  color: #007bff;
  background-color: #fff;
  transition: background-color 0.3s;
}

.pagination .next:hover {
  background-color: #007bff;
  color: white;
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
    
    <!-- Header Section -->
    <header class="bg-white py-2">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <a href="home.jsp"><img src="../assets/images/Screenshot 2023-02-11 021952.png" height="55" width="169" alt="Logo" class="img-fluid"></a>
                </div>
                <div class="col-md-6">
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-3 search-input" type="search" id="searchbar" placeholder="Search" aria-label="Search">
                    </form>
                </div>
                <div class="col-md-3 text-right">
                    <a href="userContact.jsp" class="text-dark"><i class="fas fa-envelope" id="fa-envelope"></i></a>&nbsp;
                    <a href="userProfile.jsp" class="text-dark ml-3"><img id="userProfile" src="<%= profileImg %>" alt="User Profile"></a>
                </div>
            </div>
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="all-courses-tab" data-toggle="tab" href="#all-courses" role="tab" aria-controls="all-courses" aria-selected="true">All Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="free-courses-tab" data-toggle="tab" href="#free-courses" role="tab" aria-controls="free-courses" aria-selected="false">Free Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="latest-courses-tab" data-toggle="tab" href="#latest-courses" role="tab" aria-controls="latest-courses" aria-selected="false">Latest Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="my-courses-tab" data-toggle="tab" href="#my-courses" role="tab" aria-controls="my-courses" aria-selected="false">My Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="blogs-tab" data-toggle="tab" href="#blogs" role="tab" aria-controls="blogs" aria-selected="false">Blogs</a>
                </li>
            </ul>
        </div>
    </header>

    <!-- Main Content Section -->
    <div class="container my-5">
        <div class="tab-content" id="myTabContent">
            <!-- All Courses Tab Content -->
            <div class="tab-pane fade show active" id="all-courses" role="tabpanel" aria-labelledby="all-courses-tab">
                <div class="row" id="all-course">
                    <!-- Course Divs for All Courses -->
                    
 
					<%
					CourseService courseService = new CourseService();
					List<Course> courses = new ArrayList<>();
                    		
                    int coursesPerPage = 5; 
                    int currentPage = 1; 

                    if (request.getParameter("page") != null) {
                       currentPage = Integer.parseInt(request.getParameter("page"));
                    }

                   int startIndex = (currentPage - 1) * coursesPerPage;

					try {
					    courses = courseService.getCoursesWithLimitOffset(startIndex, coursesPerPage);
					    if (courses.isEmpty() && currentPage > 1) {
					        response.sendRedirect("learn.jsp?page=" + (currentPage - 1));
					    }
					    Collections.reverse(courses);

					for (Course course : courses) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
                    
                                   
  <a class="card mb-4" href="details.jsp?courseID=<%=course.getCourseID()%>">
    <img src="<%=course.getCoverImage()%>" class="card-img-top" alt="Course Image">
    <div class="card-body">
        <h5 class="card-title"><%=course.getName()%></h5>
        <p class="card-text" id="description"><%=course.getDescription()%></p>
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex flex-column">
                <span class="text-muted">Timing</span>
                <span><%=course.getTiming()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Language</span>
                <span><%=course.getLanguage()%></span>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-muted">Selling Price</span>
                <span>&#8377;<%=course.getSellingPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Old Price</span>
                <span>&#8377;<%=course.getMarkedPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Discount</span>
                <span><%=df.format(discountPercentage)%>%</span>
            </div>
        </div>
    </div>
</a>             
         		   <%
					}
					
					} catch (ServiceException e) {
						e.printStackTrace();
					}
					%>
                                     
                </div>
                
<%-- Pagination Links --%>
<div class="pagination">
    <%
    int totalCourses = courseService.getTotalCourseCount();
    int totalPages = (int) Math.ceil((double) totalCourses / coursesPerPage);
    %>
    <a href="<%=currentPage == 1 ? "javascript:void(0);" : "learn.jsp?page=" + (currentPage - 1)%>" class="<%=currentPage == 1 ? "disabled" : ""%>">Previous</a>
    <%
    for (int i = 1; i <= totalPages; i++) {
    %>
    <a href="learn.jsp?page=<%=i%>" class="<%=i == currentPage ? "active" : ""%>"><%=i%></a>
    <%
    }
    %>
    <a href="<%=currentPage == totalPages ? "javascript:void(0);" : "learn.jsp?page=" + (currentPage + 1)%>" class="<%=currentPage == totalPages ? "disabled" : ""%>">Next</a>
</div>
            </div>

            <!-- Free Courses Tab Content -->
            <div class="tab-pane fade" id="free-courses" role="tabpanel" aria-labelledby="free-courses-tab">
                <div class="row" id="free-course">
                    <!-- Course Divs for Free Courses -->
      
       				
									<%
					List<Course> courses1 = new ArrayList<>();

                    		for (Course course : courses) {
                    		    if (course.getSellingPrice() == 0) {
                    		    	courses1.add(course);
                    		    }
                    		}

					if (courses1.isEmpty()) {
					%>
					<p>No courses available.</p>
					<%
					} else {

					for (Course course : courses1) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
                                   
  <a class="card mb-4" href="details.jsp?courseID=<%=course.getCourseID()%>">
    <img src="<%=course.getCoverImage()%>" class="card-img-top" alt="Course Image">
    <div class="card-body">
        <h5 class="card-title"><%=course.getName()%></h5>
        <p class="card-text" id="description"><%=course.getDescription()%></p>
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex flex-column">
                <span class="text-muted">Timing</span>
                <span><%=course.getTiming()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Language</span>
                <span><%=course.getLanguage()%></span>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-muted">Selling Price</span>
                <span>&#8377;<%=course.getSellingPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Old Price</span>
                <span>&#8377;<%=course.getMarkedPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Discount</span>
                <span><%=df.format(discountPercentage)%>%</span>
            </div>
        </div>
    </div>
</a>  
					<%
					}
					}
					%>             

                </div>
            </div>

            <!-- Latest Courses Tab Content -->
            <div class="tab-pane fade" id="latest-courses" role="tabpanel" aria-labelledby="latest-courses-tab">
                <div class="row" id="latest-course">
                    <!-- Course Divs for Latest Courses -->
                   
                   
                   
                   
                   
                   
  				
				<%
				List<Course> latestCourses = courses.subList(0, Math.min(courses.size(), 5));

					if (latestCourses.isEmpty()) {
					%>
					<p>No courses available.</p>
					<%
					} else {

					for (Course course : latestCourses) {

						double markedPrice = course.getMarkedPrice();
						double sellingPrice = course.getSellingPrice();
						double discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;

						DecimalFormat df = new DecimalFormat("#.00");
					%>
  <a class="card mb-4" href="details.jsp?courseID=<%=course.getCourseID()%>">
    <img src="<%=course.getCoverImage()%>" class="card-img-top" alt="Course Image">
    <div class="card-body">
        <h5 class="card-title"><%=course.getName()%></h5>
        <p class="card-text" id="description"><%=course.getDescription()%></p>
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex flex-column">
                <span class="text-muted">Timing</span>
                <span><%=course.getTiming()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Language</span>
                <span><%=course.getLanguage()%></span>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-muted">Selling Price</span>
                <span>&#8377;<%=course.getSellingPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Old Price</span>
                <span>&#8377;<%=course.getMarkedPrice()%></span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Discount</span>
                <span><%=df.format(discountPercentage)%>%</span>
            </div>
        </div>
    </div>
</a>  
					<%
					}
					}
					%>

                   
                </div>
            </div>

            <!-- My Courses Tab Content -->
            <div class="tab-pane fade" id="my-courses" role="tabpanel" aria-labelledby="my-courses-tab">
                <div class="row .my-course" id="my-course">
                    <!-- Course Divs for My Courses -->
                    <!-- Add your course cards here -->
                </div>
            </div>

            <!-- Blogs Tab Content -->
            <div class="tab-pane fade" id="blogs" role="tabpanel" aria-labelledby="blogs-tab">
                <div class="row .blog" id="blog">
                    <!-- Blog Posts -->
                    <!-- Add your blog content here -->
                </div>
            </div>
        </div>
    </div>
    
    
    <%
    }
    %>

    <!-- Bootstrap Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="../assets/js/learn.js" async></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>

</html>
    