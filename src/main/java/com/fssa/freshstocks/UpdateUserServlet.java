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
	 * Handles HTTP POST requests for updating user information.
	 *
	 * This method retrieves the logged-in user's email from the session and new user information
	 * (gender, mobile number, date of birth) from the request parameters. It then creates a User
	 * object with the updated information and uses the UserService to update the user's information
	 * in the database.
	 *
	 * If the update is successful, a success message is printed to the response output, and the
	 * user's session attributes for gender, mobile number, and date of birth are updated. Based on
	 * whether the user is a seller or not, they are redirected to their respective home pages. If
	 * the update fails, an error message is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();
		
		try {
		BufferedReader reader = request.getReader();
	    StringBuilder requestData = new StringBuilder();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        requestData.append(line);
	    }

	    JSONObject userData = new JSONObject(requestData.toString());
	    JSONObject userJson = userData.getJSONObject("newUserObj");

            String gender = userJson.getString("gender");
            String userprofile = userJson.getString("userprofile");
            String mobileNumber = userJson.getString("mobile_number");
            String dateOfBirth = userJson.getString("date_of_birth");

            UserService userService = new UserService();
            User user = new User(userprofile,gender, mobileNumber, dateOfBirth);
            String email = (String) session.getAttribute("loggedInEmail");

             if (userService.updateUser(user,email)) {
                out.println("User Profile Updated Successfully.");
	            
            } else {
                out.println("User Profile Updating Failed.");
            }
        } catch (JSONException e) {
            out.println("Invalid JSON format.");
        } catch (NumberFormatException e) {
            out.println("Role must be a valid integer.");
        } catch (Exception e) {
        	String exceptionMessage = e.getMessage();
	    	String sub = exceptionMessage.substring(64);
	    	out.println(sub);
        }
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    // Assuming you have a method getUserProfileData() to get user profile data
		HttpSession session = request.getSession();
		UserService userService = new UserService();
		String email = (String) session.getAttribute("loggedInEmail");
	    User userProfile = null;
		try {
			userProfile = userService.getUserByEmail(email);
		} catch (ServiceException e) {
			e.printStackTrace();
		} 
	    
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    
	    // Assuming you have a utility method to convert the user profile to JSON
	    String jsonUserProfile = convertUserProfileToJson(userProfile);
	    
	    response.getWriter().write(jsonUserProfile);
	}
	
    private String convertUserProfileToJson(User user) {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{");
        jsonBuilder.append("\"userID\":").append(user.getUserId()).append(",");
        jsonBuilder.append("\"username\":\"").append(user.getUsername()).append("\",");
        jsonBuilder.append("\"gender\":\"").append(user.getGender()).append("\",");
        jsonBuilder.append("\"profilePic\":\"").append(user.getProfilePic()).append("\",");
        jsonBuilder.append("\"mobileNumber\":\"").append(user.getMobileNumber()).append("\",");
        jsonBuilder.append("\"dateOfBirth\":\"").append(user.getDateOfBirth()).append("\",");
        jsonBuilder.append("\"userEmail\":\"").append(user.getEmail()).append("\",");
        jsonBuilder.append("\"password\":\"").append(user.getPassword()).append("\",");
        jsonBuilder.append("\"isSeller\":").append(user.getIsSeller()).append(",");
        jsonBuilder.append("\"createdAt\":\"").append(user.getCreatedAt()).append("\",");
        jsonBuilder.append("\"modifiedAt\":\"").append(user.getModifiedAt()).append("\",");
        jsonBuilder.append("\"isDeleted\":").append(user.getIsDeleted());
        jsonBuilder.append("}");
        return jsonBuilder.toString();
    }

}
