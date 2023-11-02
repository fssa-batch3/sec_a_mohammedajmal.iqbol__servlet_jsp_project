/**
 * 
 */


const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');
console.log(courseId);


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


// Step 3: Send data using Axios
axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseId}`)
  .then(function(response) {
    // Handle success
   const courseData = response.data;
    console.log('Course Data:', courseData);
    
// show course data dynamically
let div1;

div1 = document.createElement('div');
div1.setAttribute("class","contain");
  div1.innerHTML = `
   <div class="contain">
    <div>
    <label for="updatedCoverImage">Updated Cover Image:</label>
    <input type="text" id="updatedCoverImage" name="updatedCoverImage" value="${courseData.coverImage}"><br>
    
    <label for="updatedTiming">Updated Timing:</label>
    <input type="text" id="updatedTiming" name="updatedTiming" value="${courseData.timing}"><br>
    
    <label for="updatedLanguage">Updated Language:</label>
    <input type="text" id="updatedLanguage" name="updatedLanguage" value="${courseData.language}"><br>
    
    <label for="updatedMarkedPrice">Updated Marked Price:</label>
    <input type="text" id="updatedMarkedPrice" name="updatedMarkedPrice" value="${courseData.markedPrice}"><br>
    
    <label for="updatedSellingPrice">Updated Selling Price:</label>
    <input type="text" id="updatedSellingPrice" name="updatedSellingPrice" value="${courseData.sellingPrice}"><br>
   
    <br><button type="submit">Save Changes</button>
         </div>
        <div>
    <label for="updatedDescription">Updated Description:</label>
    <textarea id="updatedDescription" name="updatedDescription">${courseData.description}</textarea><br>
   
    <label for="updatedInstructorName">Updated Instructor Name:</label>
    <input type="text" id="updatedInstructorName" name="updatedInstructorName" value="${courseData.instructorName}"><br>
    
    <label for="updatedCompanyName">Updated Company Name:</label>
    <input type="text" id="updatedCompanyName" name="updatedCompanyName" value="${courseData.companyName}"><br>
    
    <label for="updatedCompanyCategory">Updated Company Category:</label>
    <input type="text" id="updatedCompanyCategory" name="updatedCompanyCategory" value="${courseData.companyCategory}"><br>
    
    <label for="updatedTopSkills">Updated Top Skills:</label>
    <input type="text" id="updatedTopSkills" name="updatedTopSkills" value="${courseData.topSkills}"><br>
    <br>
     </div>
     <div>
         <label for="courseVideo1">Course Video 1 <span class="required">*</span></label>
    <input type="file" id="courseVideo1" name="courseVideo1" accept="video/*" onchange="Main()" required><br><br>
    
    <label for="courseVideo2">Course Video 2 <span class="required">*</span></label>
    <input type="file" id="courseVideo2" name="courseVideo2" accept="video/*" onchange="Main1()" required><br><br>
    
        <label for="courseVideo3">Course Video 3 <span class="required">*</span></label>
    <input type="file" id="courseVideo3" name="courseVideo3" accept="video/*" onchange="Main2()" required><br><br>
    
    <label for="courseVideoName1">Course Video Name 1:</label>
    <input type="text" id="courseVideoName1" name="courseVideoName1" value="${courseData.courseVideoName1}"><br>
    
        <label for="courseVideoName2">Course Video Name 2:</label>
    <input type="text" id="courseVideoName2" name="courseVideoName2" value="${courseData.courseVideoName2}"><br>
    
    <label for="courseVideoName3">Course Video Name 3:</label>
    <input type="text" id="courseVideoName3" name="courseVideoName3" value="${courseData.courseVideoName3}"><br>
    
     </div>
        </div>
  `;

document.querySelector("#form").append(div1);

    if(document.getElementById("courseVideoName3").value) {
		hideLoader();
	}


  })
  .catch(function(error) {
    // Handle error
    console.error('Error fetching course data:', error);
  });





 
  //editcourses page js code start
  
  
   let videoString1;
 let videoString2;
 let videoString3;
 
async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

async function Main() {
    const file = document.querySelector('#courseVideo1').files[0];
    try {
        const result = await toBase64(file);
        videoString1 = result;
    } catch(error) {
        console.error(error);
    }
}

async function Main1() {
    const file = document.querySelector('#courseVideo2').files[0];
    try {
        const result = await toBase64(file);
        videoString2 = result;
    } catch(error) {
        console.error(error);
    }
}


async function Main2() {
    const file = document.querySelector('#courseVideo3').files[0];
    try {
        const result = await toBase64(file);
        videoString3 = result;
    } catch(error) {
        console.error(error);
    }
}



//form submit event start
//seller can add courses when he/she submit the form with valid details
function editcourse(event) {
	 event.preventDefault();
	 
	 showLoader();

    //for adding new course these are course details we get from user.
    let coverImage = document.getElementById("updatedCoverImage").value;
    let timing = document.getElementById("updatedTiming").value;
    let language = document.getElementById("updatedLanguage").value;
    let markedPrice = document.getElementById("updatedMarkedPrice").value;
    let sellingPrice = document.getElementById("updatedSellingPrice").value;
    let description = document.getElementById("updatedDescription").value;
    let topSkills = document.getElementById("updatedTopSkills").value;
    let instructorName = document.getElementById("updatedInstructorName").value;
    let companyName = document.getElementById("updatedCompanyName").value;
    let companyCategory = document.getElementById("updatedCompanyCategory").value;
    let courseVideoName1 = document.getElementById("courseVideoName1").value;
    let courseVideoName2 = document.getElementById("courseVideoName2").value;
    let courseVideoName3 = document.getElementById("courseVideoName3").value;

    /* create new course object within that pushing all details for courses 
   we get from user */
   const urlParam = new URLSearchParams(window.location.search);
let courseID = urlParam.get('courseId');

    let updateCourseObj = {
      coverImage,
      timing,
      language,
      markedPrice,
      sellingPrice,
      description,
      topSkills,
      description,
      instructorName,
      companyName,
      companyCategory,
      videoString1,
      videoString2,
      videoString3,
      courseVideoName1,
      courseVideoName2,
      courseVideoName3,
      courseID,
    };
    
    
    axios.post('/freshstocks_web/SaveCourseServlet', { updateCourseObj })
  .then(response => {
    console.log(response.data);
    const res = response.data;
    if (res === "Course Updated Successfully.") {
        hideLoader();
    }
    if (res === "Course Created Successfully.") {
        alert(response.data);
    } else {
		document.getElementById("errormsg").innerText = response.data;
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	}
    if(res === "Course Updated Successfully.") {
        window.location.href="/freshstocks_web/pages/sellerhome.jsp";
    }
    // Handle success
  })
  .catch(error => {
    alert("Error updating course:" + error);
    // Handle error
  })
  .finally(() => {
    hideLoader();
  });
    
    
};


//editcourses page js code end