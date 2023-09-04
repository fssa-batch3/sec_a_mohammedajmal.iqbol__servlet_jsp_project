package com.fssa.freshstocks;

import java.io.IOException;

import java.io.PrintWriter;
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
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;
import com.fssa.freshstocks.utils.ConnectionUtil;

/**
 * Servlet implementation class IndexServlet
 */
@WebServlet("/IndexServlet")
public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public IndexServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// get method
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		PrintWriter out = response.getWriter();
		User user1 = new User(email, password);
		UserService userService = new UserService();

		// create session
		HttpSession session = request.getSession();
		
		// passing email for getting userID
		User userObject = fetchUserIDByEmail(email);

		try {
			if (userService.loginUser(user1) && (userObject.getIsDeleted() == 0)) {

				// setting attributes in session
				session.setAttribute("loggedInEmail", email);
				session.setAttribute("loggedInUserID", userObject.getUserId());
				
				session.setAttribute("loggedInusername", userObject.getUsername());
                session.setAttribute("loggedIngender", userObject.getGender());
                session.setAttribute("loggedInmobileNumber", userObject.getMobileNumber());
                session.setAttribute("loggedIndateOfBirth", userObject.getDateOfBirth());
                session.setAttribute("loggedInemail", userObject.getEmail());
                session.setAttribute("loggedInseller", userObject.getIsSeller());
                
				if(userObject.getIsSeller() == 0) {
					response.sendRedirect("pages/home.jsp");
				} else {
					response.sendRedirect("pages/sellerhome.jsp");
				}
			} else {
				out.println("Invalid email or password");
			}
		} catch (ServiceException e) {
			out.println(e.getMessage());
		}
	}

	// fetch userID from the provided email
	private User fetchUserIDByEmail(String email) {
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
					String userEmail = resultSet.getString("email");
					int isSeller = resultSet.getInt("is_seller");
					String createdAt = resultSet.getString("created_at");
					String modifiedAt = resultSet.getString("modified_at");
					int isDeleted = resultSet.getInt("is_deleted");
					
					user1 = new User(userID,username,gender,mobileNumber,dateOfBirth,userEmail,isSeller,createdAt,modifiedAt,isDeleted);
                     
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user1;
	}

}
