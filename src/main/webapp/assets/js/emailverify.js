/**
 * 
 */

//get user email from urlparams
let url = window.location.search;
let urlParams = new URLSearchParams(url);
let email = urlParams.get("email");

function back() {
	event.preventDefault();
	window.location.href = "register.jsp";
}


//when click submit this event will happen
let submit = document.getElementById("submit")
submit.addEventListener("click", function (e){ 
    e.preventDefault();


    document.getElementById("otp-input").style.display = "block";
  document.getElementById("verify").style.display = "block";

  
let randomArray = new Uint32Array(1);
window.crypto.getRandomValues(randomArray);
let otpforuser = randomArray[0] % 900000 + 100000;
console.log(otpforuser);

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


  //required params to send email
   let params = {from_name: "freekyajmal@gmail.com",
              to_name: email,
              message: body,
             }

//email sending event function
emailjs.send("service_sp6m68x","template_uo2qcla",params)
.then(
     message => {
       
       //alerting the user
       alert(`Please Verify Your Email ( ${email} )  \n Check the Spam folder also`) 


   const user = JSON.parse(sessionStorage.getItem('user'));
   
   //verify the user using the otp received by him in hi/her email
       let verify = document.getElementById("verify");
       verify.addEventListener("click",(event) => {
       event.preventDefault();

       let otpinput = document.getElementById("otp-input").value;

       //if verified success if not unsuccess
       if( otpinput == otpforuser ){   
		   
		   
   axios.post('../registration', { user })
    .then(response => {
      // Handle the response from the servlet
      console.log(response.data);
      
      alert(response.data);
      
      sessionStorage.removeItem('user');
      
      // Assuming you want to open a new window after successful verification
      if(user.role === "0") {
		  let newWindow = window.open("/freshstocks_web/pages/home.jsp", '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
	  } else if (user.role === "1") {
		  let newWindow = window.open("/freshstocks_web/pages/sellerhome.jsp", '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
	  }
    })
    .catch(error => {
       alert("User Registration failed");
    });
           
       } else {
           alert("Email Not Verified OTP Not Match");
           let newWindow = window.open("register.jsp", '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
       }

       });


   }
     
   );



 });
