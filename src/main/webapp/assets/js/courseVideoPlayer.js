/**
 * 
 */

            const videoPlayer = document.getElementById("videoPlayer");
            const urlParams = new URLSearchParams(window.location.search);
            const videoId = urlParams.get('videoId');
            const courseId = urlParams.get('courseID');
            
            console.log(videoId);
            console.log(courseId);
            
            
            document.addEventListener('DOMContentLoaded', function() {
    var videoElement = document.getElementById('videoPlayer');
    var fullScreenButton = document.getElementById('fullScreenButton');

    fullScreenButton.addEventListener('click', function() {
        toggleFullScreen(videoElement);
    });

    function toggleFullScreen(element) {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
});


            if (videoId && courseId) {
                // Make an Axios request to get the video URL from the server
                axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseId}`)
                    .then(response => {
						
						let courseDetails = response.data;
						
						
						let div1 = document.createElement("div");
						div1.setAttribute("class","accord")
div1.innerHTML = `
                        <button class="accordion1">Course Videos</button>
     					<button class="accordion">Beginner's Module</button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseId}&videoId=${1}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName1}</li></a> <br>
					</div>

					<button class="accordion">Intermediate Module</button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseId}&videoId=${2}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName2}</li></a> <br>
					</div>

					<button class="accordion">Advanced Module</button>
					<div class="panel">
						<a href="courseVideoPlayer.jsp?courseID=${courseId}&videoId=${3}" class="course-links" id="course-links1"
							target="_blank" onclick="openFile(event)"><li
							class="begginer-module">${courseDetails.courseVideoName3}</li></a> <br>
					</div>
`;

 document.querySelector("body").append(div1);
 
 
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

let div2 = document.createElement("div");
div2.setAttribute("class","course-details")
div2.innerHTML = `

<h2>Course Name: ${courseDetails.name}</h2>
    <p><strong>Timing:</strong> ${courseDetails.timing}</p>
    <p><strong>Language:</strong> ${courseDetails.language}</p>
    <p><strong>Description:</strong> ${courseDetails.description}</p>
    <p><strong>Instructor:</strong> ${courseDetails.instructorName}</p>
    <p><strong>Company:</strong> ${courseDetails.companyName}</p>
    <p><strong>Category:</strong> ${courseDetails.companyCategory}</p>
    <p><strong>Top Skills:</strong> ${courseDetails.topSkills}</p>
`;
 document.querySelector("body").append(div2);

						
                         console.log(courseDetails);
                         
                         switch (videoId) {
                    case '1':
                        videoPlayer.src = `${courseDetails.courseVideo1}`;
                        break;
                    case '2':
                        videoPlayer.src = `${courseDetails.courseVideo2}`; 
                        break;
                    case '3':
                        videoPlayer.src = `${courseDetails.courseVideo3}`; 
                        break;
                    default:
                        break;
                       }
                       
                    videoPlayer.addEventListener('ended', function() {
                                // Video finished, send request to update database
                                const confirmed = window.confirm('Did you watch the video fully?');
    
                             if (confirmed) {
								 
								 let updateProgressObj = {
									 courseID: courseId,
                                    videoID: videoId
								 };
                               
                                axios.post('/freshstocks_web/UpdateMyCoursesServlet', { updateProgressObj })
                                .then(response => {
                                    console.log('Video progress saved successfully.');
                                    alert(response.data);
                                    window.location.href=`details.jsp?courseID=${courseId}`;
                                })
                                .catch(error => {
                                    console.error('Error saving video progress:', error);
                                });
                                
                                }
                            }); // ended addeventlistener end
                    })
                    .catch(error => {
                        alert("Error fetching video URL:" + error);
                    });
            }

/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);




function toggleFullScreen(element) {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}



