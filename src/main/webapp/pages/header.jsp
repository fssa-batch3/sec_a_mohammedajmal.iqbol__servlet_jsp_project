<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>header page</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
	crossorigin="anonymous"></script>
</head>
<body>

	<nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary"
		data-bs-theme="dark">

		<div class="container-fluid">

			<a class="navbar-brand" href="sellerhome.jsp">freshstocks</a>

			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false"
				aria-label="Toggle navigation">

				<span class="navbar-toggler-icon"></span>

			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">

				<ul class="navbar-nav me-auto mb-2 mb-lg-0">

					<li class="nav-item"><a class="nav-link active"
						aria-current="page" href="home.jsp">Home</a></li>

					<%
					String loggedInEmail = (String) session.getAttribute("loggedInEmail");

					if (loggedInEmail == null) {
					%>

					<li class="nav-item"><a class="nav-link" href="login.jsp">Login</a>

					</li>

					<li class="nav-item"><a class="nav-link" href="register.jsp">Register</a>

					</li>

					<%
					} else {
					%>

					<li class="nav-item"><a class="nav-link" href="#"><%=loggedInEmail%></a>

					</li>

					<li class="nav-item"><a class="nav-link"
						href="../LogoutServlet">Logout</a></li>

					<%
					}
					%>

				</ul>
			</div>
		</div>
	</nav>
</body>
</html>