package com.fssa.freshstocks;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;
import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;

/**
 * Servlet implementation class RemoveMyCoursesServlet
 */
@WebServlet("/RemoveMyCoursesServlet")
public class RemoveMyCoursesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	HttpSession session = request.getSession();
	    	CourseService courseService = new CourseService();
		    String email = (String) session.getAttribute("loggedInEmail");
		    int userId = (int) session.getAttribute("loggedInUserID");
	        int courseId = Integer.parseInt(request.getParameter("courseId"));

	        try {
	            // Retrieve the current purchased courses list
	            String currentPurchasedCourses = getPurchasedCourses(email);

	            // Convert the comma-separated string to an ArrayList of integers
	            List<Integer> purchasedCoursesList = Arrays.stream(currentPurchasedCourses.split(","))
	                                                      .map(Integer::parseInt)
	                                                      .collect(Collectors.toList());

	            // Remove the course ID from the list
	            purchasedCoursesList.remove(Integer.valueOf(courseId));

	         // Convert the ArrayList back to a comma-separated string
	            String updatedPurchasedCourses = purchasedCoursesList.stream()
	                    .map(String::valueOf) // Convert integers to strings
	                    .collect(Collectors.joining(","));

                int rowsUpdated = courseService.updatePurchasedCourses(updatedPurchasedCourses,userId);
	            
	            if (rowsUpdated > 0) {
                    response.getWriter().write("Course removed successfully.");
                } else {
                    response.getWriter().write("Course removal failed.");
                }
	            
	        } catch (SQLException | ServiceException e) {
	            e.printStackTrace();
	            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error removing course.");
	        }
	    }
	    
	    public static String getPurchasedCourses(String email) throws SQLException {
	    	UserService userService = new UserService();
	        User user = null;
			try {
				user = userService.getUserByEmail(email);
			} catch (ServiceException e) {
				e.printStackTrace();
			}

	        if (user != null && user.getPurchasedCourses() != null) {
	            return user.getPurchasedCourses();
	        }

	        return ""; // Return an empty string if no courses are purchased or user is not found
	    }

}
