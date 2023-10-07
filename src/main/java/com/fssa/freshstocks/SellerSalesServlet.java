package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.dao.CourseDAO;
import com.fssa.freshstocks.dao.UserDAO;
import com.fssa.freshstocks.dao.exception.DAOException;
import com.fssa.freshstocks.model.Course;
import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;
import com.google.gson.Gson;

/**
 * Servlet implementation class SellerSalesServlet
 */
@WebServlet("/SellerSalesServlet")
public class SellerSalesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession();
        String sellerEmail = (String) session.getAttribute("loggedInEmail");

        Map<String, Integer> salesMap;
        try {
            salesMap = getSellerSales(sellerEmail);
            
            
            System.out.println(salesMap);
            
            for (Entry<String, Integer> entry : salesMap.entrySet()) {
                String course = entry.getKey();
                int salesCount = entry.getValue();
                System.out.println(course + " : " + salesCount);
            }
            
            
        } catch (SQLException | DAOException e) {
            e.printStackTrace();
            salesMap = Collections.emptyMap();
        }

        Gson gson = new Gson();
        String json = gson.toJson(salesMap);

        PrintWriter out = response.getWriter();
        out.write(json);
        out.flush();
	}
	
	
	
	public Map<String, Integer> getSellerSales(String sellerEmail) throws SQLException, DAOException {
	    CourseDAO courseDAO = new CourseDAO();
	    UserService userService = new UserService();
	    UserDAO userDAO = new UserDAO();

	    User seller = null;
	    try {
	        seller = userService.getUserByEmail(sellerEmail);
	    } catch (ServiceException e) {
	        e.printStackTrace();
	    }
	    
	    System.out.println(seller);

	    if (seller != null) {
	        List<Course> sellerCourses = null;
			try {
				sellerCourses = courseDAO.getCoursesBySeller(seller.getUserId());
			} catch (DAOException e) {
				e.printStackTrace();
			}
			
		
			
	        List<User> allUsers = userDAO.getAllUsers(); // Assuming you have a method to get all users

	        Map<String, Integer> salesMap = new HashMap<>();

	        int totalRevenue = 0;
	        
	        for (Course course : sellerCourses) {
	            int salesCount = 0;
	            for (User user : allUsers) {
	                if (user.getPurchasedCourses() != null) {
	                    String[] purchasedCourses = user.getPurchasedCourses().split(",");
	                    for (String courseId : purchasedCourses) {
	                    	System.out.println(course.getCourseID());
	                        if (Integer.parseInt(courseId) == course.getCourseID()) {
	                            salesCount++;
	                            int sellingPrice = course.getSellingPrice();
	                            totalRevenue += sellingPrice; 
	                        }
	                    }
	                }
	            }
	            salesMap.put(course.getName(), salesCount);
	        }
	        
	        salesMap.put("Total Revenue", totalRevenue);
	        
	        return salesMap;
	    }
		return Collections.emptyMap();
	}


}
