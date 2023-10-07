package com.fssa.freshstocks;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
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
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;
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
	    CourseService courseService = new CourseService();
	    String email = (String) session.getAttribute("loggedInEmail");

	    if (request.getParameter("courseId") != null) {
	        int courseId = Integer.parseInt(request.getParameter("courseId"));

	        try {
	            List<Course> purchasedCourses = courseService.getPurchasedCourses(email);
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
	        } catch (ServiceException | DAOException e) {
	            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching purchased courses.");
	        }
	    } else {
	        try {
	            List<Course> purchasedCourses = courseService.getPurchasedCourses(email);

	            // Convert the list of courses to JSON and send it as the response
	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            response.getWriter().write(new Gson().toJson(purchasedCourses));
	            
	        } catch (ServiceException | DAOException e) {
	            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching purchased courses.");
	        }
	    }
	}
	
}
