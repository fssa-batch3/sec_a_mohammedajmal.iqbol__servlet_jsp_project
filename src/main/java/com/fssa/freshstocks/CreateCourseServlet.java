package com.fssa.freshstocks;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class AddCourse
 */
@WebServlet("/CreateCourseServlet")
public class CreateCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * Handles HTTP POST requests for creating and registering a new course listing
	 * by a seller.
	 *
	 * This method retrieves various course-related information from the request parameters,
	 * including the course name, cover image URL, timing, language, marked price, selling price,
	 * description, instructor name, company name, company category, top skills, and the logged-in
	 * user's ID. It also records the current date and time as the course's creation timestamp.
	 *
	 * It then creates a new Course object with the provided information and attempts to register
	 * it using the CourseService. If the course registration is successful, the user is redirected
	 * to the seller's home page. If an error occurs during the registration process, an error message
	 * is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
	    
	    CourseService courseService = new CourseService();

	    String name = request.getParameter("name");
	    String coverImage = request.getParameter("coverImage");
	    String timing = request.getParameter("timing");
	    String language = request.getParameter("language");
	    int markedPrice = Integer.parseInt(request.getParameter("markedPrice"));
	    int sellingPrice = Integer.parseInt(request.getParameter("sellingPrice"));
	    String description = request.getParameter("description");
	    String instructorName = request.getParameter("instructorName");
	    String companyName = request.getParameter("companyName");
	    String companyCategory = request.getParameter("companyCategory");
	    String topSkills = request.getParameter("topSkills");
	    int userID = (int) session.getAttribute("loggedInUserID");
	    // giving current date-time as value
	    LocalDateTime currentTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String createdAt = currentTime.format(formatter);

	    Course course1 = new Course(name,
	        coverImage,
	        timing, language, markedPrice, sellingPrice,
	        description, instructorName,
	        companyName, companyCategory, topSkills, userID,createdAt);

	    try {
	       courseService.registerCourse(course1);
	       response.sendRedirect(request.getContextPath() + "/pages/sellerhome.jsp");
	    } catch (ServiceException e) {
	    	String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[1].trim();
	    	response.sendRedirect("/freshstocks_web/pages/createCourse.jsp?error=" + errorMessage);
	    }
	}

}
