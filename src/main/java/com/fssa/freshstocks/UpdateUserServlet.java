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
     * @see HttpServlet#HttpServlet()
     */
    public UpdateUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
	        if (userService.updateUser(updatedUser,loggedInEmail)) {
	            out.println("User Information Successfully Updated!");
	            
	            session.setAttribute("loggedIngender", updatedUser.getGender());
	            session.setAttribute("loggedInmobileNumber", updatedUser.getMobileNumber());
	            session.setAttribute("loggedIndateOfBirth", updatedUser.getDateOfBirth());
	            
	        	if(loggedInseller == 0) {
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
