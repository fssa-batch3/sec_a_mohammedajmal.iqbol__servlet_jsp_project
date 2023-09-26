package com.fssa.freshstocks;

import java.io.BufferedReader;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.fssa.freshstocks.model.Question;
import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;

@WebServlet("/updateStreakServlet")
public class QuizServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			try (Connection connection = ConnectionUtil.getConnection()) {

				String questionsQuery = "SELECT * FROM quiz_questions";
				try (PreparedStatement questionsStatement = connection.prepareStatement(questionsQuery);
						ResultSet questionsResultSet = questionsStatement.executeQuery()) {

					// Store questions in an ArrayList (modify as needed)
					ArrayList<Question> questionsList = new ArrayList<Question>();
                    HttpSession session = request.getSession();
					while (questionsResultSet.next()) {
						Question question = new Question();
						question.setQuestion(questionsResultSet.getString("question_text"));
						// Retrieve options and correct answer from the result set and populate the
						// Question object
						question.setoption1(questionsResultSet.getString("option1"));
						question.setoption2(questionsResultSet.getString("option2"));
						question.setoption3(questionsResultSet.getString("option3"));
						question.setoption4(questionsResultSet.getString("option4"));
						question.setCorrectAnswer(questionsResultSet.getString("correct_answer"));

						questionsList.add(question);
					}
					session.setAttribute("questionsList", questionsList);
				}

				// Query the database to retrieve user info
				String userInfoQuery = "SELECT * FROM user_quiz_info WHERE user_id = ?";
				try (PreparedStatement userInfoStatement = connection.prepareStatement(userInfoQuery)) {
					HttpSession session = request.getSession();
					int userID = (int) session.getAttribute("loggedInUserID");
					userInfoStatement.setInt(1, userID);

					try (ResultSet userInfoResultSet = userInfoStatement.executeQuery()) {
						if (userInfoResultSet.next()) {
							Timestamp quizStartTime = userInfoResultSet.getTimestamp("quiz_start_time");
							boolean answeredToday = userInfoResultSet.getBoolean("answered_today");
							int streak = userInfoResultSet.getInt("streak_count");

							request.setAttribute("quiz_start_time", quizStartTime);
							request.setAttribute("answeredToday", answeredToday);
							request.setAttribute("streak", streak);
							
							// Create a JSON object with the data
	                        JSONObject responseData = new JSONObject();
	                        responseData.put("quiz_start_time", quizStartTime.toString());
	                        responseData.put("answeredToday", answeredToday);
	                        responseData.put("streak", streak);

	                        // Send the JSON response
	                        response.setContentType("application/json");
	                        response.getWriter().write(responseData.toString());
						}
					}
				}
			}
		} catch (SQLException | DatabaseException e) {
			e.printStackTrace();
		}
		// Forward the data to your JSP
		request.getRequestDispatcher("/dailyquiz.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		    throws ServletException, IOException {
		
		    try {
		        // Read JSON data from the request's input stream
		        BufferedReader reader = request.getReader();
		        StringBuilder jsonBuilder = new StringBuilder();
		        String line;
		        while ((line = reader.readLine()) != null) {
		            jsonBuilder.append(line);
		        }

		        // Parse the JSON data to retrieve the required values
		        JSONObject jsonData = new JSONObject(jsonBuilder.toString());
		        int newStreak = jsonData.optInt("streak", -1); // Default to -1 if "streak" is missing or not an integer
		        boolean answeredToday = jsonData.optBoolean("answeredToday", false); // Default to false if "answeredToday" is missing or not a boolean
		        int userId = jsonData.optInt("userId", -1); // Default to -1 if "userId" is missing or not an integer

		        if (newStreak == -1 || userId == -1) {
		            // Handle invalid or missing data
		            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		            return;
		        }

		        try (Connection conn = ConnectionUtil.getConnection();
		             PreparedStatement updateStmt = conn.prepareStatement(
		                 "UPDATE user_quiz_info SET streak=?, answered_today=? WHERE user_id=?")) {

		            updateStmt.setInt(1, newStreak);
		            updateStmt.setBoolean(2, answeredToday);
		            updateStmt.setInt(3, userId);
		            updateStmt.executeUpdate();

		            // Respond with a success status
		            response.setStatus(HttpServletResponse.SC_OK);
		        } catch (DatabaseException | SQLException e) {
		            e.printStackTrace();

		            // Handle database errors
		            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		        }
		    } catch (JSONException e) {
		        e.printStackTrace();

		        // Handle JSON parsing errors
		        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		    }
		}


}