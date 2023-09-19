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
import com.fssa.freshstocks.services.UserService;

/**
 * Servlet implementation class deleteUserServlet
 */
@WebServlet("/deleteUserServlet")
public class deleteUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
	 * Handles HTTP GET requests for deleting a user account.
	 *
	 * This method retrieves the user's email address from the request parameters and creates
	 * an instance of UserService to handle the user deletion. It also sets a constant value
	 * 'isDeleted' to indicate that the user should be marked as deleted.
	 *
	 * It attempts to delete the user account using the UserService. If the deletion is successful,
	 * a success message is printed to the response output, and the user's session is invalidated
	 * to log them out. Then, the user is redirected to the index.html page. If the deletion fails
	 * or an error occurs during the process, an appropriate error message is printed to the
	 * response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
    JSONObject userJson = userData.getJSONObject("deleteUserObj");

        int isDeleted = Integer.parseInt(userJson.getString("isDeleted"));

        UserService userService = new UserService();
        String email = (String) session.getAttribute("loggedInEmail");

         if (userService.deleteUser(email,isDeleted)) {
            out.println("User Profile Deleted Successfully.");
            session.invalidate();
        } else {
            out.println("User Profile Deleted Failed.");
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
