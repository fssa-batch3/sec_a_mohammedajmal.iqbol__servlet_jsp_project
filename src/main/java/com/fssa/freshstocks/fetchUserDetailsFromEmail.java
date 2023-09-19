package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshstocks.model.User;

/**
 * Servlet implementation class fetchUserDetailsFromEmail
 */
@WebServlet("/fetchUserDetailsFromEmail")
public class fetchUserDetailsFromEmail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String email = request.getParameter("email"); // Assuming you're passing email as a parameter

        try {
            User user = IndexServlet.fetchUserIDByEmail(email);

            // Assuming you have a method to convert User object to JSON string
            String userJsonString = convertUserToJson(user);

            out.println(userJsonString);
        } catch (Exception e) {
            e.printStackTrace();
            out.println("{\"error\":\"An error occurred.\"}");
        }
    }
    
    private String convertUserToJson(User user) {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{");
        jsonBuilder.append("\"userID\":").append(user.getUserId()).append(",");
        jsonBuilder.append("\"username\":\"").append(user.getUsername()).append("\",");
        jsonBuilder.append("\"gender\":\"").append(user.getGender()).append("\",");
        jsonBuilder.append("\"mobileNumber\":\"").append(user.getMobileNumber()).append("\",");
        jsonBuilder.append("\"dateOfBirth\":\"").append(user.getDateOfBirth()).append("\",");
        jsonBuilder.append("\"purchasedCourses\":\"").append(user.getPurchasedCourses()).append("\",");
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
