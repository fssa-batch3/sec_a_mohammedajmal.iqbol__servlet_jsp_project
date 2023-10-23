/**
 * 
 */

//user login page js code start

let login = document.getElementById("form");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  
  rememberMe();

  //try statement
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  const loggedin = {
	    email,
        password,
  };
  
  try {
   
   axios.post('/freshstocks_web/IndexServlet', { loggedin })
.then((response) => {
	
	console.log(response.data);
    
    if(response.data === "Buyer") {
		 alert("User Login Successfull");
		  let newWindow = window.open("/freshstocks_web/pages/home.jsp", '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
	  } else if (response.data === "Seller") {
		  alert("Seller Login Successfull");
		  let newWindow = window.open("/freshstocks_web/pages/sellerhome.jsp", '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
	  } else if (response.data === "Invalid") {
	    document.getElementById("errormsg").innerText = "Authentication Failed! Recheck Your Credentials";
		document.getElementById("errormsg").style.display = "block";
		 setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	  } else {
	    document.getElementById("errormsg").innerText = "Authentication Failed! Recheck Your Credentials";
		document.getElementById("errormsg").style.display = "block";
		 setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	  }
})
.catch((error) => {
  // Handle errors, such as incorrect credentials
  document.getElementById("errormsg").innerText = "Authentication Failed! Recheck Your Credentials";
  document.getElementById("errormsg").style.display = "block";
   setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
  
});

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});

//user login page js code end



document.addEventListener("DOMContentLoaded", function() {
    var storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
        axios.post(`/freshstocks_web/autologin?email=${storedEmail}`)
        .then(function (response) {
            if(response.data === "Buyer") {
                window.location.href = "/freshstocks_web/pages/home.jsp";
            } else if (response.data === "Seller") {
                window.location.href = "/freshstocks_web/pages/sellerhome.jsp";
            } else if (response.data === "Invalid") {
                console.log("Authentication Failed! User Not found.");
            } else {
                console.log("User failed to Login!");
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    }
});


function rememberMe() {
    var checkBox = document.getElementById("remember-me");
    var email = document.getElementById("email").value;
    if (checkBox.checked == true) {
        localStorage.setItem("userEmail", email);
        // Proceed with further actions, such as submitting to the server
    } else {
        localStorage.removeItem("userEmail");
    }
}


