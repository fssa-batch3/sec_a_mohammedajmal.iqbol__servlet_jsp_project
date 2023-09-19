package com.fssa.freshstocks;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
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
 * Servlet implementation class UpdateCourseServlet
 */
@WebServlet("/UpdateCourseServlet")
public class UpdateCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	CourseService courseService = new CourseService();
        List<Course> courses = new ArrayList<>();
        HttpSession session = request.getSession();
        int userID = (int) session.getAttribute("loggedInUserID");
        
    	try {
			courses = courseService.listCourse(userID);
		} catch (ServiceException e) {
			e.printStackTrace();
		}

    	// Convert the list to JSON
    	Gson gson = new Gson();
    	String json = gson.toJson(courses);

    	// Set the content type and write the JSON to the response
    	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	response.getWriter().write(json);
    }

}
