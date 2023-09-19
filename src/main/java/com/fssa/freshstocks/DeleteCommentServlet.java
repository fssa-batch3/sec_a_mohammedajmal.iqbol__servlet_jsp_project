package com.fssa.freshstocks;

import java.io.IOException;

import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fssa.freshstocks.services.CommentService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class DeleteCommentServlet
 */
@WebServlet("/DeleteCommentServlet")
public class DeleteCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * Handles HTTP GET requests for deleting a comment associated with a course.
	 *
	 * This method retrieves the comment ID and the currently logged-in course ID
	 * from the request parameters and session, respectively. It also creates an instance
	 * of CommentService to handle the comment deletion.
	 *
	 * It attempts to delete the specified comment using the CommentService. If the deletion
	 * is successful, a success message is printed to the response output, and the user is
	 * redirected to the course details page. If the deletion fails or an error occurs during
	 * the process, an appropriate error message is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 PrintWriter out = response.getWriter();
			int commentId = Integer.parseInt(request.getParameter("commentId"));
			CommentService commentService = new CommentService();
			final int isDeleted = 1;
			
			try {
	            if(commentService.deleteComment(commentId, isDeleted)) {
	            	out.println("Comment with CommentID: " + commentId  + " Deleted Successfully!");
	            } else {
	            	out.println("Error! Course Deleted Unsuccessful!");
	            }
	        } catch (ServiceException e) {
	        	out.println("Error: " + e.getMessage());
	        }
	}

}
