<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%> 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign In | freshstocks</title>
<link rel="stylesheet" href="../assets/css/signin.css">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script src="../assets/js/bundle.js"></script>
</head>
<body>
	<main class="fullpage">
		<%
		String errormsg = request.getParameter("error");
		if (errormsg != null) {
		%>
		<div class="alert alert-danger" role="alert">
			<%=errormsg%>
		</div>
		<%
		}
		%>
		<div>
			<img class="nav-logo"
				src="../assets/images/Screenshot_2023-02-11_021952-removebg-preview-removebg-preview.png"
				alt="">
		</div>
		<div class="signup">

			<h1 class="create-h1">
				<br>Log In to your account
			</h1>
			<!-- form start -->
			<form id="form">
				<div class="form-floating mb-3" id="emailinput">
					<input type="email" class="form-control" id="email"
						placeholder="name@example.com" value="freekyajmal@gmail.com"
						name="email" required> <label for="email">Email
						address</label>
				</div>
				<div class="form-floating" id="passinput">
					<input type="password" class="form-control" id="password"
						placeholder="Password" value="Ajmal@123" name="password" required>
					<label for="password">Password</label>
				</div>

				<div class="remember-forgot-div">
					<p class="remember-p">
						<span class="hint--top hint--rounded"
							aria-label="Remember Next Time"><input type="checkbox" id="remember-me">&nbsp;Remember
							Me </span>
					</p>
					<a class="forgot-p" href="resetpassword.jsp"><span
						class="hint--top hint--rounded"
						aria-label="Reset Your Old Password">Forgot Password?</span></a>
				</div>

				<button class="submit-signup" type="submit">Log In</button>
			</form>
			<div class="signin-link">
				<a href="register.jsp"><span class="hint--bottom hint--rounded"
					aria-label="Not an Existing User">Dont Have an Account ?
						Sign Up</span></a>
			</div>
		</div>
		</div>


		<div id="google_translate_element"></div>


	</main>


<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
		integrity=""></script>
	<script src="../assets/js/userlogin.js"></script>
	<!-- bpptstrap calling  -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>

</html>