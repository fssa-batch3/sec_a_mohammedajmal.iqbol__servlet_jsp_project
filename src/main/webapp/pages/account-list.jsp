<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
	crossorigin="anonymous"></script>
<meta charset="ISO-8859-1">
<title>Display All accounts</title>
</head>
<body>
	<h1>Display All accounts</h1>

	<table class="table table-bordered">
		<thead>
			<tr>
        <th>S No</th>
        <th>Course Title</th>
        <th>Course Image</th>
        <th>Duration</th>
        <th>Language</th>
        <th>Original Price</th>
        <th>Discounted Price</th>
        <th>Description</th>
        <th>Instructor</th>
        <th>Platform</th>
        <th>Category</th>
        <th>Highlights</th>
        <th>UserId</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="course" items="${COURSE_LIST}" varStatus="loop">

				<tr>
			<td><c:out value="${loop.index + 1}" /></td>
            <td><c:out value="${course.name}" /></td>
            <td><c:out value='${course.coverImage}' /></td>
            <td><c:out value="${course.timing}" /></td>
            <td><c:out value="${course.language}" /></td>
            <td><c:out value="${course.markedPrice}" /></td>
            <td><c:out value="${course.sellingPrice}" /></td>
            <td><c:out value="${course.description}" /></td>
            <td><c:out value="${course.instructorName}" /></td>
            <td><c:out value="${course.companyName}" /></td>
            <td><c:out value="${course.companyCategory}" /></td>
            <td><c:out value="${course.topSkills}" /></td>
            <td><c:out value="${course.userID}" /></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>