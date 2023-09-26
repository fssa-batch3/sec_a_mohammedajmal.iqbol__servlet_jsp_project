/**
 * 
 */

//when user clicks this below event will happen
let submit = document.getElementById("submit")
submit.addEventListener("click", function (e){ 
     e.preventDefault();
     
       let hashedpassword;

     
 let email = document.getElementById("otp-input").value;

 axios.get(`/freshstocks_web/fetchUserDetailsFromEmail?email=${email}`)
 .then(response => {
	 const res = response.data.error;
	 console.log(res);
	 
	 let respons = response.data;
	 console.log(respons);
	 
	 	 
	   if(res != "An error occurred.") {

   document.getElementById("verify").style.display = "block";

    //random password generator   
    let randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    let otpforuser = randomArray[0] % 900000 + 100000;
    
    console.log(otpforuser);

   //body content of email
 let body = `

 Dear [${email}],

Thank you for signing up for an account on freshstocks. To complete your account registration, please use the following One-Time Password (OTP) to verify your account:

Please Use this OTP to Verify [${otpforuser}]

Please note that this OTP is valid for 5 minutes only. If you do not use it within this time frame, you will need to request a new OTP.

To enter the OTP, please follow these steps:

Go to the registration page on our website.
Enter your email address and password.
When prompted for the OTP, enter the code provided above.
Click "Verify" to complete your account registration.
If you have any questions or concerns, please do not hesitate to contact us at ${'freekyajmal@gmail.com'}.

Thank you for choosing freshstocks.

    `;


    //required params to send to email
    let params = {from_name: "freekyajmal@gmail.com",
               to_name: email,
               message: body,
              }

              // email send event
emailjs.send("service_sp6m68x","template_1veprt4",params)
.then(
      message => {
        
        alert(`Please Verify Your Email ( ${email} )  \n Check the Spam folder also`) 

        let msg = prompt("Enter the OTP recieved in your email");

        if (msg == null || msg == "") {
         alert("It won't be empty");
        } else {

        //email success 

        if( msg == otpforuser ){   
            alert("Your Email has Been Successfully Verified");
            
        //email verify done 

  
                   
           let password = prompt("Please enter your password Should Contain One letter One Symbol 8 Characters");
   
            //assign new in old
            

  let email = document.getElementById("otp-input").value; // Replace with the user's provided email

    // Send a GET request to retrieve the user's hashed password
    
    if (password != null) {
  
    hashedpassword = encryptPassword(password);
    
    console.log(hashedpassword);

            
let newUserPasswordObj = {
    hashedpassword,
    email
}; 

      axios.post('/freshstocks_web/UpdateUserPasswordServlet', { newUserPasswordObj })
        .then(response => {
            console.log(response.data);
            alert(response.data);
             window.location.href = "login.jsp";
        })
        .catch(error => {
            alert("Error editing profile:" + error);
        });
  

        } else {
            alert("Email Not Verified OTP Not Match");
        }

    }
      

    }  }
    )
   
} else {
    alert("You are Not an Existing User of freshstocks. please Register first");
    window.location.href = 'register.jsp';
}
	 

 })
 .catch(error => {
	 console.log("error fetching user data" + error);
 });


  });


//back function 
  function back() {
    window.location.href = "login.jsp";
  }
  


function encryptPassword(password) {
  try {
    // Generate a random salt value
    const salt = CryptoJS.lib.WordArray.random(16);

    // Hash the password using SHA-256 with salt
    const hashedPassword = CryptoJS.SHA256(password + salt);

    hashedpassword = salt.toString() + " " + hashedPassword.toString();


    // Return the salt and hashed password as a string
    return salt.toString() + " " + hashedPassword.toString();
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}
