package com.fssa.freshstocks;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.fssa.freshstocks.dao.exception.DAOException;
import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class BuyCourseServlet
 */
@WebServlet("/BuyCourseServlet")
public class BuyCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        HttpSession session = request.getSession();
	        String email = (String) session.getAttribute("loggedInEmail"); 
	        int courseId = Integer.parseInt(request.getParameter("courseId"));

	        CourseService courseService = new CourseService();

	        try {
	        	User user = IndexServlet.fetchUserIDByEmail(email);

	            if (user != null) {
	                Course course = SaveCourseServlet.getCourseById(courseId);
	                boolean success = courseService.purchaseCourse(user, course, courseId);

	                if (success) {
	                    response.getWriter().write("Hurrah! You Have been Successfully Enrolled this Course");
	                } else {
	                    response.getWriter().write("Course had Already Purchased By You!.");
	                }
	            } else {
	                response.getWriter().write("User not found.");
	            }
	        } catch (ServiceException | DAOException e) {
	            e.printStackTrace();
	            response.getWriter().write("An error occurred.");
	        }
	    }

}
