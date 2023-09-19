package com.fssa.freshstocks;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.dao.CourseDAO;
import com.fssa.freshstocks.dao.exception.DAOException;
import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.model.User;
import com.google.gson.Gson;

/**
 * Servlet implementation class GetPurchasedCoursesServlet
 */
@WebServlet("/getPurchasedCourses")
public class GetPurchasedCoursesServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 3795165081303431250L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    HttpSession session = request.getSession();
	    String email = (String) session.getAttribute("loggedInEmail");

	    if (request.getParameter("courseId") != null) {
	        int courseId = Integer.parseInt(request.getParameter("courseId"));

	        try {
	            List<Course> purchasedCourses = getPurchasedCourses(email);
	            boolean coursePurchased = false;

	            for (Course course : purchasedCourses) {
	                if (course.getCourseID() == courseId) {
	                    coursePurchased = true;
	                    break;
	                }
	            }

	            // Send the response
	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            response.getWriter().write(String.valueOf(coursePurchased));
	        } catch (SQLException e) {
	            e.printStackTrace();
	            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching purchased courses.");
	        }
	    } else {
	        try {
	            List<Course> purchasedCourses = getPurchasedCourses(email);

	            // Convert the list of courses to JSON and send it as the response
	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            response.getWriter().write(new Gson().toJson(purchasedCourses));
	            
	        } catch (SQLException e) {
	            e.printStackTrace();
	            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching purchased courses.");
	        }
	    }
	}
	

    public static List<Course> getPurchasedCourses(String email) throws SQLException {
        // Assuming userDAO is your Data Access Object for users
    	CourseDAO courseDAO = new CourseDAO();
       User user = IndexServlet.fetchUserIDByEmail(email);

        if (user != null && user.getPurchasedCourses() != null) {
            // Split the purchasedCourses string into an array of course IDs
            String[] courseIds = user.getPurchasedCourses().split(",");

            List<Course> purchasedCourses = new ArrayList<>();

            // Assuming courseDAO is your Data Access Object for courses
            for (String courseId : courseIds) {
                Course course = null;
				try {
					course = courseDAO.getCourseFromCourseId(Integer.parseInt(courseId));
				} catch (NumberFormatException | DAOException e) {
					e.printStackTrace();
				} 
                if (course != null) {
                    purchasedCourses.add(course);
                }
            }

            return purchasedCourses;
        }

        return null; // User not found or no purchased courses
    }
}
