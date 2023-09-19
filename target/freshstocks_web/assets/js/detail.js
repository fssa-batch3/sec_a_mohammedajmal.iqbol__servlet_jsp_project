/**
 * 
 */

let urlParams = new URLSearchParams(window.location.search);
let courseID = urlParams.get('courseID');  


axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseID}`)
.then(function (response) {
	
    let courseDetails = response.data;
    
    const markedPrice = courseDetails.markedPrice;
        const sellingPrice = courseDetails.sellingPrice;
        const discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;
        const discountFormatted = Math.floor(discountPercentage.toFixed(2));

let div1 = document.createElement("div");
div1.setAttribute("class","heropage"); 
div1.innerHTML = `

   <div class="details-head">

		<div class="heropage">
			<div class="breadcrumb">
				<a href="home.jsp" class="breadcrumblink">Home</a> <a
					href="learn.jsp" class="breadcrumblink">Learn</a> <a href="#"
					class="breadcrumblink">Details</a>
			</div>

			<div class="course-details">
				<p>Course Title :</p>
				<h1>${courseDetails.name}</h1>


				<div class="course-detail-time">
					<p>
						<b>Course Timing</b> <br> <br>${courseDetails.timing}</p>
					<p>
						<b>Course Language</b> <br> <br>${courseDetails.language}</p>
					<p>
						<b>Students Intake</b> <br> <br>200 Per Batch
					</p>
					<p id="sellingPrice">
						<b>Course Cost</b> <br> <br>&emsp; &#8377;
						${courseDetails.sellingPrice}</p>



					<div>
						<div class="course-price" id="course-price">
							<p>
								<b>Course Cost</b> <br> <br>&#8377;
								${courseDetails.sellingPrice}</p>
							<br> <br>
							<p>
								<b>Course Old Cost</b> <br> <br> <strike>&#8377;
								   ${courseDetails.markedPrice}</strike>
							</p>
							<br> <br>
							<p>
								<b>Course Discount</b> <br> <br>${discountFormatted} %
							</p>
						</div>
						<p id="course-days">
							<span><b>Days Left</b> <br> <br>30 days</span>&nbsp;left
							at this price!
						</p>

						<div class="buttons-div">

							<button class="add-to-cart" id="add-to-cart" onclick="enrollcourse(${courseDetails.sellingPrice})">Enroll Now</button>
							<br>
							<button id="deletecourse" class="delete" onclick="deletemycourses()">Delete from My
								Courses</button>
							<br>
							<button id="deletebookmark" class="delete">Remove from
								Bookmark</button>
							<br> <a class="full-access-para" href="">Full Lifetime
								Access</a>
							<button class="share" id="share" onclick="share()">Share</button>
							<br>
							<button class="gift" onclick="gift()">Gift this course</button>
							<br>

						</div>
					</div>




				</div>

				<br>


				<div class="navlinks" id="navlinks">
					<a href="#about" class="link1">About</a> <a href="#instructor"
						class="link1">Instructor</a> <a href="#offered-by" class="link1">Offered
						By</a> <a href="#videos" class="link1">Videos</a> <a href="#comment"
						class="link1">Comments</a> <a href="../pages/userContact.jsp"
						class="link1">Contact</a>
				</div>



				<h1 class="learn-couse" id="about">About</h1>

				<h1 class="learn-couse">What you'll learn from this course</h1>

				<ul class="list-learnings">
					<h2 class="list-learning">Course Description</h2>
					<p class="course-desc">${courseDetails.description}</p>
					<br>
					<h2 class="list-learning">Top Skills You'll Learn</h2>
					<br>
					<div id="list-learn">

						<li class="list-learning">${courseDetails.topSkills}
				</ul>




				<ul class="list-learnings">
					<br>
					<h2 class="list-learning">Highlights</h2>
					<li class="list-learning">100% worth of money</li>
					<li class="list-learning">You will get a certificate once you
						completed the course</li>
					<li class="list-learning">You always get 24/7 Chat Support</li>
					<li class="list-learning">Participate the Live trading session</li>
				</ul>
				<br>



				<div class="instructorcontainer">
					<p class="learn-couse" id="instructor">Instructor</p>

					<div class="instructor-div">
						<div>
							<img src="${courseDetails.coverImage}" alt="" id="instruct-image">
						</div>
						<div class="letters-instuct">
							<a href="#" class="instruct-namelink"><h2>${courseDetails.instructorName}</h2></a>
							<p>${courseDetails.companyName}</p>
							<p class="courses-add">
								<b>4</b> Courses
							</p>
						</div>

					</div>

				</div>





				<div class="offered-by" id="offered-by">
					<p class="learn-couse" id="about">Offered By</p>

					<div class="instructor-div">
						<div>
							<img src="${courseDetails.coverImage}" alt="" id="instruct-image">
						</div>
						<div class="letters-instuct">
							<a href="#" class="instruct-namelink"><h2>${courseDetails.companyName}</h2></a>
							<p>${courseDetails.companyCategory}</p>
							<p class="courses-add">
								<b>4</b> Courses
							</p>
						</div>

					</div>

				</div>


				<div class="offered-by-videos" id="videos">
					<p class="learn-couse" id="about1">Videos</p>


					<button class="accordion">Beginner's Module <span id="locked1">&#128274;</span></button>
					<div class="panel">
						<a href="${courseDetails.courseVideo1}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName1}</li></a><a class="quiz-btn"
							id="quiz1" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 2</li></a><a class="quiz-btn" id="quiz2" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 3</li></a><a class="quiz-btn"
							id="quiz3" href="">take quiz</a><br> <br>
					</div>

					<button class="accordion">Intermediate Module <span id="locked2">&#128274;</span></button>
					<div class="panel">
						<a href="${courseDetails.courseVideo2}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName2}</li></a><a class="quiz-btn"
							id="quiz4" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 5</li></a><a class="quiz-btn" id="quiz5" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 6</li></a><a class="quiz-btn"
							id="quiz6" href="">take quiz</a><br> <br>
					</div>

					<button class="accordion">Advanced Module <span id="locked3">&#128274;</span></button>
					<div class="panel">
						<a href="${courseDetails.courseVideo3}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName3}</li></a><a class="quiz-btn"
							id="quiz7" href="">take quiz</a><br> <br> <a href="#"
							class="course-links" id="course-links1" target="_blank"
							onclick="openFile(event)"><li class="begginer-module">Course
								Video 8</li></a><a class="quiz-btn" id="quiz8" href="">take quiz</a><br>
						<br> <a href="#" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">Course Video 9</li></a><a class="quiz-btn"
							id="quiz9" href="">take quiz</a><br> <br>
					</div>


				</div>


				<div class="offered-by" id="comment">
					<p class="learn-couse" id="about">Comments</p>
					<div class="what-you-learn">

						<form id="addcomment" onsubmit="addcomment(event)">
							<span class="hint--bottom hint--rounded"
								aria-label="Use this textarea to Give Comments for this course">
								<textarea type="text" name="comment" id="comment-input"
									placeholder="comment here" onkeypress="entercomment(event)"></textarea>
							</span> <span class="hint--top hint--rounded"
								aria-label="Submit Your Comments"><button
									class="submit-comment" type="submit" id="submit-comment">Submit</button></span>
						</form>

						<div id="new-comments">
							<!-- comments div start -->


<div id="edit-popup" class="popup" style="display:none;">
    <div class="popup-content">
        <span class="close" onclick="closeEditPopup()">&times;</span>
        <h2 class="popup-title">Edit Comment</h2>
        <form onsubmit="submitEditComment(event)">
            <input type="hidden" id="edit-comment-id" name="commentId">
            <input type="text" id="edit-comment-input" class="edit-comment-input" placeholder="Edit your comment...">
            <button type="submit" id="submit-edit-comment" class="submit-edit-comment">Submit</button>
        </form>
    </div>
</div>


						</div>
						<!-- comments div end -->
						<br> <br> <br> <br>

					</div>

				</div>


			</div>


		</div>
		<div class="heropage2">
			<img src="${courseDetails.coverImage}" alt="" id="course-image">
		</div>
	</div>

	<div class="course-container">

		<div class="course">

			<div class="course-div">
				<button class="add-to-cart" id="add-to-cart" onclick="enrollcourse(${courseDetails.courseId})">Enroll Now</button>
				<br>
				<button id="deletecourse" class="delete">Delete from My
					Courses</button>
				<br>
				<button id="deletebookmark" class="delete">Remove from
					Bookmark</button>
				<br> <a class="full-access-para" href="">Full Lifetime
					Access</a>
				<div>
					<button class="share" id="share" onclick="share()">Share</button>
					<br>
					<button class="gift" onclick="gift()">Gift this course</button>
					<br>
				</div>
			</div>
		</div>




		<div class="share-div" id="share-div" style="display: none;">
			<h1 class="share-h1">Share The Course</h1>
			<p class="share-p">
				You can Share this Course to your friends and relatives<br>
				through these Social Media or using this link to get the course
			</p>
			<div class="social-media">
				<a href="https://www.google.com/"><img class="google"
					src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
					alt=""></a> <a href="https://www.facebook.com/"><img
					class="facebook"
					src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
					alt=""></a> <a href="https://www.instagram.com/"><img
					class="instagram"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
					alt=""></a> <a href="https://twitter.com/home"><img
					class="instagram"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&amp;usqp=CAU"
					alt=""></a> <a href="https://mail.google.com/mail/u/0/#inbox"><img
					class="instagram"
					src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI"
					alt=""></a>
			</div>
			<p class="share-p">
				<b>Or Use the link to share the Course</b>
			</p>
			<input class="link-input" id="link-input" type="text" name=""
				value="" disabled="">
			<button class="share-p" id="back" onclick="back()">Back</button>
		</div>


		<div class="gift-div" id="gift-div" style="display: none;">
			<h1 class="share-h1">Gift The Course</h1>
			<p class="share-p">
				You can Gift this Course to your friends and relatives<br>
				through these Social Media or using this link to get the course for
				free
			</p>
			<div class="social-media">
				<a href="https://www.google.com/"><img class="google"
					src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
					alt=""></a> <a href="https://www.facebook.com/"><img
					class="facebook"
					src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
					alt=""></a> <a href="https://www.instagram.com/"><img
					class="instagram"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
					alt=""></a> <a href="https://twitter.com/home"><img
					class="instagram"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&amp;usqp=CAU"
					alt=""></a> <a href="https://mail.google.com/mail/u/0/#inbox"><img
					class="instagram"
					src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI"
					alt=""></a>
			</div>
			<p class="share-p">
				<b>Or Use the link to Gift the Course</b>
			</p>
			<input class="link-input" id="link-input1" type="text" name=""
				value="" disabled="">
			<button class="share-p" id="back" onclick="giftback()">Back</button>
		</div>


		<!-- edit new tab -->

		<form class="edit-comment" id="edit-comment"
			action="../EditCommentServlet" style="display: none;" method="post">
			<h1 class="share-h1">Edit Comment</h1>
			<input class="comment-input" id="comment-edit" type="text"
				name="comment" placeholder="  Enter a new Comment"> <input
				type="hidden" name="commentId" value="commentId" />
			<button class="share-p" id="submit-edit" onclick="submitedit()"
				type="submit">Submit</button>
			<button class="share-p" id="back" onclick="backedit()">Back</button>
		</form>
		
		
		</div>
`;


    document.querySelector("body").append(div1);
    
addcomment();

coursePurchased();


})
.catch(function (error) {
    // Handle error
    console.error('Error fetching course details:', error);
});


let urlParamms = new URLSearchParams(window.location.search);
let CourseID = urlParamms.get('courseID');

axios.get(`/freshstocks_web/UpdateCommentServlet?courseId=${CourseID}`)
.then(response => {
const courses = response.data;
console.log(response.data);

if(courses[0] == null){
	  
			  let div1 = document.createElement("div");
   div1.setAttribute("class", "comment-1");
   div1.setAttribute("id", "comment-1");
   div1.innerHTML = `
	   <div class="comment-img">
		   <p class="comment-letters" id="comment-letters">No Comments Available Right Now! </p>
	   </div>
   `;
   
   document.querySelector("#new-comments").appendChild(div1);
}

courses.forEach(course => {
   let div1 = document.createElement("div");
   div1.setAttribute("class", "comment-1");
   div1.setAttribute("id", "comment-1");
   div1.innerHTML = `
	   <div class="comment-img">
		   <img class="profile-img_block" id="profile-pic" src="${course.userProfile}">
		   <p class="comment-letters" id="comment-letters">${course.commentBody}</p>
		   &emsp;
		   <p class="datenow">${course.createdTime}</p>
		   <a onclick="openEditPopup(${course.commentId})"
			   style="display: inline-block; padding: 5px 16px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 20px;">Edit</a>
		   <a onclick="deleteComment(${course.commentId})"
			   style="display: inline-block; padding: 5px 16px; background-color: red; color: #fff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; height: fit-content; margin: 15px 0px;">Delete</a>
		   <button style="display: none;">Edit</button>
		   <button style="display: none;">Delete</button>
	   </div>
   `;
   
   document.querySelector("#new-comments").appendChild(div1);
});
})
.catch(error => {
console.error('Error creating course:', error);
// Handle error
});


function coursePurchased() {
	
	let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseID');  
	
	axios.get(`/freshstocks_web/getPurchasedCourses?courseId=${courseID}`)
    .then(function(response) {
        // Handle the response data, which should be an array of purchased courses
        let purchasedCourse = response.data;
        
        if(purchasedCourse){
			document.getElementById("add-to-cart").style.display = "none";
			
		let buttonsDiv = document.querySelector('.buttons-div');

    buttonsDiv.style.position = 'absolute';
    buttonsDiv.style.left = '100px';
    buttonsDiv.style.top = '360px';
    
    document.getElementById("locked1").style.display = "none";
    document.getElementById("locked2").style.display = "none";
    document.getElementById("locked3").style.display = "none";
    document.getElementById("course-price").style.right = '700px';
    document.getElementById("course-days").style.top = '27px';
    document.getElementById("course-days").style.right = '170px';
    
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

		}
        
           })
            .catch(function(error) {
                console.error(error);
            });
}



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
        alert(res);
        
    })
    .catch(function (error) {
        // Handle error
        console.error('Error updating comment:', error);
    });

    closeEditPopup();
}




function closeEditPopup() {
    var editPopup = document.getElementById('edit-popup');
    editPopup.style.display = 'none';
}



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
    alert(response.data);
    if(res === "Comment Created Successfully.") {
        window.location.href=`/freshstocks_web/pages/details.jsp?courseID=${courseId}#comment`;
    }
    // Handle success
  })
  .catch(error => {
    console.error('Error creating course:', error);
    // Handle error
  });
    
    
};


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

// video or image file reader code end

// share div display block
function share() {
  document.querySelector(".course-container").style.opacity = "0.7";
  document.querySelector("body").style.backgroundColor = "black";
  document.getElementById("share-div").style.display = "block";
  document.getElementById("share-div").style.opacity = "1";
}

// share div back
function back() {
  document.getElementById("share-div").style.display = "none";
  document.querySelector(".course-container").style.opacity = "1";
  document.querySelector("body").style.backgroundColor = "#F6F8FC";
}

// gift div display block
function gift() {
  document.querySelector(".course-container").style.opacity = "0.7";
  document.querySelector("body").style.backgroundColor = "black";
  document.getElementById("gift-div").style.display = "block";
  document.getElementById("gift-div").style.opacity = "1";
}

// gift div back
function giftback() {
  document.getElementById("gift-div").style.display = "none";
  document.querySelector(".course-container").style.opacity = "1";
  document.querySelector("body").style.backgroundColor = "#F6F8FC";
}

//delete course from my courses when clicking a button

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


function googleTranslateElementInit() {
  const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  return translateElement;
}