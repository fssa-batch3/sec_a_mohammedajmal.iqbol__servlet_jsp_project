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
     * @see HttpServlet#HttpServlet()
     */
    public deleteUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
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

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
