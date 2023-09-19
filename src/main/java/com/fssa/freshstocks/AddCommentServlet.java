package com.fssa.freshstocks;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.fssa.freshstocks.model.Comment;
import com.fssa.freshstocks.services.CommentService;
import com.fssa.freshstocks.services.exception.ServiceException;
import com.google.gson.Gson;

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
	    CommentService commentService = new CommentService();	    
	    response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();

        try {
            BufferedReader reader = request.getReader();
            StringBuilder requestData = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                requestData.append(line);
            }

            JSONObject userData = new JSONObject(requestData.toString());
            JSONObject userJson = userData.getJSONObject("commentObj");

            String commentBody = userJson.getString("comment");
            int courseID = userJson.getInt("courseId");
            int userID = (int) session.getAttribute("loggedInUserID");

            Comment comment1 = new Comment(courseID, userID, commentBody);

             if (commentService.registerComment(comment1)) {
                out.print("Comment Created Successfully.");
            } else {
                out.print("Comment Creation Failed.");
            }
        } catch (JSONException e) {
            out.println("Invalid JSON format.");
        } catch (NumberFormatException e) {
            out.println("Role must be a valid integer.");
        } catch (Exception e) {
        	String exceptionMessage = e.getMessage();
	    	String[] parts = exceptionMessage.split(":");
	    	String errorMessage = parts[1].trim();
	    	out.println(errorMessage);
        }
	}
	
	
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	CommentService commentService = new CommentService();
        Comment comment = null;
        int commentId = Integer.parseInt(request.getParameter("commentId"));
        
    	try {
    		comment = commentService.getCommentByCommentID(commentId);
		} catch (ServiceException e) {
			e.printStackTrace();
		}

    	// Convert the list to JSON
    	Gson gson = new Gson();
    	String json = gson.toJson(comment);

    	// Set the content type and write the JSON to the response
    	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	response.getWriter().write(json);
    }

}
