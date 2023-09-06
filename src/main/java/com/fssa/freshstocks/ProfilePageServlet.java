package com.fssa.freshstocks;

import java.io.IOException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.utils.ConnectionUtil;

@WebServlet("/ProfilePageServlet")
public class ProfilePageServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = -5044980730406803879L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String loggedInUserID = (String) session.getAttribute("loggedInUserID");

        if (loggedInUserID != null) {
            // Forward to the JSP page
            request.getRequestDispatcher("pages/userProfile.jsp").forward(request, response);
        } else {
            // User is not logged in, redirect to login page
            response.sendRedirect("pages/login.jsp");
        }
    }

    private User fetchUserDetails(String UserID) {
        User userDetails = null;
        int userID = Integer.parseInt(UserID);

        // Database query
        String query = "SELECT * FROM user WHERE user_id = ?";
        try (Connection connection = ConnectionUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setInt(1, userID);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    String username = resultSet.getString("username");
                    String gender = resultSet.getString("gender");
                    String mobileNumber = resultSet.getString("mobile_number");
                    String dateOfBirth = resultSet.getString("date_of_birth");
                    String email = resultSet.getString("email");
                    int seller = resultSet.getInt("is_seller");
                    String createdAt = resultSet.getString("created_at");
                    String modifiedAt = resultSet.getString("modified_at");

                    userDetails = new User(username, gender,mobileNumber,dateOfBirth,email,seller,createdAt,modifiedAt);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return userDetails;
    }
}
