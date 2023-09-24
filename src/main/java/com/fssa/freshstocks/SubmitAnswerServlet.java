package com.fssa.freshstocks;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.dao.QuizDAO;
import com.fssa.freshstocks.dao.exception.DAOException;
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
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6411139535656568260L;
	int streak = 0;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	HttpSession session = request.getSession();
    	QuizDAO quizDAO = new QuizDAO();
    	   String selectedAnswer = request.getParameter("selectedAnswer");
    	    String correctAnswer = request.getParameter("correctAnswer");
    	    int userId = (int) session.getAttribute("loggedInUserID");
    	    String quizStartTimeMillisStr = request.getParameter("quizStartTime");
    	    int streak = Integer.parseInt(request.getParameter("streak"));
    	    
    	    System.out.println(selectedAnswer);
    	    System.out.println(correctAnswer);
    	    System.out.println(userId);
    	    System.out.println(quizStartTimeMillisStr);
    	    
    	    long quizStartTimeMillis = Long.parseLong(quizStartTimeMillisStr);
    	    Timestamp quizStartTime = new Timestamp(quizStartTimeMillis);
    	    
    	    System.out.println(quizStartTime);
    	    
    	    
    	    boolean answeredToday = Boolean.parseBoolean(request.getParameter("answeredToday"));
    	    if (selectedAnswer != null && selectedAnswer.equals(correctAnswer)) {

    	      if(Integer.toString(streak) != null) {
    	    	   streak++; // Increment streak
       	     try {
				quizDAO.insertOrUpdateUserData(userId, streak, quizStartTime ,answeredToday);
			} catch (DAOException e) {
				e.printStackTrace();
			}
       	  // Redirect back to your quiz page
             response.sendRedirect("/freshstocks_web/pages/dailyquiz.jsp");
    	      }
    	      
    	    } else {
    	    	streak--;
    	    	try {
					quizDAO.insertOrUpdateUserData(userId, streak, quizStartTime ,answeredToday);
				} catch (DAOException e) {
					e.printStackTrace();
				}
    	    	 // Redirect back to your quiz page
                response.sendRedirect("/freshstocks_web/pages/dailyquiz.jsp");
    	    }
    	   
    }

	
}
