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
     * @see HttpServlet#HttpServlet()
     */
    public SaveCourseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
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

        } catch (ServiceException e) {
            e.printStackTrace();
        }
        
     // Redirect back to the seller home page after updating
        response.sendRedirect(request.getContextPath() + "/pages/sellerhome.jsp");
    }
}
