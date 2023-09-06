package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class UpdateUserServlet
 */
@WebServlet("/UpdateUserServlet")
public class UpdateUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for updating user information.
	 *
	 * This method retrieves the logged-in user's email from the session and new user information
	 * (gender, mobile number, date of birth) from the request parameters. It then creates a User
	 * object with the updated information and uses the UserService to update the user's information
	 * in the database.
	 *
	 * If the update is successful, a success message is printed to the response output, and the
	 * user's session attributes for gender, mobile number, and date of birth are updated. Based on
	 * whether the user is a seller or not, they are redirected to their respective home pages. If
	 * the update fails, an error message is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInemail");

		String newGender = request.getParameter("newGender");
		String newMobileNumber = request.getParameter("newMobileNumber");
		String newDateOfBirth = request.getParameter("newDateOfBirth");

		UserService userService = new UserService();
		PrintWriter out = response.getWriter();

		User updatedUser = new User(newGender, newMobileNumber, newDateOfBirth);

		int loggedInseller = (int) session.getAttribute("loggedInseller");

		try {
			if (userService.updateUser(updatedUser, loggedInEmail)) {
				out.println("User Information Successfully Updated!");

				session.setAttribute("loggedIngender", updatedUser.getGender());
				session.setAttribute("loggedInmobileNumber", updatedUser.getMobileNumber());
				session.setAttribute("loggedIndateOfBirth", updatedUser.getDateOfBirth());

				if (loggedInseller == 0) {
					response.sendRedirect("pages/home.jsp");
				} else {
					response.sendRedirect("pages/sellerhome.jsp");
				}
			} else {
				out.println("Error updating user information.");
			}
		} catch (ServiceException e) {
			out.println("Error: " + e.getLocalizedMessage());
		}
	}

}
