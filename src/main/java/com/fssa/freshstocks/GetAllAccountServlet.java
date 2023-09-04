package com.fssa.freshstocks;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.fssa.freshstocks.model.Course;

/**
 * Servlet implementation class GetAllAccounts
 */
@WebServlet("/GetAllAccountServlet")
public class GetAllAccountServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		List<Course> accounts = new ArrayList<Course>();
		
		accounts.add(new Course("Course32145",
    	        "https://example.com/image1.png",
    	        "10hrs", "English", 3000, 2000,
    	        "the course gives you the fair idea about how to start trading and become a day trader", "Ajmalll",
    	        "freshstocks", "Trading and Finance", "learn core concepts SMC and Technical Analysis", 4));
		accounts.add(new Course("Course31245",
    	        "https://example.com/image1.png",
    	        "10hrs", "English", 4000, 2000,
    	        "the course gives you the fair idea about how to start trading and become a day trader", "Ajmalll",
    	        "freshstocks", "Trading and Finance", "learn core concepts SMC and Technical Analysis", 4));
		accounts.add(new Course("Course33145",
    	        "https://example.com/image1.png",
    	        "10hrs", "English", 5000, 2000,
    	        "the course gives you the fair idea about how to start trading and become a day trader", "Ajmalll",
    	        "freshstocks", "Trading and Finance", "learn core concepts SMC and Technical Analysis", 4));
		JSONArray accountsJSonArray = new JSONArray(accounts);
		PrintWriter out = response.getWriter();
		out.println(accountsJSonArray.toString());
		out.flush();
	}

}
