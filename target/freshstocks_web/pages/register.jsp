<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up | freshstocks</title>
<link rel="stylesheet" href="../assets/css/register.css">
<script src="assets/js/bundle.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet" crossorigin="anonymous" integrity="">
</head>
<body>
	<main class="fullpage">

		<div class="alert alert-danger" role="alert" style="display: none;"></div>

		<div>
			<img class="nav-logo"
				src="../assets/images/Screenshot_2023-02-11_021952-removebg-preview-removebg-preview.png"
				alt="">
		</div>
		<div class="signup">

			<h1 class="create-h1">
				<br>Create your account
			</h1>

			<!-- form start -->
			<form id="form">
			<ul class="errorMessages" id="errormsg"></ul>
				<div class="input-display">
					<div>
						<div class="form-floating" id="emailinput">
							<input type="text" class="form-control" id="name"
								placeholder="Password" required pattern="[A-Za-z\s]{3,15}"
								name="username"
								title="Username (letters and numbers only, no punctuation or special characters)"
								value="Ajmal"> <label for="username">Username</label>
						</div>
						<br> <select class="form-select" id="select"
							aria-label="Default select example" required name="gender">
							<option disabled selected>Select Your Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select> <br>

						<div class="form-floating mb-3" id="passinput">
							<input type="text" class="form-control" id="mobile-number"
								placeholder="name@example.com" required value="9500320194"
								pattern="[0-9]{10}" title="It should Contain 10 Numbers"
								name="mobilenumber"> <label for="mobile-number">Mobile
								Number</label>
						</div>

						<div class="form-floating mb-3" id="passinput">
							<input type="date" class="form-control" id="date-of-birth"
								value="2004-12-26" required name="dateofbirth" /> <label
								for="date-of-birth">Date of Birth</label>
						</div>

					</div>
					<div>
						<br> <br> <select class="form-select" id="role"
							aria-label="Default select example"
							style="width: 450px; margin-left: 38px;" required name="role">
							<option disabled selected>Select Role</option>
							<option value="0">Buyer</option>
							<option value="1">Seller</option>
						</select> <br>
						<div class="form-floating mb-3" id="passinput">
							<input type="email" class="form-control" id="email" name="email"
								placeholder="name@example.com" required
								value="freekyajmal@gmail.com"
								title="Please Enter the Valid Email" /> <label for="email">Email
								address</label>
						</div>
						<div class="form-floating" id="passinput">
							<input type="password" class="form-control" id="password"
								placeholder="Password" required
								pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$"
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								name="password"> <label for="password">Password</label>
						</div>
						<div class="form-floating" id="passinput">
							<input type="password" class="form-control" id="confirm-password"
								placeholder="Password" required
								pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$"
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								name="confirmpassword"> <label for="confirm-password">Confirm
								Password</label>
						</div>
					</div>

				</div>

				<button class="submit-signup" type="submit">Create an
					account</button>
			</form>
			<div class="signin-link">
				<span class="hint--bottom hint--rounded"
					aria-label="for Existing Users"><a class="login-link"
					href="login.jsp">Already have an account? Sign In to your
						Account</a></span>
			</div>
		</div>



	</main>




	<script src="../assets/js/userRegister.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
		integrity=""></script>
	<script>

// dateofbirth validate
const dobInput = document.getElementById('date-of-birth');
  
  dobInput.addEventListener('input', () => {
    const dob = new Date(dobInput.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    
    if (dob > eighteenYearsAgo) {
      dobInput.setCustomValidity('You must be at least 18 years old to enter this website.');
      alert("You must be at least 18 years old to enter this website.");
      // location.reload();
      
    } else {
      dobInput.setCustomValidity('');
    }
  });

  </script>
	<!-- bpptstrap calling  -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		crossorigin="anonymous" integrity=""></script>
</body>



</html>