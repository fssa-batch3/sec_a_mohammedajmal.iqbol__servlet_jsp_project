package com.fssa.freshstocks;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshstocks.model.User;
import com.fssa.freshstocks.services.UserService;
import com.fssa.freshstocks.services.exception.ServiceException;

/**
 * Servlet implementation class AutoLoginServlet
 */
@WebServlet("/autologin")
public class AutoLoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");

        try {
            User userObject = userService.getUserByEmail(email);

            if (userObject != null && userObject.getIsDeleted() == 0) {
                HttpSession session = request.getSession();
                session.setAttribute("loggedInEmail", email);
                session.setAttribute("loggedInUserID", userObject.getUserId());
                session.setAttribute("loggedInusername", userObject.getUsername());
                session.setAttribute("loggedIngender", userObject.getGender());
                session.setAttribute("loggedInmobileNumber", userObject.getMobileNumber());
                session.setAttribute("loggedIndateOfBirth", userObject.getDateOfBirth());
                session.setAttribute("loggedInemail", userObject.getEmail());
                session.setAttribute("loggedInseller", userObject.getIsSeller());

                response.getWriter().write(userObject.getIsSeller() == 0 ? "Buyer" : "Seller");
            } else {
                response.getWriter().write("Invalid");
            }
        } catch (ServiceException e) {
            e.printStackTrace();
            response.getWriter().write("Error: " + e.getMessage());
        }
    }
}
