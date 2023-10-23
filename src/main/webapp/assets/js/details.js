/**
 * 
 */

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

setTimeout(hideLoader, 2000);


// using this method, I will show the whole details page dynamically
let urlParams = new URLSearchParams(window.location.search);
let courseID = urlParams.get('courseID');  


axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseID}`)
.then(function (response) {
	
    let courseDetails = response.data;
    
    
    console.log(courseDetails);
    
    const markedPrice = courseDetails.markedPrice;
        const sellingPrice = courseDetails.sellingPrice;
        const discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;
        const discountFormatted = Math.floor(discountPercentage.toFixed(2));

let div1 = document.createElement("div");
div1.setAttribute("class","container my-5"); 
div1.innerHTML = `

     <h1 class="text-center mb-4">Course Details</h1>
        <div class="row">
            <div class="col-lg-8">
                <h2 class="course-title mb-4">${courseDetails.name}</h2>
                <img src="${courseDetails.coverImage}" alt="Course Cover Image" class="cover-image mb-4">
                <ul class="course-details mb-4">
                  <div style="display:flex; justify-content:space-evenly;">  <li>Course Timing:  ${courseDetails.timing}</li>
                    <li>Course Language: ${courseDetails.language}</li>
                     </div>   
                    <div style="display:flex; justify-content:space-between;">
                    <li class="course-cost">Course Cost:  &#8377;${courseDetails.sellingPrice}</li>
                    <li class="course-old-cost">Course Old Cost:  &#8377;${courseDetails.markedPrice}</li>
                    <li class="course-discount">Course Discount:  ${discountFormatted}%</li>
                 </div>
                </ul>
                <button class="btn btn-primary mr-2" id="add-to-cart" onclick="enrollcourse(${courseDetails.courseId})">Enroll Now</button>
                <button class="btn btn-danger mr-2" id="deletecourse" onclick="deletemycourses()" style="display:none;">Delete from My Courses</button>
                <button class="btn btn-success mr-2" onclick="share()" >Share to friends</button>
                <hr>
                <br>
                <h3>About</h3>
                <p class="mb-4">What you'll learn from this course:<br>
                    ${courseDetails.description}</p>
                <h3>Top Skills You'll Learn</h3>
                <p class="mb-4">${courseDetails.topSkills}</p>
                <br>
                <h3>Highlights</h3>
                <ul class="mb-4">
                    <li>100% worth of money</li>
                    <li>You will get a certificate once you completed the course</li>
                    <li>You always get 24/7 Chat Support</li>
                    <li>Participate the Live trading session</li>
                </ul>
                <br>
                <div style="display:flex;justify-content:flex-start;">
                <div>
                <h3>Instructor</h3>
                <div class="instructor-details mb-4">
                    <p class="instructor-name">${courseDetails.instructorName}</p>
                    <p class="instructor-description">${courseDetails.companyName}</p>
                    <p>4 Courses</p>
                </div>
                </div>
                <div style="margin-left:100px;">
                <h3>Offered By</h3>
                <div class="instructor-details mb-4">
                    <p class="instructor-name">${courseDetails.companyName}</p>
                    <p class="instructor-description">${courseDetails.companyCategory}</p>
                    <p>4 Courses</p>
                </div>
                </div>
                </div>
 
 <div id="celebration-container"></div>
                

            </div>
            <div class="col-lg-4">
                <div class="video-progress mb-4">
                    <div class="progress-container">
                        <div class="progress-label">
                            Course Progress:
                            <span id="progressText" class="progress-text">0%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar">
                                <div id="progressBar" class="progress-fill"></div>
                            </div>
                        </div>
                        <div id="lastModified" class="last-modified">
                            Last Modified: <span id="lastModifiedText"></span>
                        </div>
                        <button type="button" onclick="viewcertify()" class="btn btn-primary"  id="viewcertify" style="display:none;">View the Course Certificate</button>
                    </div>
                </div>
                <div class="comments-section">
                    <h3 class="mb-3">Comments</h3>
                    <div class="comments">
<div class="container mt-5">
    <div id="new-comments">
        <!-- Comment List -->


        <!-- Edit Popup -->
        <div id="edit-popup" class="popup" style="display:none;">
            <div class="popup-content">
                <span class="close" onclick="closeEditPopup()">&times;</span>
                <h2 class="popup-title">Edit Comment</h2>
                <form onsubmit="submitEditComment(event)">
                    <input type="hidden" id="edit-comment-id" name="commentId">
                    <div class="input-group">
                        <input type="text" id="edit-comment-input" class="form-control edit-comment-input" placeholder="Edit your comment...">
                        <div class="input-group-append">
                            <button type="submit" id="submit-edit-comment" class="btn btn-success">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

                    </div>
                    <br>
    <form id="addcomment" onsubmit="addcomment(event)">
    <ul class="errorMessages" id="errormsg"></ul>
        <div class="input-group mb-3">
            <textarea class="form-control" id="comment-input" placeholder="Add a comment" onkeypress="entercomment(event)"></textarea>
            <div class="input-group-append">
                <button class="btn btn-primary" type="submit" id="submit-comment">Submit</button>
            </div>
        </div>
    </form>
    
    
    <div>
      <br>
       <h2>Course Videos</h2>
       <br>
    					<button class="accordion">Beginner's Module <span id="locked1">&#128274;</span></button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseID}&videoId=${1}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName1}</li></a> <br>
					</div>

					<button class="accordion">Intermediate Module <span id="locked2">&#128274;</span></button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseID}&videoId=${2}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName2}</li></a> <br>
					</div>

					<button class="accordion">Advanced Module <span id="locked3">&#128274;</span></button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseID}&videoId=${3}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName3}</li></a> <br>
					</div>
    
    
    
    </div>
    
                </div>
            </div>
        </div>
`;


    document.querySelector("body").append(div1);
    

setTimeout(() => setInterval(coursePurchased(), intervalTime), 100);





})
.catch(function (error) {
    // Handle error
    console.error('Error fetching course details:', error);
});


// using this method i will get purchased courses list 
function coursePurchased() {
	
	let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseID');  
	
	axios.get(`/freshstocks_web/getPurchasedCourses?courseId=${courseID}`)
    .then(function(response) {
        // Handle the response data, which should be an array of purchased courses
        let purchasedCourse = response.data;
        
        if(purchasedCourse){
			document.getElementById("add-to-cart").style.display = "none";
            document.getElementById("deletecourse").style.display = "";
    document.getElementById("locked1").style.display = "none";
    document.getElementById("locked2").style.display = "none";
    document.getElementById("locked3").style.display = "none";
    
        // accordian code function start
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    try {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }

      //catch statement
    } catch (error) {
      console.error("Error" + error);
    }
  });
}

// accordian code function end


// url params get courseID
 let urlParamms = new URLSearchParams(window.location.search);
     let CourseID = urlParamms.get('courseID');



axios.get(`/freshstocks_web/UpdateMyCoursesServlet?courseId=${CourseID}`)
    .then(response => {
        const courseProgressData = response.data; 
        const totalVideos = 3; // there are 3 videos in total
        
        let progressVal = courseProgressData.progress;
        const latestModifiedAt = courseProgressData.latestModifiedAt;
        
        let overallProgress = progressVal / 3;
        
        console.log(courseProgressData);

        // Update progress bar and last modified timestamp
        const progressBar = document.querySelector('.progress-fill');
        const lastModified = document.getElementById('lastModified');
        const progressText = document.getElementById('progressText');
        
        
        const formattedTimestamp = formatTimestamp(latestModifiedAt);

        progressBar.style.width = overallProgress + '%';
        lastModified.innerText = "\n Last Updated: " + formattedTimestamp;
        progressText.innerText = Math.round(overallProgress) + '%';
        
        if (overallProgress === 100) {
           celebrateCompletion(courseID);
           
            document.getElementById("viewcertify").style.display = "block";
            document.getElementById("viewcertify").style.marginLeft = "63px";
        }

    })
    .catch(error => {
        console.error('Error fetching course progress:', error);
    });
    
    
    
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    if (hours > 0) {
        if (hours === 1) {
            return hours + ' hour ago';
        } else {
            return hours + ' hours ago';
        }
    } else if (minutes > 0) {
        if (minutes === 1) {
            return minutes + ' minute ago';
        } else {
            return minutes + ' minutes ago';
        }
    } else {
        return 'just now';
    }
}


function celebrateCompletion(courseId) {
	
	  // Check if the user has already completed the course
    const courseCompleted = localStorage.getItem(`courseCompleted_${courseId}`);

  if (!courseCompleted) {
    // Add the active class to the body
    document.body.classList.add('celebration-active');
    
  // Add the active class to the body
  document.body.classList.add('celebration-active');

  // Create confetti elements
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti-container');

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
    confetti.style.animationDelay = Math.random() + 's';
    confetti.style.animationIterationCount = 'infinite';

    confettiContainer.appendChild(confetti);
  }

  // Append confetti to the body
  document.body.appendChild(confettiContainer);

  // Show celebration message
  const messageElement = document.createElement('div');
  messageElement.classList.add('celebration-message');
  messageElement.innerHTML = '&#x1F389; Congratulations for finishing the course! &#x1F389;';

  document.body.appendChild(messageElement);

  // Automatically remove after 10 seconds
  setTimeout(() => {
    messageElement.remove();
    confettiContainer.remove();
    document.body.classList.remove('celebration-active');
  }, 10000);
  
   // Store in local storage that the user has completed the course
   localStorage.setItem(`courseCompleted_${courseId}`, 'true');
   
    }
}


/* using this method i will update comment and if comment 
object null means show message no comment available else 
show comments and there i will check if the comments created 
by him means show edit and delete button else can't show
*/
axios.get(`/freshstocks_web/UpdateCommentServlet?courseId=${CourseID}`)
  .then(response => {
    const courses = response.data.comment;
    const userId = response.data.userID;
    let firstComment = response.data.comment[0];
    console.log(response.data.comment);
    
    if(firstComment == null){
           
                   let div1 = document.createElement("div");
        div1.setAttribute("class", "comment");
        div1.innerHTML = `
            <div class="comment-img">
                <p class="comment-text">No Comments Available Right Now!</p>
            </div>
        `;
        
        document.querySelector("#new-comments").appendChild(div1);
	} else {
		
	let rev = courses.reverse();
    
    rev.forEach(course => {
        let div1 = document.createElement("div");
        div1.setAttribute("class", "comment");
        div1.setAttribute("id", "comment-" + course.commentId);
        div1.innerHTML = `
            <div class="comment-img">
                <img class="profile-img_block" id="profile-pic" src="${course.userProfile}">
                <p class="comment-letters" id="comment-letters">${course.commentBody}</p>
                &emsp;
            </div>
            <p class="datenow">Time Posted: ${course.createdTime}</p>
                <a onclick="openEditPopup(${course.commentId})" id="anker1-${course.commentId}"
                    style="display: inline-block; padding: 5px 16px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 20px;">Edit</a>
                <a onclick="deleteComment(${course.commentId})" id="anker2-${course.commentId}"
                    style="display: inline-block; padding: 5px 16px; background-color: red; color: #fff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 0px;">Delete</a>
                <button style="display: none;">Edit</button>
                <button style="display: none;">Delete</button>
        `;
        
        document.querySelector("#new-comments").appendChild(div1);
        
        if (userId !== course.userId) {
        document.getElementById(`anker1-${course.commentId}`).style.display = "none";
        document.getElementById(`anker2-${course.commentId}`).style.display = "none";
       }
		
		})
    }
  })
  .catch(error => {
    console.error('Error creating course:', error);
    // Handle error
});



		} else { 
			//if he not purchased the course means below will run
			
		
    document.getElementById("comment-input").disabled = true;
    document.getElementById("submit-comment").disabled = true;
			
			            let div1 = document.createElement("div");
        div1.setAttribute("class", "comment");
        div1.innerHTML = `
            <div class="comment-img">
                <p class="comment-text">Kindly, Enroll this Course to Access the Comment Section! </p>
            </div>
        `;
        
        document.querySelector("#new-comments").appendChild(div1);
        
        
         let urlParamms = new URLSearchParams(window.location.search);
     let CourseID = urlParamms.get('courseID');

axios.get(`/freshstocks_web/UpdateCommentServlet?courseId=${CourseID}`)
  .then(response => {
    const courses = response.data.comment;
    
    if(courses[0] == null){
           
                   let div1 = document.createElement("div");
        div1.setAttribute("class", "comment");
        div1.innerHTML = `
            <div class="comment-img">
                <p class="comment-text">No Comments Available Right Now! </p>
            </div>
        `;
        
        document.querySelector("#new-comments").appendChild(div1);
	} else {
    
    courses.forEach(course => {
        let div1 = document.createElement("div");
        div1.setAttribute("class", "comment");
        div1.innerHTML = `
            <div class="comment-img">
                <img class="profile-img_block" id="profile-pic" src="${course.userProfile}">
                <p class="comment-text">${course.commentBody}</p>
            </div>   
        `;
        
        document.querySelector("#new-comments").appendChild(div1);
        
    });
    
    }
  })
  .catch(error => {
    console.error('Error creating course:', error);
    // Handle error
});
        
		}
        
           })
            .catch(function(error) {
                console.error(error);
            });
}


// using this method i will enroll or buy the course.
function enrollcourse(sellingPrice2) {
	event.preventDefault();
	
	let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseID');  

     if (sellingPrice2 === 0) {
        axios.post(`/freshstocks_web/BuyCourseServlet?courseId=${courseID}`)
            .then(function(response) {
                alert(response.data);
                window.location.href="learn.jsp";
            })
            .catch(function(error) {
                console.error(error);
            });
    } else {
        let newWindow = window.open('coursePayment.jsp?courseId=' + courseID, '_blank', "noopener,noreferrer");
           window.close();
          newWindow.focus();
    }
}

// using this function method, I will delete the course using courseId 
function deletemycourses() {
	
	let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseID');  
	
	let msg = confirm("Are you Sure, You want to delete this course from my courses ?");
	
	if(msg == true) {
		
axios.post(`/freshstocks_web/RemoveMyCoursesServlet?courseId=${courseID}`)
.then(function (response) {
  console.log('Course removed successfully:', response.data);
  alert(response.data);
  window.location.href="learn.jsp";
})
.catch(function (error) {
  console.error('Error removing course:', error);
});

	}
}



// using this method, I will show the edit comment popup and existing comment 
function openEditPopup(commentId) {
	
	// Set the commentId in the hidden input field
    document.getElementById('edit-comment-id').value = commentId;
    
    axios.get(`/freshstocks_web/AddCommentServlet?commentId=${commentId}`)
        .then(response => {
            const existingComment = response.data.commentBody;

            // Update the input field with the existing comment
            document.getElementById('edit-comment-input').value = existingComment;

            // Show the popup
            let editPopup = document.getElementById('edit-popup');
            editPopup.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching comment:', error);
        });
}



// using this method, I will update the comment
function submitEditComment(event) {
    event.preventDefault();
    
     let urlParamms = new URLSearchParams(window.location.search);
     let CourseID = urlParamms.get('courseID');

    var commentId = document.getElementById('edit-comment-id').value;
    var commentBody = document.getElementById('edit-comment-input').value;
    
    let editCommentObj = {
        commentId: commentId,
        commentBody: commentBody,
    };

    axios.post('/freshstocks_web/UpdateCommentServlet', { editCommentObj })
    .then(function (response) {
        // Handle success
        console.log('Comment updated successfully');
        const res = response.data;
           if (res === "Comment updated successfully.") {
        alert(response.data);
    } else {
		document.getElementById("errormsg").innerText = response.data;
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	}
        
    })
    .catch(function (error) {
        // Handle error
        console.error('Error updating comment:', error);
    });

    closeEditPopup();
}



// using this method, I will close the edit popup
function closeEditPopup() {
    var editPopup = document.getElementById('edit-popup');
    editPopup.style.display = 'none';
}


// using this method, I will add comment to database
function addcomment(event) {
	 event.preventDefault();

	 let urlParams = new URLSearchParams(window.location.search);
     let courseId = urlParams.get('courseID');

    //for adding new comment these are comment details we get from user.
    let comment = document.getElementById("comment-input").value;

    let commentObj = {
      comment,
      courseId,
    };
    
    
    axios.post('/freshstocks_web/AddCommentServlet', { commentObj })
  .then(response => {
    console.log(response.data);
    const res = response.data;
   
    if (res === "Comment Created Successfully.") {
        alert(response.data);
    } else {
		document.getElementById("errormsg").innerText = response.data;
		document.getElementById("errormsg").style.display = "block";
		setTimeout(() => {
        document.getElementById("errormsg").style.display = "none";
      }, 2000);
	}
	
    if(res == "Comment Created Successfully.") {
      window.location.href=`/freshstocks_web/pages/details.jsp?courseID=${courseId}`;
    }
    // Handle success
  })
  .catch(error => {
    console.error('Error creating course:', error);
    // Handle error
  })
    .finally(() => {
    hideLoader();
  });
    
    
};


// using this method, I will delete the comment from the database
function deleteComment(commentId) {
	event.preventDefault();
	let msg = confirm("Are you Sure! You Want to Delete this Commwnt ?");
	
	if(msg == true) {
	
    axios.get(`/freshstocks_web/DeleteCommentServlet?commentId=${commentId}`)
        .then(response => {
            // Handle success
            console.log('Comment deleted successfully');
            alert(response.data);
            window.location.reload();
        })
        .catch(error => {
            // Handle error
            console.error('Error deleting comment:', error);
        });
        }
}

function viewcertify() {
	window.location.href = `certificate.jsp?courseId=${courseID}`;
}



//enter button js
//comment will go when user press enter key
function entercomment(event) {
    try {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submit-comment").click();
        }
    } catch (error) {
        console.error("Error" + error);
    }
}


function share() {

  try {
    if (navigator.share) {
       navigator.share({
        title: 'Course Title',
        text: 'Check out this awesome course!',
        url: window.location.search
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }

}


//if else for show comments
//edit function new popup div
function edit() {
    document.querySelector(".course-container").style.opacity = "1";
    document.getElementById("edit-comment").style.display = "block";
    document.getElementById("edit-comment").style.marginTop = "1950px";
    document.getElementById("edit-comment").style.width = "60%";
    document.getElementById("edit-comment").style.marginLeft = "250px";
    document.getElementById("edit-comment").style.height = "200px";
    document.getElementById("edit-comment").style.opacity = "1";
}

function backedit() {
    document.getElementById("edit-comment").style.display = "none";
    document.querySelector(".course-container").style.opacity = "1";
}