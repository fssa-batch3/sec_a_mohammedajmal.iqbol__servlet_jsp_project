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

/**
 * Servlet implementation class UpdateUserPasswordServlet
 */
@WebServlet("/UpdateUserPasswordServlet")
public class UpdateUserPasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
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
	    JSONObject userJson = userData.getJSONObject("newUserPasswordObj");

            String password = userJson.getString("hashedpassword");
            String email = userJson.getString("email");
            UserService userService = new UserService();

             if (userService.updateUserPassword(password,email)) {
                out.println("User Password Updated Successfully.");
            } else {
                out.println("User Password Updating Failed.");
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
