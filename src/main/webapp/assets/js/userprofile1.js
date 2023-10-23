/**
 * 
 */

let profilePic;

axios.get('/freshstocks_web/UpdateUserServlet')
    .then(response => {
        // Assuming response.data contains user profile information in JSON format
        const userProfile = response.data;
        
        console.log(userProfile);

       const dateofbirth = userProfile.dateOfBirth;
       
       const role = userProfile.isSeller == 0 ? "Buyer" : "Seller";
       
       profilePic = userProfile.profilePic;
       

function calculateAge(dateofbirth) {
  const today = new Date();
  const birth = new Date(dateofbirth);
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  const day = today.getDate() - birth.getDate();

  if (month < 0 || (month === 0 && day < 0)) {
    age--;
  }

  return age;
}

//dynamic profile page
let section;


 section = document.createElement("section");
 section.setAttribute("class","section-head");
 section.innerHTML = `<div class="profilecontainer">
 <div>
  <img id="userprofile-img" src=${userProfile.profilePic} alt="">
  <button class="editbtn" id="editbtn" type="button" onclick="enable()">EDIT PROFILE</button>
  <button class="delbtn" id="delbtn" type="button" onclick="deleteUser()">DELETE PROFILE</button>
  &nbsp;<button class="logout" id="logout" type="button" onclick="logout()">LOG OUT</button>
 </div>
 <div class="username-city">
     <h1>${userProfile.username}</h1>
     <p>${userProfile.userEmail}</p>
 </div>
</div>

<div class="section2">
<br>


</div>

<div class="section-about-head">
<ul class="errorMessages" id="errormsg"></ul>
 <h1>About</h1>
  <div class="section-about">
     <div>
       <input name="userprofile" type="file" id="userprofile" disabled onchange="changeuserProfile()" /><br>
       <input name="role" type="text" id="address" value="${role}" disabled ><br>
     </div>
     <div>
       <input name="about" type="date" id="date" value="${userProfile.dateOfBirth}" disabled  ><br>
       <input name="about" type="text"id="gender" value="${userProfile.gender}" disabled  ><br>
       <input name="editprofile" type="file" id="editprofile" /><br>
     </div>
     <div>
         <input name="about" type="number" id="number" value="${userProfile.mobileNumber}" disabled  ><br>
         <input name="age" type="number" id="age" value="${calculateAge(dateofbirth)}" disabled  ><br>
         <button type="submit" id="edit" name="edit" onclick="edited()" >Submit</button>
     </div>

  </div>
</div>`;

document.querySelector(".header").append(section);


//profile pic name show
document.getElementById("userprofile-img").style.borderRadius = '20px';


    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });


// read userprofile code end

function enable() {
document.getElementById("address").disabled = true;
document.getElementById("date").disabled = false;
document.getElementById("age").disabled = true;
document.getElementById("gender").disabled = false;
document.getElementById("number").disabled = false;
document.getElementById("userprofile").disabled = false;

document.getElementById("address").style.backgroundColor = "white";
document.getElementById("date").style.backgroundColor = "white";
document.getElementById("age").style.backgroundColor = "white";
document.getElementById("gender").style.backgroundColor = "white";
document.getElementById("number").style.backgroundColor = "white";
document.getElementById("userprofile").style.backgroundColor = "white";

}


	//local image from user file
let base64Image; 

function changeuserProfile() {
    // file input from user local to base64
    const fileInput = document.getElementById('userprofile');

    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        base64Image = event.target.result;
        console.log(base64Image);
    }

    reader.readAsDataURL(file);
}



//edit done
function edited() {
	
	let userprofile1;
	if(base64Image != null) {
		userprofile1 = base64Image;
	} else {
		userprofile1 = profilePic;
	}

document.getElementById("address").disabled = true;
document.getElementById("date").disabled = true;
document.getElementById("age").disabled = true;
document.getElementById("gender").disabled = true;
document.getElementById("number").disabled = true;
document.getElementById("userprofile").disabled = true;


let date_of_birth = document.getElementById("date").value;
let userprofile = userprofile1;
let gender = document.getElementById("gender").value;
let mobile_number = document.getElementById("number").value;


   // Regex validation
    let mobileNumberRegex = /^[6-9]\d{9}$/;
    let dateOfBirthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    // Validation
   if (!mobile_number.match(mobileNumberRegex)) {
      document.getElementById("errormsg").innerText = "Please enter a valid 10-digit mobile number";
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
      return;
    } else if (!dateOfBirthRegex.test(date_of_birth)) {
      document.getElementById("errormsg").innerText = "Please enter a valid date of birth (yyyy-mm-dd)";
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
      return;
    } else {
      let birthDate = new Date(date_of_birth);
      let minDate = new Date("1900-01-01");

      if (birthDate <= minDate) {
        document.getElementById("errormsg").innerText = "Please enter a valid date of birth";
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
        return;
    } else {
      let today = new Date();
      let birthDate = new Date(date_of_birth);
      let age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        document.getElementById("errormsg").innerText = "You must be at least 18 years old";
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
      } else {


let newUserObj = {
	userprofile,
    date_of_birth,
    gender,
    mobile_number
}; 

      axios.post('/freshstocks_web/UpdateUserServlet', { newUserObj })
        .then(response => {
            console.log(response.data);
            const res = response.data;
            
    if (res.includes("User Profile Updated Successfully.")) {
        alert(response.data);
        location.reload();
    } else {
		document.getElementById("errormsg").innerText = response.data;
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	}
        })
        .catch(error => {
            alert("Error editing profile:" + error);
        });
        
        }
      }
    }
};


function deleteUser() {
    let msg = confirm("Are you sure you want to delete your user profile?");

    if (msg === true) {
        let isDeleted = "1";

        let deleteUserObj = {
            isDeleted
        };

        axios.post('/freshstocks_web/deleteUserServlet', { deleteUserObj })
            .then(response => {
                console.log(response.data);
                alert(response.data);

                let newWindow = window.open("/freshstocks_web/index.jsp", "_blank", "noopener,noreferrer");
                window.close();
                newWindow.focus();

            })
            .catch(error => {
                alert("Error editing profile:" + error);
            });
    }
}


function logout() {
    let msg = confirm("Are you sure you want to log out?");

    if (msg === true) {
		
		axios.get('/freshstocks_web/LogoutServlet')
            .then(response => {
                console.log(response.data);
                alert(response.data);
                
                localStorage.removeItem("userEmail");

                let newWindow = window.open("/freshstocks_web/index.jsp", "_blank", "noopener,noreferrer");
                window.close();
                newWindow.focus();
            })
            .catch(error => {
                alert("Error logging out:" + error);
            });
    }
}
