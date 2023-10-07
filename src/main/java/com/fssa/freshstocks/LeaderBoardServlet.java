package com.fssa.freshstocks;

import java.io.IOException;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshstocks.model.LeaderboardEntry;
import com.fssa.freshstocks.services.QuizService;

/**
 * Servlet implementation class leaderboard
 */
@WebServlet("/leaderboard")
public class LeaderBoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    try {
	        QuizService quizService = new QuizService();
	        List<LeaderboardEntry> leaderboardData = quizService.getLeaderboardData();

	        // Set the content type of the response
	        response.setContentType("application/json");

	        // Write the JSON response
	        PrintWriter out = response.getWriter();
	        out.print("[");
	        for (int i = 0; i < leaderboardData.size(); i++) {
	            LeaderboardEntry entry = leaderboardData.get(i);
	            out.print("{\"rank\": " + (i + 1) + ", \"name\": \"" + entry.getName() + "\", \"streak\": " + entry.getStreak() + ", \"gender\": \"" + entry.getGender() + "\", \"quizEndTime\": \"" + entry.getQuizEndTime() + "\", \"profileImg\": \"" + entry.getImage() + "\" }");
	            if (i < leaderboardData.size() - 1) {
	                out.print(",");
	            }
	        }
	        out.print("]");
	    } catch (Exception e) {
	        e.printStackTrace();
	        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	    }
	}

}
