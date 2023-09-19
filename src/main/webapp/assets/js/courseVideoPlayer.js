/**
 * 
 */

            const videoPlayer = document.getElementById("videoPlayer");
            const urlParams = new URLSearchParams(window.location.search);
            const videoId = urlParams.get('videoId');
            const courseId = urlParams.get('courseID');
            
            console.log(videoId);
            console.log(courseId);

            if (videoId && courseId) {
                // Make an Axios request to get the video URL from the server
                axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseId}`)
                    .then(response => {
						
						let courseDetails = response.data;
						
                         console.log(courseDetails);
                         
                         switch (videoId) {
                    case '1':
                        videoPlayer.src = "../assets/images/652333414.mp4";
                        break;
                    case '2':
                        videoPlayer.src = "../assets/images/652333414.mp4"; 
                        break;
                    case '3':
                        videoPlayer.src = "../assets/images/652333414.mp4"; 
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
                        console.error('Error fetching video URL:', error);
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














