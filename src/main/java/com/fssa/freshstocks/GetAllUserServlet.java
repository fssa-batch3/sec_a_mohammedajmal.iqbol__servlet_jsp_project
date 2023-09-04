package com.fssa.freshstocks;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshstocks.model.User;

@WebServlet("/GetAllUserServlet")
public class GetAllUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Create a list of User objects
		List<User> users = new ArrayList<>();

		// Populate the list with user data
		users.add(new User(1, "karan", "karan@fssa.freshworks.com", "password123"));
		users.add(new User(2, "shiva", "shiva@fssa.freshworks.com", "ps322211"));
		users.add(new User(3, "Ajmal", "ajmal@freshworks.com", "sri@pass3"));
		users.add(new User(4, "Mohammed", "mohammedajmal.iqbol@fssa.freshworks.com", "Jp@pass3"));

		// Set the list of users in the request attribute
		request.setAttribute("userList", users);

		// Forward the request to the JSP for display
		request.getRequestDispatcher("listusers.jsp").forward(request, response);
	}
}
