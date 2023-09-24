<%@page import="com.fssa.freshstocks.model.Comment"%>
<%@page import="com.fssa.freshstocks.services.CommentService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<%
  int commentId = Integer.parseInt(request.getParameter("commentId"));
  CommentService commentService = new CommentService();
 Comment comment1 = commentService.getCommentByCommentID(commentId);

%>
 <form action="../UpdateCommentServlet" method="post">
        <input type="hidden" name="commentId" value="<%= commentId %>">
        <textarea name="editedContent"><%= comment1.getComment() %></textarea>
        <button type="submit">Save Changes</button>
    </form>
</body>
</html>