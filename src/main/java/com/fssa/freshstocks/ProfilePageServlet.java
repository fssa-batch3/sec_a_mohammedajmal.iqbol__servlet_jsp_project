package com.fssa.freshstocks;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

}
