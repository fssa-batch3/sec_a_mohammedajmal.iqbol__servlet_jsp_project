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
     * @see HttpServlet#HttpServlet()
     */
    public DeleteCourseServlet() {
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
