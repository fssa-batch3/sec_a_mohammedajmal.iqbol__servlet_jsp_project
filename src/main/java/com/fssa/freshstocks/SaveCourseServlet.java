package com.fssa.freshstocks;

import java.io.IOException;

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
 * Servlet implementation class SaveCourseServlet
 */
@WebServlet("/SaveCourseServlet")
public class SaveCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for updating course information.
	 *
	 * This method retrieves updated course information from the request parameters, such as
	 * cover image, timing, language, marked price, selling price, description, instructor name,
	 * company name, company category, and top skills. It also retrieves the course ID from the
	 * request parameters and sets session attributes with the updated information.
	 *
	 * It then creates a Course object with the updated information and uses the CourseService to
	 * update the course. After updating, the user is redirected back to the seller's home page.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
        HttpSession session = request.getSession();   
        int courseId = Integer.parseInt(request.getParameter("courseId"));
        
        String updatedCoverImage = request.getParameter("updatedCoverImage");
        String updatedTiming = request.getParameter("updatedTiming");
        String updatedLanguage = request.getParameter("updatedLanguage");
        int updatedMarkedPrice = Integer.parseInt(request.getParameter("updatedMarkedPrice"));
        int updatedSellingPrice = Integer.parseInt(request.getParameter("updatedSellingPrice"));
        String updatedDescription = request.getParameter("updatedDescription");
        String updatedInstructorName = request.getParameter("updatedInstructorName");
        String updatedCompanyName = request.getParameter("updatedCompanyName");
        String updatedCompanyCategory = request.getParameter("updatedCompanyCategory");
        String updatedTopSkills = request.getParameter("updatedTopSkills");
        
        session.setAttribute("courseCoverImage", updatedCoverImage);
        session.setAttribute("courseTiming", updatedTiming);
        session.setAttribute("courseLanguage", updatedLanguage);
        session.setAttribute("courseMarkedPrice", updatedMarkedPrice);
        session.setAttribute("courseSellingPrice", updatedSellingPrice);
        session.setAttribute("courseDescription", updatedDescription);
        session.setAttribute("courseInstructorName", updatedInstructorName);
        session.setAttribute("courseCompanyName", updatedCompanyName);
        session.setAttribute("courseCompanyCategory", updatedCompanyCategory);
        session.setAttribute("courseTopSkills", updatedTopSkills);

        CourseService courseService = new CourseService();
        Course updatedCourse = new Course(updatedCoverImage,
            updatedTiming, updatedLanguage, updatedMarkedPrice, updatedSellingPrice,updatedDescription,
            updatedInstructorName,updatedCompanyName,updatedCompanyCategory,updatedTopSkills);

        try {
            courseService.updateCourse(updatedCourse,courseId);
            // Redirect back to the seller home page after updating
            response.sendRedirect(request.getContextPath() + "/pages/sellerhome.jsp");
        } catch (ServiceException e) {
            String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[1].trim();
	    	response.sendRedirect("/freshstocks_web/pages/editcourse.jsp?courseId=" + courseId + "&error=" + errorMessage);
        }
    }
}
