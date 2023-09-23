/**
 * 
 */

 function nextquiz() {
	  let secondsRemaining = localStorage.getItem('secondsRemaining') || (24 * 60 * 60); // 24 hours in seconds

		    const countdownInterval = setInterval(() => {
		        secondsRemaining--;
		        if (secondsRemaining >= 1) {
		            const hours = Math.floor(secondsRemaining / 3600);
		            const minutes = Math.floor((secondsRemaining % 3600) / 60);
		            const seconds = secondsRemaining % 60;
		            document.getElementById("next-quiz").textContent = `Next quiz in ${hours}h ${minutes}m ${seconds}s`;
		            localStorage.setItem('secondsRemaining', secondsRemaining);
		        } else {
		            clearInterval(countdownInterval);
		            if (!isQuizSubmitted) {
		                submitQuizAndExitFullscreen();
		            }
		        }
		    }, 1000);
 }