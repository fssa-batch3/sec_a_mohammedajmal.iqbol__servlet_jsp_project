/**
 * 
 */

 //addcourses page js code start
 
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


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


//form submit event start
//seller can add courses when he/she submit the form with valid details
function createcourse(event) {
	 event.preventDefault();
	 
	 showLoader();
	 

	  console.log(videoString1);
	 console.log(videoString2);
	 console.log(videoString3);

    //for adding new course these are course details we get from user.
    let coverImage = document.getElementById("coverImage").value;
    let name = document.getElementById("name").value;
    let timing = document.getElementById("timing").value;
    let language = document.getElementById("language").value;
    let markedPrice = document.getElementById("markedPrice").value;
    let sellingPrice = document.getElementById("sellingPrice").value;
    let description = document.getElementById("description").value;
    let topSkills = document.getElementById("topSkills").value;
    let instructorName = document.getElementById("instructorName").value;
    let companyName = document.getElementById("companyName").value;
    let companyCategory = document.getElementById("companyCategory").value;
    let courseVideoName1 = document.getElementById("courseVideoName1").value;
    let courseVideoName2 = document.getElementById("courseVideoName2").value;
    let courseVideoName3 = document.getElementById("courseVideoName3").value;

    /* create new course object within that pushing all details for courses 
   we get from user */
  

    let courseObj = {
      name,
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
    };
    
    
   axios.post('/freshstocks_web/CreateCourseServlet', { courseObj })
  .then(response => {
    console.log(response.data);
    const res = response.data;
    if (res === "Course Created Successfully.") {
        hideLoader();
    }
    if (res === "Course Created Successfully.") {
        alert(response.data);
    } else {
		document.getElementById("errormsg").innerText = response.data;
		document.getElementById("errormsg").style.display = "block";
	}
   
    if(res === "Course Created Successfully.") {
        window.location.href="/freshstocks_web/pages/sellerhome.jsp";
    }
  })
  .catch(error => {
    alert("Error creating course:" + error);
    // Handle error
  })
    .finally(() => {
    hideLoader();
  });
    
};

//addcourses page js code end
