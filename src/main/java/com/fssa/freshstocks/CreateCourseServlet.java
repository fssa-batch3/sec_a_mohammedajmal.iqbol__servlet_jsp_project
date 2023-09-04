package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;
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
     * @see HttpServlet#HttpServlet()
     */
    public CreateCourseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
	    PrintWriter out = response.getWriter();
	    
	    CourseService courseService = new CourseService();
//	    long nanotime = System.nanoTime();

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
	        out.println("Error: " + e.getMessage());
	    }
	}

}
