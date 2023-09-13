package com.fssa.freshstocks;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.Question;
import com.fssa.freshstocks.utils.*;
import com.fssa.freshstocks.utils.exception.DatabaseException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/submitAnswer")
public class SubmitAnswerServlet extends HttpServlet {
	
	int streak = 0;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	HttpSession session = request.getSession();
    	   String selectedAnswer = request.getParameter("selectedAnswer");
    	    String correctAnswer = request.getParameter("correctAnswer");
    	    int userId = (int) session.getAttribute("loggedInUserID");
    	    
    	    String quizStartTimeMillisStr = request.getParameter("quizStartTime");
    	    long quizStartTimeMillis = Long.parseLong(quizStartTimeMillisStr);
    	    Timestamp quizStartTime = new Timestamp(quizStartTimeMillis);
    	    
    	    
    	    boolean answeredToday = Boolean.parseBoolean(request.getParameter("answeredToday"));
    	    if (selectedAnswer != null && selectedAnswer.equals(correctAnswer)) {

    	      if(session.getAttribute("streak") != null) {
    	    	   streak = (int) session.getAttribute("streak");
    	    	   streak++; // Increment streak
       	        session.setAttribute("streak", streak);
       	     insertOrUpdateUserData(userId, streak, quizStartTime ,answeredToday);
       	  // Redirect back to your quiz page
             response.sendRedirect("/freshstocks_web/pages/dailyquiz.jsp");
    	      }
    	      
    	    } else {
    	    	streak--;
    	    	session.setAttribute("streak", streak);
    	    	insertOrUpdateUserData(userId, streak, quizStartTime ,answeredToday);
    	    	 // Redirect back to your quiz page
                response.sendRedirect("/freshstocks_web/pages/dailyquiz.jsp");
    	    }
    	   
    }

    private void insertOrUpdateUserData(int userId, int streak, Timestamp quizStartTime, boolean answeredToday) {
        try (Connection connection = ConnectionUtil.getConnection()) {
            // Check if a row with the given user_id already exists
            String checkIfExistsQuery = "SELECT COUNT(*) FROM user_quiz_info WHERE user_id = ?";
            try (PreparedStatement checkIfExistsStmt = connection.prepareStatement(checkIfExistsQuery)) {
                checkIfExistsStmt.setInt(1, userId);
                try (ResultSet resultSet = checkIfExistsStmt.executeQuery()) {
                    resultSet.next();
                    int rowCount = resultSet.getInt(1);

                    if (rowCount > 0) {
                        // If a row exists, update it
                        String updateQuery = "UPDATE user_quiz_info SET streak_count = ?, quiz_start_time = ?, answered_today = ? WHERE user_id = ?";
                        try (PreparedStatement updateStmt = connection.prepareStatement(updateQuery)) {
                            updateStmt.setInt(1, streak);
                            updateStmt.setTimestamp(2, quizStartTime);
                            updateStmt.setBoolean(3, answeredToday);
                            updateStmt.setInt(4, userId);
                            updateStmt.executeUpdate();
                        }
                    } else {
                        // If no row exists, insert a new one
                        String insertQuery = "INSERT INTO user_quiz_info (user_id, streak_count, quiz_start_time, answered_today) VALUES (?, ?, ?, ?)";
                        try (PreparedStatement insertStmt = connection.prepareStatement(insertQuery)) {
                            insertStmt.setInt(1, userId);
                            insertStmt.setInt(2, streak);
                            insertStmt.setTimestamp(3, quizStartTime);
                            insertStmt.setBoolean(4, answeredToday);
                            insertStmt.executeUpdate();
                        }
                    }
                }
            }
        } catch (SQLException | DatabaseException e) {
            e.printStackTrace();
        }
    }


	
}
