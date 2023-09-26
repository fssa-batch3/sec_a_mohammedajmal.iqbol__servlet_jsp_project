/**
 * 
 */

 
//user registration page js code start

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //try block starts when code is running properly
  try {

    let name = document.getElementById("name").value;
    let gender = document.getElementById("select").value;
    let mobile_number = document.getElementById("mobile-number").value;
    let date_of_birth = document.getElementById("date-of-birth").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm-password").value;
    let role =  document.getElementById("role").value;


      if (password != confirm_password) {
        alert("password and confirm password not match try again");
      } else if (mobile_number.length > 11) {
        alert("mobile number must contains 10 numbers");
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
          "Please Verify Email \n You have to check the OTP One time Password Sent to You By Us and enter the recieved OTP to Verify Your Account"
        );
        window.location.href = "emailverify.jsp?email=" + email;
      }

    //catch block starts when throws a error
  } catch (error) {
    console.error("Error" + error);
  }
});
