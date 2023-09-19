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

import com.fssa.freshstocks.model.*;
import com.fssa.freshstocks.services.UserService;

/**
 * Servlet implementation class RegistrationServlet
 */


@WebServlet("/registration")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for user registration.
	 *
	 * This method retrieves user registration information such as username, gender, mobile number,
	 * date of birth, email, password, and role from the request parameters. It then creates a User
	 * object with this information and uses the UserService to attempt user registration. If the
	 * registration is successful and the password matches the confirm password, a success message
	 * is printed to the response output, and the user is redirected to the login page. If the
	 * registration fails due to password mismatch or any other error, an appropriate error message
	 * is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
            JSONObject userJson = userData.getJSONObject("user");

            String username = userJson.getString("name");
            String gender = userJson.getString("gender");
            String mobileNumber = userJson.getString("mobile_number");
            String dateOfBirth = userJson.getString("date_of_birth");
            String email = userJson.getString("email");
            String password = userJson.getString("password");
            int role = userJson.getInt("role");

            UserService userService = new UserService();
            User user = new User(username, gender, mobileNumber, dateOfBirth, email, password, role);

             if (userService.registerUser(user)) {
                out.println("User Registered Successfully.");
                
                // Passing email for getting userID
        	    User userObject = IndexServlet.fetchUserIDByEmail(email);
                
                session.setAttribute("loggedInEmail", email);
	            session.setAttribute("loggedInUserID", userObject.getUserId());
	            session.setAttribute("loggedInusername", userObject.getUsername());
	            session.setAttribute("loggedIngender", userObject.getGender());
	            session.setAttribute("loggedInmobileNumber", userObject.getMobileNumber());
	            session.setAttribute("loggedIndateOfBirth", userObject.getDateOfBirth());
	            session.setAttribute("loggedInemail", userObject.getEmail());
	            session.setAttribute("loggedInseller", userObject.getIsSeller());
	            
            } else {
                out.println("User Registration Failed.");
            }
        } catch (JSONException e) {
            out.println("Invalid JSON format.");
        } catch (NumberFormatException e) {
            out.println("Role must be a valid integer.");
        } catch (Exception e) {
            out.println("Internal Server Error: " + e.getMessage());
        }
	}
}