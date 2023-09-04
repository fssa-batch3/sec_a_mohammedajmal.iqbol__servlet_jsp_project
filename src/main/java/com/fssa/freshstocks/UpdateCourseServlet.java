package com.fssa.freshstocks;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.dao.exception.DAOException;
import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.utils.ConnectionUtil;

/**
 * Servlet implementation class UpdateCourseServlet
 */
@WebServlet("/UpdateCourseServlet")
public class UpdateCourseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateCourseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int courseId = Integer.parseInt(request.getParameter("courseId"));
        HttpSession session = request.getSession();
        // Fetch the course details based on courseId and set them in request attributes
        try {
        	Course course = getCourseById(courseId);
        	
            session.setAttribute("courseId", courseId);
            session.setAttribute("courseName", course.getName());
            session.setAttribute("courseCoverImage", course.getCoverImage());
            session.setAttribute("courseTiming", course.getTiming());
            session.setAttribute("courseLanguage", course.getLanguage());
            session.setAttribute("courseMarkedPrice", course.getMarkedPrice());
            session.setAttribute("courseSellingPrice", course.getSellingPrice());
            session.setAttribute("courseDescription", course.getDescription());
            session.setAttribute("courseInstructorName", course.getInstructorName());
            session.setAttribute("courseCompanyName", course.getCompanyName());
            session.setAttribute("courseCompanyCategory", course.getCompanyCategory());
            session.setAttribute("courseTopSkills", course.getTopSkills());
            
		} catch (DAOException e) {
			e.printStackTrace();
		}
        
        request.getRequestDispatcher("/pages/editcourse.jsp").forward(request, response);
    }
    
    
    public static Course getCourseById(int courseId) throws DAOException {
        try (Connection connection = ConnectionUtil.getConnection()) {
            String sql = "SELECT * FROM course WHERE course_id = ?";
            
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, courseId);
                
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
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
                        
                        return new Course(coverImage,timing,language,markedPrice,sellingPrice,description,instructorName
                        		,companyName,companyCategory,topSkills);
                    } else {
                        return null; // Course with given ID not found
                    }
                }
            }
        } catch (SQLException e) {
            throw new DAOException("Failed to retrieve course by ID" + e);
        }
    }

}
