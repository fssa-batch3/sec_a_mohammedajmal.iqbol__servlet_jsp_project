/**
 * 
 */

 
//user registration page js code start

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    let name = document.getElementById("name").value.trim();
    let gender = document.getElementById("select").value;
    let mobile_number = document.getElementById("mobile-number").value.trim();
    let date_of_birth = document.getElementById("date-of-birth").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm-password").value;
    let role = document.getElementById("role").value;

    // Regex validation
    let nameRegex = /^[A-Za-z\s]+$/;
    let mobileNumberRegex = /^[6-9]\d{9}$/;
    let dateOfBirthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name.match(nameRegex)) {
      document.getElementById("errormsg").innerText = "Please enter a valid name (only letters and spaces)";
		document.getElementById("errormsg").style.display = "block";
    } else if (gender === "Select Your Gender") {
      document.getElementById("errormsg").innerText = "Please select a valid gender";
		document.getElementById("errormsg").style.display = "block";
    } else if (!mobile_number.match(mobileNumberRegex)) {
      document.getElementById("errormsg").innerText = "Please enter a valid 10-digit mobile number";
		document.getElementById("errormsg").style.display = "block";
    } else if (!dateOfBirthRegex.test(date_of_birth)) {
      document.getElementById("errormsg").innerText = "Please enter a valid date of birth (yyyy-mm-dd)";
		document.getElementById("errormsg").style.display = "block";
    } else if (!email.match(emailRegex)) {
      document.getElementById("errormsg").innerText = "Please enter a valid email address";
		document.getElementById("errormsg").style.display = "block";
    } else if (password !== confirm_password) {
      document.getElementById("errormsg").innerText = "Password and Confirm Password do not match. Please try again";
		document.getElementById("errormsg").style.display = "block";
    } else if (role === "Select Role") {
      document.getElementById("errormsg").innerText = "Please select a valid role";
		document.getElementById("errormsg").style.display = "block";
    } else {
      let birthDate = new Date(date_of_birth);
      let minDate = new Date("1900-01-01");

      if (birthDate <= minDate) {
        document.getElementById("errormsg").innerText = "Please enter a valid date of birth";
		document.getElementById("errormsg").style.display = "block";
    } else {
      let today = new Date();
      let birthDate = new Date(date_of_birth);
      let age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        document.getElementById("errormsg").innerText = "You must be at least 18 years old to register";
		document.getElementById("errormsg").style.display = "block";
      } else {
		
		axios.get(`/freshstocks_web/fetchUserDetailsFromEmail?email=${email}`)
		.then(response => {
			const res = response.data;
			console.log(res);
			
			const fetchedemail = res.userEmail;
			
			if(fetchedemail != null) {
				document.getElementById("errormsg").innerText = "You are Already have an account! Kindly Login";
	         	document.getElementById("errormsg").style.display = "block";
				return;
			} else {
				
	  let user = {
          name,
          gender,
          mobile_number,
          date_of_birth,
          email,
          password,
          confirm_password,
          role,
        };

        sessionStorage.setItem('user', JSON.stringify(user));

        alert(
          "Please Verify Email\nYou have to check the OTP (One Time Password) sent to you by us and enter the received OTP to verify your account"
        );
        window.location.href = "emailverify.jsp?email=" + email;
        
			}
		})
		.catch(error => {
			console.error(error);
		});
      }
    }
}
  } catch (error) {
    console.error("Error" + error);
  }
});

