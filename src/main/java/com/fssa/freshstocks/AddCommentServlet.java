package com.fssa.freshstocks;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.Comment;
import com.fssa.freshstocks.services.CommentService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class AddCommentServlet
 */
@WebServlet("/AddCommentServlet")
public class AddCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * Handles HTTP POST requests for submitting comments on a course page.
	 *
	 * This method retrieves the user's comment from the request parameters, along
	 * with the user's session information (user ID and course ID). It then creates
	 * a new Comment object with the provided information and attempts to register
	 * it using the CommentService. If successful, the user is redirected to the
	 * course details page with the updated comments. If an error occurs during the
	 * registration process, an error message is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession();
	    PrintWriter out = response.getWriter();
	    
	    CommentService commentService = new CommentService();
	    
		String commentBody = request.getParameter("comment");
		int userID = (int) session.getAttribute("loggedInUserID");
		int courseID = (int) session.getAttribute("loggedInCourseID");
		
		Comment comment1 = new Comment(courseID, userID, commentBody);
		
        try {
            commentService.registerComment(comment1);
            response.sendRedirect(request.getContextPath() + "/pages/details.jsp?courseID=" + courseID);
        } catch (ServiceException e) {
        	out.println("Error: " + e.getMessage());
        }
	}

}
