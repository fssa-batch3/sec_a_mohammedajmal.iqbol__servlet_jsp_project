/**
 * 
 */

function showLoader() {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


setTimeout(hideLoader, 5000);

  

 // Assuming you have an API endpoint to fetch courses data
axios.get('/freshstocks_web/UpdateCourseServlet')
  .then(response => {
    const courses = response.data;

    const scrollCoursesDiv = document.querySelector('.row');

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
            courseCardDiv.classList.add('col-md-4', 'mb-4');

        courseCardDiv.innerHTML = `          
            <div class="card">
                <img src="${course.coverImage}" class="card-img-top" alt="Course 1">
                <span class="badge badge-success">Best Selling</span>
                <div class="card-body">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${course.description}</p>
                    <div class="flexcost">
                        <p class="course-cost">
                            Fresh Price: &#8377;${course.sellingPrice}
                        </p>
                        <p>
                            Old Price: <strike class="course-oldcost" id="course-oldcost">&#8377;${course.markedPrice}</strike>
                        </p>
                        <p class="course-discount">
                            Discount: ${discountFormatted}%
                        </p>
                    </div>
                    <a class="btn btn-primary btn-sm mr-2" href="editcourse.jsp?courseId=${course.courseID}">Edit</a>
                    <button type="button" class="btn btn-danger btn-sm" onclick="confirmDelete(${course.courseID})">Delete</button>
                </div>
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

