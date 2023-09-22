package com.fssa.freshstocks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshstocks.model.CourseProgressData;
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.services.exception.ServiceException;
import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;

/**
 * Servlet implementation class UpdateMyCoursesServlet
 */
@WebServlet("/UpdateMyCoursesServlet")
public class UpdateMyCoursesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        CourseService courseService = new CourseService();
	    response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            BufferedReader reader = request.getReader();
            StringBuilder requestData = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                requestData.append(line);
            }

            JSONObject userData = new JSONObject(requestData.toString());
            JSONObject userJson = userData.getJSONObject("updateProgressObj");

    		int courseID = userJson.getInt("courseID");
            int videoID =  userJson.getInt("videoID");
            int userId = (int) session.getAttribute("loggedInUserID");
            

            // Update database to mark video as watched
            courseService.updateVideoWatchStatus(courseID, videoID, userId);
            
            out.println("Video progress saved successfully.");
            
        } catch (Exception e) {
        	String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[0].trim();
	    	out.println(errorMessage);
        }
	}
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		CourseService courseService = new CourseService();
		int userId = (int) session.getAttribute("loggedInUserID");
	    int courseId = Integer.parseInt(request.getParameter("courseId"));

	    // Here, you would have your logic to retrieve the progress and latest modified timestamp from the database
	    CourseProgressData progressData = null;
		try {
			progressData = courseService.getCourseProgress(userId, courseId);
		} catch (ServiceException e) {
			e.printStackTrace();
		}

	    // Set the response content type
	    response.setContentType("application/json");

	    // Get the PrintWriter object to write the response
	    PrintWriter out = response.getWriter();

	    // Send the progress and latestModifiedAt as JSON
	    out.print("{\"progress\": " + progressData.getTotalProgress() + ", \"latestModifiedAt\": \"" + progressData.getLatestModifiedAt() + "\"}");
	    out.flush();
	}

}
