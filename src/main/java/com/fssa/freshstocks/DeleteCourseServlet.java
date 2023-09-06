package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class DeleteCourseServlet
 */
@WebServlet("/DeleteCourseServlet")
public class DeleteCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * Handles HTTP POST requests for deleting a course listing created by a seller.
	 *
	 * This method retrieves the course ID from the request parameters and creates an
	 * instance of CourseService to handle the course deletion. It also sets a constant
	 * value 'isDeleted' to indicate that the course should be marked as deleted.
	 *
	 * It attempts to delete the specified course using the CourseService. If the deletion
	 * is successful, a success message is printed to the response output, and the user is
	 * redirected to the seller's home page. If the deletion fails or an error occurs during
	 * the process, an appropriate error message is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		int courseId = Integer.parseInt(request.getParameter("courseId"));
		CourseService courseService = new CourseService();
		final int isDeleted = 1;
		
		try {
            if(courseService.deleteCourse(courseId, isDeleted)) {
            	out.println("Course with CourseID: " + courseId  + " Deleted Successfully!");
            	
            	response.sendRedirect("/freshstocks_web/pages/sellerhome.jsp");
            } else {
            	out.println("Error! Course Deleted Unsuccessful!");
            }
        } catch (ServiceException e) {
        	out.println("Error: " + e.getMessage());
        }
	}

}
