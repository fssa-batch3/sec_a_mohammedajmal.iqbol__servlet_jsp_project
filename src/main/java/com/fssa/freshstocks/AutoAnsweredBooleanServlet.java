package com.fssa.freshstocks;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;

/**
 * Servlet implementation class AutoAnsweredBooleanServlet
 */
@WebServlet("/AutoAnsweredBooleanServlet")
public class AutoAnsweredBooleanServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("loggedInUserID");
		try (Connection connection = ConnectionUtil.getConnection();
		         PreparedStatement preparedStatement = connection.prepareStatement("UPDATE user_quiz_info SET answered_today = false WHERE user_id = ?")) {
		        
		    	preparedStatement.setInt(1, userId);
		        int rowsAffected = preparedStatement.executeUpdate();

		        if (rowsAffected > 0) {
		            System.out.println("Boolean updated to false!");
		        } else {
		            System.out.println("No rows were updated.");
		        }
		    } catch (SQLException | DatabaseException e) {
		        e.printStackTrace();
		    }
	}
}
