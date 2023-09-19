/**
 * 
 */

 //addcourses page js code start

//form submit event start
//seller can add courses when he/she submit the form with valid details
function createcourse(event) {
	 event.preventDefault();

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
    let courseVideo1 = document.getElementById("courseVideo1").value;
    let courseVideo2 = document.getElementById("courseVideo2").value;
    let courseVideo3 = document.getElementById("courseVideo3").value;
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
      courseVideo1,
      courseVideo2,
      courseVideo3,
      courseVideoName1,
      courseVideoName2,
      courseVideoName3,
    };
    
    
    axios.post('/freshstocks_web/CreateCourseServlet', { courseObj })
  .then(response => {
    console.log(response.data);
    const res = response.data;
    alert(response.data);
    if(res === "Course Created Successfully.") {
        window.location.href="/freshstocks_web/pages/sellerhome.jsp";
    }
    // Handle success
  })
  .catch(error => {
    console.error('Error creating course:', error);
    // Handle error
  });
    
    
};

//addcourses page js code end
