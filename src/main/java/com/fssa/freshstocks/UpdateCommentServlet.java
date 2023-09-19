package com.fssa.freshstocks;

import java.io.BufferedReader;

import java.io.IOException;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	    CommentService commentService = new CommentService();	    
	    response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            BufferedReader reader = request.getReader();
            StringBuilder requestData = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                requestData.append(line);
            }

            JSONObject userData = new JSONObject(requestData.toString());
            JSONObject userJson = userData.getJSONObject("editCommentObj");

            String commentBody = userJson.getString("commentBody");
            int commentID = userJson.getInt("commentId");

            Comment comment1 = new Comment(commentBody);

             if (commentService.updateComment(comment1,commentID)) {
                out.print("Comment Updated Successfully!");
            } else {
                out.print("Comment Updation Failed.");
            }
        } catch (JSONException e) {
            out.println("Invalid JSON format.");
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
    	HttpSession session = request.getSession();
        List<Comment> comment = new ArrayList<>();
        int userID = (int) session.getAttribute("loggedInUserID");
        int courseId = Integer.parseInt(request.getParameter("courseId"));
        
    	try {
    		comment = commentService.listComment(courseId);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
    	
    	  Map<String, Object> data = new HashMap<>();
          data.put("comment", comment);
          data.put("userID", userID);
    	

    	// Convert the list to JSON
    	Gson gson = new Gson();
    	String json = gson.toJson(data);

    	// Set the content type and write the JSON to the response
    	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	response.getWriter().write(json);
    }

}
