/**
 * 
 */

 //user login password compare

let password = document.getElementById("password");
let isPasswordCorrect;

password.addEventListener("input", async () => {
  let email = document.getElementById("email").value; // Replace with the user's provided email

  try {
    // Send a GET request to retrieve the user's hashed password
    const response = await axios.get(`/freshstocks_web/fetchUserDetailsFromEmail?email=${email}`);
    
    console.log(response.data);
    console.log(response.data.userID);

    // Assuming the response data contains the hashed password
    const storedHash = response.data.password;

    let passwordval = document.getElementById("password").value;
    const [salt, storedPasswordHash] = storedHash.split(" ");
    const hashedPassword = CryptoJS.SHA256(passwordval + CryptoJS.enc.Hex.parse(salt));

    isPasswordCorrect = hashedPassword.toString() === storedPasswordHash;
    
    console.log(hashedPassword.toString());
    console.log(storedPasswordHash);
    console.log(response.data);
    console.log(isPasswordCorrect);
  } catch (error) {
    console.log("Error fetching password:" + error);
    throw error;
  }
});

//user login page js code start

let login = document.getElementById("form");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  
  rememberMe();

  //try statement
  let email = document.getElementById("email").value;
  
  const loggedin = {
	    email,
        isPasswordCorrect,
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
		  alert("Authentication Failed! Recheck Your Credentials");
	  } else {
		   alert("Authentication Failed! Recheck Your Credentials");
	  }
})
.catch((error) => {
  // Handle errors, such as incorrect credentials
  alert("Authentication failed: Recheck Your Credentials!");
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


