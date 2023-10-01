package com.fssa.freshstocks;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EnvironmentalVariablesServlet
 */
@WebServlet("/ENVServlet")
public class EnvironmentalVariablesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		StringBuilder jsonConfigString = new StringBuilder("{");

		String[] keys = {
		    "CRYPTO_RAPID_KEY",
		    "CRYPTO_RAPID_HOST",
		    "FOREX_RAPID_KEY",
		    "FOREX_RAPID_HOST",
		    "ALPHAVANTAGE_API_KEY",
		    "TWELVEDATA_API_KEY"
		};

		String[] values = {
		    System.getenv("CRYPTO_RAPID_KEY"),
		    System.getenv("CRYPTO_RAPID_HOST"),
		    System.getenv("FOREX_RAPID_KEY"),
		    System.getenv("FOREX_RAPID_HOST"),
		    System.getenv("ALPHAVANTAGE_API_KEY"),
		    System.getenv("TWELVEDATA_API_KEY")
		};

		for (int i = 0; i < keys.length; i++) {
		    jsonConfigString.append("\"").append(keys[i]).append("\":\"").append(values[i]).append("\"");
		    if (i < keys.length - 1) {
		        jsonConfigString.append(",");
		    }
		}

		jsonConfigString.append("}");

		String jsonString = jsonConfigString.toString();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jsonString);

	}

}
