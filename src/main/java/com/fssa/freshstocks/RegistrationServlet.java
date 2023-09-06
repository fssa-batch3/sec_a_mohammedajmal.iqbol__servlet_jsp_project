package com.fssa.freshstocks;

import java.io.IOException;

import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshstocks.model.*;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class RegistrationServlet
 */


@WebServlet("/registration")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for user registration.
	 *
	 * This method retrieves user registration information such as username, gender, mobile number,
	 * date of birth, email, password, and role from the request parameters. It then creates a User
	 * object with this information and uses the UserService to attempt user registration. If the
	 * registration is successful and the password matches the confirm password, a success message
	 * is printed to the response output, and the user is redirected to the login page. If the
	 * registration fails due to password mismatch or any other error, an appropriate error message
	 * is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String username = request.getParameter("username");
	    String gender = request.getParameter("gender");
	    String mobileNumber = request.getParameter("mobilenumber");
	    String dateOfBirth = request.getParameter("dateofbirth");
	    String email = request.getParameter("email");
	    String password = request.getParameter("password");
	    String confirmPassword = request.getParameter("confirmpassword");
	    int role = Integer.parseInt(request.getParameter("role"));

	    UserService userService = new UserService();
	    PrintWriter out = response.getWriter();

	    User user = new User(username, gender, mobileNumber, dateOfBirth, email, password, role);

	    try {
	        if (password.equals(confirmPassword)) {
	            if (userService.registerUser(user)) {
	                response.sendRedirect("pages/register.jsp?registrationSuccess=1");
	            } else {
	                response.sendRedirect("pages/register.jsp?registrationError=1");
	            }
	        } else {
	            response.sendRedirect("pages/register.jsp?passwordMismatch=1");
	        }
	    } catch (ServiceException e) {
	    	String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[1].trim();
	    	response.sendRedirect("pages/register.jsp?otherError=" + errorMessage);
	    }
	}

}