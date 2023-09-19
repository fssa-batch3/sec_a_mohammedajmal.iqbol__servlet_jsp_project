package com.fssa.freshstocks;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

import com.fssa.freshstocks.dao.exception.DAOException;
import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.services.CourseService;
import com.fssa.freshstocks.utils.ConnectionUtil;
import com.fssa.freshstocks.utils.exception.DatabaseException;
import com.google.gson.Gson;

/**
 * Servlet implementation class SaveCourseServlet
 */
@WebServlet("/SaveCourseServlet")
public class SaveCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Handles HTTP POST requests for updating course information.
	 *
	 * This method retrieves updated course information from the request parameters, such as
	 * cover image, timing, language, marked price, selling price, description, instructor name,
	 * company name, company category, and top skills. It also retrieves the course ID from the
	 * request parameters and sets session attributes with the updated information.
	 *
	 * It then creates a Course object with the updated information and uses the CourseService to
	 * update the course. After updating, the user is redirected back to the seller's home page.
	 *
	 * @param request  The HttpServletRequest object representing the incoming request.
	 * @param response The HttpServletResponse object representing the response to be sent.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs during processing.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
	    CourseService courseService = new CourseService();	    
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
            JSONObject userJson = userData.getJSONObject("updateCourseObj");

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
            int courseId = userJson.getInt("courseID");

    	    Course updatedCourse = new Course(coverImage,
    	        timing, language, markedPrice, sellingPrice,
    	        description, instructorName,
    	        companyName, companyCategory, topSkills, courseVideo1, courseVideo2, courseVideo3, courseVideoName1,
    	         courseVideoName2,courseVideoName3);

             if (courseService.updateCourse(updatedCourse,courseId)) {
                out.print("Course Updated Successfully.");
            } else {
                out.print("Course Updating Failed.");
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
        response.setContentType("application/json");
        
        // Assuming you have a method getCourseByCourseId(int courseId) to retrieve a course object
        int courseId = Integer.parseInt(request.getParameter("courseId"));
        Course course = null;
		try {
			course = getCourseById(courseId);
		} catch (DAOException e) {
			e.printStackTrace();
		}

        // Convert the course object to JSON using Gson
        Gson gson = new Gson();
        String jsonCourse = gson.toJson(course);

        // Send the JSON response
        response.getWriter().write(jsonCourse);
    }
    
	
    public static Course getCourseById(int courseId) throws DAOException {
        try (Connection connection = ConnectionUtil.getConnection()) {
            String sql = "SELECT * FROM course WHERE course_id = ?";
            
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, courseId);
                
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                    	String courseName = resultSet.getString("name");
                        String coverImage = resultSet.getString("cover_image");
                        String timing = resultSet.getString("timing");
                        String language = resultSet.getString("language");
                        int markedPrice = resultSet.getInt("marked_price");
                        int sellingPrice = resultSet.getInt("selling_price");
                        String description = resultSet.getString("description");
                        String instructorName = resultSet.getString("instructor_name");
                        String companyName = resultSet.getString("company_name");
                        String companyCategory = resultSet.getString("company_category");
                        String topSkills = resultSet.getString("top_skills");
                        String courseVideo1 = resultSet.getString("courseVideo1");
                	    String courseVideo2 = resultSet.getString("courseVideo1");
                	    String courseVideo3 = resultSet.getString("courseVideo1");
                	    String courseVideoName1 = resultSet.getString("courseVideoName1");
                	    String courseVideoName2 = resultSet.getString("courseVideoName2");
                	    String courseVideoName3 = resultSet.getString("courseVideoName3");
                	    int userID = resultSet.getInt("user_id");
                        
                        return new Course(courseName,coverImage,timing,language,markedPrice,sellingPrice,description,instructorName
                        		,companyName,companyCategory,topSkills, userID,courseVideo1, courseVideo2, courseVideo3, courseVideoName1,
                   	         courseVideoName2,courseVideoName3);
                    } else {
                        return null; // Course with given ID not found
                    }
                }
            }
        } catch (SQLException | DatabaseException e) {
            throw new DAOException("Failed to retrieve course by ID" + e);
        }
    }
}
