package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class LogoutServlet
 */
@WebServlet("/LogoutServlet")
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP GET requests for user logout.
	 *
	 * This method checks if a session exists and if so, removes specific session
	 * attributes related to the user's login (e.g., email and userID) and
	 * invalidates the session. This effectively logs the user out. If no session
	 * exists, it prints a message indicating that no session exists.
	 *
	 * After logging out, the user is redirected to the login page.
	 *
	 * @param request  The HttpServletRequest object representing the incoming
	 *                 request.
	 * @param response The HttpServletResponse object representing the response to
	 *                 be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		PrintWriter out = response.getWriter();

		if (session != null) {
			session.removeAttribute("loggedInEmail");
			session.removeAttribute("loggedInUserID");
			System.out.println("Existing Session ID:" + session.getId());

			// invalidate removes all the session attributes
			session.invalidate();
			out.println("User Logged Out Successful");
		} else {
			out.println("No Session Exists");
		}
	}

}