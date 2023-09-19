package com.fssa.freshstocks;

import java.io.BufferedReader;


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

import org.json.JSONObject;

import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;

/**
 * Servlet implementation class IndexServlet
 */
@WebServlet("/IndexServlet")
public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for user login.
	 *
	 * This method retrieves the email and password from the request parameters, creates
	 * a User object with this information, and uses the UserService to attempt to login
	 * the user. If the login is successful and the user is not marked as deleted, their
	 * session is established, and relevant user attributes are set in the session. Based
	 * on whether the user is a seller or not, they are redirected to their respective home
	 * pages.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    BufferedReader reader = request.getReader();
	    StringBuilder requestData = new StringBuilder();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        requestData.append(line);
	    }

	    JSONObject userData = new JSONObject(requestData.toString());
	    JSONObject userJson = userData.getJSONObject("loggedin");
	    String email = userJson.getString("email");
	    boolean isPasswordCorrect = userJson.getBoolean("isPasswordCorrect");

	    User userObject = fetchUserIDByEmail(email);

	    try {
	        if (isPasswordCorrect && (userObject.getIsDeleted() == 0)) {
	            HttpSession session = request.getSession();
	            session.setAttribute("loggedInEmail", email);
	            session.setAttribute("loggedInUserID", userObject.getUserId());
	            session.setAttribute("loggedInusername", userObject.getUsername());
	            session.setAttribute("loggedIngender", userObject.getGender());
	            session.setAttribute("loggedInmobileNumber", userObject.getMobileNumber());
	            session.setAttribute("loggedIndateOfBirth", userObject.getDateOfBirth());
	            session.setAttribute("loggedInemail", userObject.getEmail());
	            session.setAttribute("loggedInseller", userObject.getIsSeller());

	            if (userObject.getIsSeller() == 0) {
	                response.getWriter().write("Buyer");
	            } else {
	                response.getWriter().write("Seller");
	            }
	        } else {
	            response.getWriter().write("Invalid");
	        }
	    } catch (Exception e) {
	        response.getWriter().write("Error: " + e.getMessage());
	    }
	}



	// fetch userID from the provided email
	public static User fetchUserIDByEmail(String email) {
		User user1 = null;
		// Database query
		String query = "SELECT * FROM freshstocks WHERE email = ?";
		try (Connection connection = ConnectionUtil.getConnection();
				PreparedStatement statement = connection.prepareStatement(query)) {

			statement.setString(1, email);

			try (ResultSet resultSet = statement.executeQuery()) {
				if (resultSet.next()) {
					int userID = resultSet.getInt("user_id");
					String username = resultSet.getString("username");
					String gender = resultSet.getString("gender");
					String mobileNumber = resultSet.getString("mobile_number");
					String dateOfBirth = resultSet.getString("date_of_birth");
					String profilePic = resultSet.getString("avatar_url");
					String userEmail = resultSet.getString("email");
					String password = resultSet.getString("password");
					int isSeller = resultSet.getInt("is_seller");
					String createdAt = resultSet.getString("created_at");
					String modifiedAt = resultSet.getString("modified_at");
					int isDeleted = resultSet.getInt("is_deleted");
					String purchasedCourses;
					if(resultSet.getString("purchased_courses") != null) {
					 purchasedCourses = resultSet.getString("purchased_courses");
					} else {
					 purchasedCourses = "0";
					}
					
					user1 = new User(userID,username,gender,mobileNumber,dateOfBirth,userEmail,password,isSeller,createdAt,modifiedAt,isDeleted,profilePic,purchasedCourses);
				}
			}
		} catch (SQLException | DatabaseException e) {
			e.printStackTrace();
		}
		return user1;
	}

}
