/**
 * 
 */

 
//password hash encryption
let password = document.getElementById("password");

let hashedpassword;
password.addEventListener("input", () => {

  // function encryptPassword(password) {
  let passwordval = document.getElementById("password").value;

  try {
    // Generate a random salt value
    const salt = CryptoJS.lib.WordArray.random(16);

    // Hash the password using SHA-256 with salt
    const hashedPassword = CryptoJS.SHA256(passwordval + salt);

    hashedpassword = salt.toString() + " " + hashedPassword.toString();

    // Return the salt and hashed password as a string
    return salt.toString() + " " + hashedPassword.toString();
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
});

//confirm password encryption
let confirm_password = document.getElementById("confirm-password");

let hashedconfirm_password;
confirm_password.addEventListener("input", () => {

  // function encryptPassword(password) {
  let confirm_password = document.getElementById("confirm-password").value;

  try {
    // Generate a random salt value
    const salt = CryptoJS.lib.WordArray.random(16);

    // Hash the password using SHA-256 with salt
    const hashedPassword = CryptoJS.SHA256(confirm_password + salt);

    hashedconfirm_password = salt.toString() + " " + hashedPassword.toString();

    // Return the salt and hashed password as a string
    return salt.toString() + " " + hashedPassword.toString();
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
});

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
        alert("password not match try again");
        //  window.location.href="register.html";
      } else if (mobile_number.length > 11) {
        alert("mobile number must contains 10 numbers");
        // location.reload();
      } else {
        let user = {
          name,
          gender,
          mobile_number,
          date_of_birth,
          email,
          password : hashedpassword,
          confirm_password : hashedconfirm_password,
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
