/**
 * 
 */

 // Assuming you have an API endpoint to fetch courses data
axios.get('/freshstocks_web/UpdateCourseServlet')
  .then(response => {
    const courses = response.data;

    const scrollCoursesDiv = document.querySelector('.scroll-courses-div-stocks');

    if (courses.length === 0) {
      scrollCoursesDiv.innerHTML = '<p>No courses available.</p>';
    } else {
      // Reverse the list of courses
      courses.reverse();

      courses.forEach(course => {
        const markedPrice = course.markedPrice;
        const sellingPrice = course.sellingPrice;
        const discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;
        const discountFormatted = discountPercentage.toFixed(2);

        const courseCardDiv = document.createElement('div');
        courseCardDiv.classList.add('first-course2-stocks');

        courseCardDiv.innerHTML = `
          <div>
            <img class="course-img-stocks" src="${course.coverImage}" alt="">
          </div>
          <div>
            <h3 class="course-title">${course.name}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-details">
              <p class="course-timing">
                <span class="timing">Timing:</span>
                ${course.timing}
              </p>
              <p class="course-ln">
                <span class="lang">Language:</span>
                ${course.language}
              </p>
            </div>
            <div class="flexcost">
              <p class="course-cost">
                fresh Price: ₹${course.sellingPrice}
              </p>
              <p>
                Old Price: <strike class="course-oldcost">₹${course.markedPrice}</strike>
              </p>
              <p class="course-discount">
                Discount: ${discountFormatted}%
              </p>
            </div>
            <form method="post" style="margin-left: 20px;width:40px;">
              <a href="editcourse.jsp?courseId=${course.courseID}" style="padding:7px;width:50px;background-color:dodgerblue;color:white;border:3px dodgerblue;border-radius:5px;">Edit</a>
            </form>
              <button type="button" onclick="confirmDelete(${course.courseID})" style="margin-left:70px;position: relative;top: -23px;padding:7px;width:60px;background-color:red;color:white;border:3px red;border-radius:5px;">Delete</button>
            
            <br>
          </div>
        `;

        scrollCoursesDiv.appendChild(courseCardDiv);
      });
    }
  })
  .catch(error => {
    console.error('Error fetching courses:', error);
  });


function confirmDelete(courseId) {
	event.preventDefault();
	
	let msg = confirm("Are you sure you want to delete this course?");
	
  if (msg == true) {
    
    // Step 3: Send data using Axios
    axios.post(`/freshstocks_web/DeleteCourseServlet?courseId=${courseId}`)
      .then(function(response) {
        // Handle success
        alert(response.data);
        window.location.reload();
      })
      .catch(function(error) {
        // Handle error
        console.error('Error deleting course:', error);
      });
  }
}
  

//google translate element
function googleTranslateElementInit() {
  const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  return translateElement;
}



let searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("first-course2-stocks");

let debounceTimer;
searchbar.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const searchValue = searchbar.value.toLowerCase().trim();
    if (searchValue === "") {
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
      }
      return;
    }

    const searchWords = searchValue.split(/\s+/);

    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      const cardContent = element.innerText.toLowerCase();
      let match = true;

      searchWords.forEach(word => {
        if (!cardContent.includes(word)) {
          match = false;
        }
      });

      if (match) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  }, 300); // Adjust the debounce time (in milliseconds) as needed
});

  
  
  function logout() {
    let msg = confirm("Are you sure you want to log out?");

    if (msg === true) {
		
		axios.get('/freshstocks_web/LogoutServlet')
            .then(response => {
                console.log(response.data);
                alert(response.data);

                let newWindow = window.open("/freshstocks_web/index.jsp", "_blank", "noopener,noreferrer");
                window.close();
                newWindow.focus();
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    }
}

