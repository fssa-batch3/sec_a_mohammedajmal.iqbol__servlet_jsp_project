package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class deleteUserServlet
 */
@WebServlet("/deleteUserServlet")
public class deleteUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
	 * Handles HTTP GET requests for deleting a user account.
	 *
	 * This method retrieves the user's email address from the request parameters and creates
	 * an instance of UserService to handle the user deletion. It also sets a constant value
	 * 'isDeleted' to indicate that the user should be marked as deleted.
	 *
	 * It attempts to delete the user account using the UserService. If the deletion is successful,
	 * a success message is printed to the response output, and the user's session is invalidated
	 * to log them out. Then, the user is redirected to the index.html page. If the deletion fails
	 * or an error occurs during the process, an appropriate error message is printed to the
	 * response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		String userEmail = request.getParameter("userEmail");
		UserService userService = new UserService();
		final int isDeleted = 1;
		
		try {
            if(userService.deleteUser(userEmail, isDeleted)) {
            	out.println("User Deleted Successfully!");
            	
            	HttpSession session = request.getSession();
                session.invalidate(); // Invalidate the current session to log out
            	
            	response.sendRedirect("index.html");
            } else {
            	out.println("Error! User Deleted Unsuccessful!");
            }
        } catch (ServiceException e) {
        	out.println("Error: " + e.getMessage());
        }
	}

}
