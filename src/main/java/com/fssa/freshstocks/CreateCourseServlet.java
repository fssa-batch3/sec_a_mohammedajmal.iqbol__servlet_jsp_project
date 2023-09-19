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

import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.services.CourseService;


/**
 * Servlet implementation class AddCourse
 */
@WebServlet("/CreateCourseServlet")
public class CreateCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * Handles HTTP POST requests for creating and registering a new course listing
	 * by a seller.
	 *
	 * This method retrieves various course-related information from the request parameters,
	 * including the course name, cover image URL, timing, language, marked price, selling price,
	 * description, instructor name, company name, company category, top skills, and the logged-in
	 * user's ID. It also records the current date and time as the course's creation timestamp.
	 *
	 * It then creates a new Course object with the provided information and attempts to register
	 * it using the CourseService. If the course registration is successful, the user is redirected
	 * to the seller's home page. If an error occurs during the registration process, an error message
	 * is printed to the response output.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	    
	    CourseService courseService = new CourseService();	    
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
            JSONObject userJson = userData.getJSONObject("courseObj");

            String name = userJson.getString("name");
            String coverImage = userJson.getString("coverImage");
            String timing = userJson.getString("timing");
            String language = userJson.getString("language");
            int markedPrice = userJson.getInt("markedPrice");
            int sellingPrice = userJson.getInt("sellingPrice");
            String description = userJson.getString("description");
            String instructorName = userJson.getString("instructorName");
            String companyName = userJson.getString("companyName");
            String companyCategory = userJson.getString("companyCategory");
            String topSkills = userJson.getString("topSkills");
            String courseVideo1 = userJson.getString("courseVideo1");
            String courseVideo2 = userJson.getString("courseVideo2");
            String courseVideo3 = userJson.getString("courseVideo3");
            String courseVideoName1 = userJson.getString("courseVideoName1");
            String courseVideoName2 = userJson.getString("courseVideoName2");
            String courseVideoName3 = userJson.getString("courseVideoName3");
            int userID = (int) session.getAttribute("loggedInUserID");

    	    Course course1 = new Course(name,
    	        coverImage,
    	        timing, language, markedPrice, sellingPrice,
    	        description, instructorName,
    	        companyName, companyCategory, topSkills, userID, courseVideo1, courseVideo2, courseVideo3, courseVideoName1,
    	         courseVideoName2,courseVideoName3);

             if (courseService.registerCourse(course1)) {
                out.print("Course Created Successfully.");
            } else {
                out.print("Course Creation Failed.");
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

}
