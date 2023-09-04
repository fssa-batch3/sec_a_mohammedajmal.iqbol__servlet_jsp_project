package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.services.CommentService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class DeleteCommentServlet
 */
@WebServlet("/DeleteCommentServlet")
public class DeleteCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteCommentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 PrintWriter out = response.getWriter();
			HttpSession session = request.getSession();
			int commentId = Integer.parseInt(request.getParameter("commentId"));
			int courseID = (int) session.getAttribute("loggedInCourseID");
			CommentService commentService = new CommentService();
			final int isDeleted = 1;
			
			try {
	            if(commentService.deleteComment(commentId, isDeleted)) {
	            	out.println("Comment with CommentID: " + commentId  + " Deleted Successfully!");
	            	
	            	response.sendRedirect("/freshstocks_web/pages/details.jsp?courseID=" + courseID);
	            } else {
	            	out.println("Error! Course Deleted Unsuccessful!");
	            }
	        } catch (ServiceException e) {
	        	out.println("Error: " + e.getMessage());
	        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//       
//	}

}
