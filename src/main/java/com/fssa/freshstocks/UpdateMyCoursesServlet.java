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
            updateVideoWatchStatus(courseID, videoID, userId);
            
            out.println("Video progress saved successfully.");
            
        } catch (Exception e) {
        	String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[1].trim();
	    	out.println(errorMessage);
        }
	}
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("loggedInUserID");
	    int courseId = Integer.parseInt(request.getParameter("courseId"));

	    // Here, you would have your logic to retrieve the progress and latest modified timestamp from the database
	    CourseProgressData progressData = getCourseProgress(userId, courseId);

	    // Set the response content type
	    response.setContentType("application/json");

	    // Get the PrintWriter object to write the response
	    PrintWriter out = response.getWriter();

	    // Send the progress and latestModifiedAt as JSON
	    out.print("{\"progress\": " + progressData.getTotalProgress() + ", \"latestModifiedAt\": \"" + progressData.getLatestModifiedAt() + "\"}");
	    out.flush();
	}
	
	
	private CourseProgressData getCourseProgress(int userId, int courseId) {
	    CourseProgressData courseProgressData = null;

	    try {
	        String query = "SELECT SUM(progress) as total_progress, MAX(modified_at) as latest_modified_at FROM course_progress WHERE user_id = ? AND course_id = ?";
	        Connection connection = ConnectionUtil.getConnection();
	        PreparedStatement statement = connection.prepareStatement(query);
	        statement.setInt(1, userId);
	        statement.setInt(2, courseId);

	        ResultSet resultSet = statement.executeQuery();

	        if (resultSet.next()) {
	            double totalProgress = resultSet.getDouble("total_progress");
	            Timestamp latestModifiedAt = resultSet.getTimestamp("latest_modified_at");
	            courseProgressData = new CourseProgressData(totalProgress, latestModifiedAt);
	        }

	        resultSet.close();
	        statement.close();
	    } catch (SQLException | DatabaseException e) {
	        e.printStackTrace();
	        // Handle the exception as needed
	    }

	    return courseProgressData;
	}

	
	
	private void updateVideoWatchStatus(int courseID, int videoID, int userID) {
	    try (Connection connection = ConnectionUtil.getConnection();
	         PreparedStatement checkIfExistsStmt = connection.prepareStatement(
	                 "SELECT * FROM course_progress WHERE user_id = ? AND course_id = ? AND video_id = ?");
	         PreparedStatement updateStmt = connection.prepareStatement(
	                 "UPDATE course_progress SET watched = true, progress = 100, modified_at = NOW() " +
	                 "WHERE user_id = ? AND course_id = ? AND video_id = ?");
	         PreparedStatement insertStmt = connection.prepareStatement(
	                 "INSERT INTO course_progress (user_id, course_id, video_id, progress, watched, modified_at) " +
	                 "VALUES (?, ?, ?, ?, true, NOW())")) {

	        checkIfExistsStmt.setInt(1, userID);
	        checkIfExistsStmt.setInt(2, courseID);
	        checkIfExistsStmt.setInt(3, videoID);
	        ResultSet resultSet = checkIfExistsStmt.executeQuery();

	        if (resultSet.next()) {
	            updateStmt.setInt(1, userID);
	            updateStmt.setInt(2, courseID);
	            updateStmt.setInt(3, videoID);
	            updateStmt.setInt(4, 100);
	            updateStmt.executeUpdate();
	        } else {
	            insertStmt.setInt(1, userID);
	            insertStmt.setInt(2, courseID);
	            insertStmt.setInt(3, videoID);
	            insertStmt.setInt(4, 100); // Set initial progress to 100
	            insertStmt.executeUpdate();
	        }
	    } catch (SQLException | DatabaseException e) {
	        e.printStackTrace();
	    }
	}


}
