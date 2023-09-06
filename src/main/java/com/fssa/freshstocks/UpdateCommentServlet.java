package com.fssa.freshstocks;

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
 * Servlet implementation class UpdateCommentServlet
 */
@WebServlet("/UpdateCommentServlet")
public class UpdateCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Handles HTTP POST requests for updating a comment's content.
	 *
	 * This method retrieves the comment ID and the edited content from the request parameters.
	 * It also retrieves the course ID from the user's session. It then creates a Comment object
	 * with the edited content.
	 *
	 * The method uses the CommentService to update the comment's content in the database. If the
	 * update is successful, the user is redirected to the course details page with the updated
	 * comments. If an error occurs during the update process, an appropriate error message is
	 * printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Retrieve comment ID and edited content from the request
		HttpSession session = request.getSession(false);
		PrintWriter out = response.getWriter();
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        String editedContent = request.getParameter("editedContent");
        int courseID = (int) session.getAttribute("loggedInCourseID");
        
        Comment comment1 = new Comment(editedContent);
        // Call a service method to update the comment in the database
        CommentService commentService = new CommentService();
        try {
            commentService.updateComment(comment1, commentId);
            response.sendRedirect("/freshstocks_web/pages/details.jsp?courseID=" + courseID);
        } catch (ServiceException e) {
            out.println(e.getMessage());
        }
    }

}
