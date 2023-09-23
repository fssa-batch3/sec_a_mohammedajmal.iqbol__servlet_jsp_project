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
 <h1>About</h1>
  <div class="section-about">
     <div>
       <textarea name="about" type="text"  id="about" disabled >${"about_me"}</textarea><br>
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
	document.getElementById("about").disabled = false;
document.getElementById("address").disabled = true;
document.getElementById("date").disabled = false;
document.getElementById("age").disabled = true;
document.getElementById("gender").disabled = false;
document.getElementById("number").disabled = false;
// document.getElementById("editprofile").style.display = "block";

}


	//local image to http link image
let cloudinaryData;

function changeuserProfile() {
	
	//file input from user local to cloud storage and link generate
const fileInput = document.getElementById('editprofile');

  const file = fileInput.files[0];
  
  loader();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Replace with your upload preset name
let x;
  fetch('https://api.cloudinary.com/v1_1/dwkjxihmr/auto/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      
      x = data;

      cloudinaryData = x.url; 
      console.log(cloudinaryData);
      
    })
    .catch(error => console.error(error));
};




//edit done
function edited() {

//let datas;
//if(cloudinaryData !== undefined){
// datas = cloudinaryData;
//} else {
//  datas = profilePic;
//}

document.getElementById("about").disabled = true;
document.getElementById("address").disabled = true;
document.getElementById("date").disabled = true;
document.getElementById("age").disabled = true;
document.getElementById("gender").disabled = true;
document.getElementById("number").disabled = true;
// document.getElementById("editprofile").style.display = "none";


let date_of_birth = document.getElementById("date").value;
let gender = document.getElementById("gender").value;
let mobile_number = document.getElementById("number").value;


let newUserObj = {
    date_of_birth,
    gender,
    mobile_number
}; 

      axios.post('/freshstocks_web/UpdateUserServlet', { newUserObj })
        .then(response => {
            console.log(response.data);
            alert(response.data);
            location.reload();
        })
        .catch(error => {
            alert("Error editing profile:" + error);
        });
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


function loader() {
	
	const fileInput1 = document.getElementById('editprofile');
const loadingDiv = document.getElementById("loading");
const body = document.getElementById("body");
const container = document.getElementById("container");

  loadingDiv.style.display = "block"; // Show loading div
  body.style.backgroundColor = "white";
  container.style.backgroundColor = "white";
  setTimeout(function() {
    loadingDiv.style.display = "none"; // Hide loading div after 5 seconds
    body.style.backgroundColor = "white";
    container.style.backgroundColor = "white";
  }, 15000);
}
