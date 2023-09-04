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
     * Default constructor. 
     */
    public RegistrationServlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
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
        
        User user1 = new User(username, gender, mobileNumber, dateOfBirth, email, password, role);
        try {
            if(password.equals(confirmPassword)) {
        	if (userService.registerUser(user1)) {
                out.println("User Successfully Registered!");
                
                response.sendRedirect("pages/login.html");
            } else {
                out.println("Invalid Email And Password");
            }
            } else {
            	out.println("Password and Confirm Password Doesn't Match");
            }
        } catch (ServiceException e) {
            e.printStackTrace();
        }
    }
}