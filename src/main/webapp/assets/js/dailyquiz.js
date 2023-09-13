/**
 * 
 */

 document.addEventListener("DOMContentLoaded", function () {

        // Function to prevent Ctrl + M key combination
    function preventCtrlM(event) {
        if (event.ctrlKey && event.keyCode === 77) {
            event.preventDefault();
        }
    }

    // Add a keydown event listener to the document
    document.addEventListener("keydown", preventCtrlM);
});

        const startQuizButton = document.getElementById("start-quiz-button");
        const alreadyAnswered = document.getElementById("already-answered");
        const timerElement = document.getElementById("timer");
        let isInFullscreen = false;
        let isQuizSubmitted = false;
        
        const questionText = document.getElementById("question-text");
        const answerForm = document.getElementById("answer-form");
        const answerSelect = document.getElementById("answer");
        const streakElement = document.getElementById("streak");

        // Function to request fullscreen mode and start the quiz
        function startQuizAndFullscreen() {
            if (!isInFullscreen) {
            	 document.getElementById("question-text").style.display = "block";
                 document.getElementById("answer-form").style.display = "block";
                 document.getElementById("streak").style.display = "block";
                 document.getElementById("submit-button").style.display = "block";
                 
                const element = document.documentElement;

                // Request fullscreen mode
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }

                // Mark that we are in fullscreen mode
                isInFullscreen = true;

                // Add your code to start the quiz here
                // For example, you can navigate to the first quiz question or load quiz content

                // Simulate the completion of the quiz (all questions are answered)
                // Replace this with your actual quiz completion logic
                setTimeout(() => {
                    if (!isQuizSubmitted) {
                        submitQuizAndExitFullscreen();
                    }
                }, 60000); // Simulated delay before quiz submission
                
                startOrResumeTimer();
            }
        }
        
     // Function to start or resume the timer
        function startOrResumeTimer() {
            const quizStartTime = localStorage.getItem("quizStartTime");
            if (!quizStartTime) {
                // If there is no stored start time, start a new quiz
                localStorage.setItem("quizStartTime", new Date().getTime().toString());
                start24HourTimer();
            } else {
                // If there is a stored start time, calculate the remaining time
                const currentTime = new Date().getTime();
                const quizDuration = 1 * 60 * 1000; // 24 hours in milliseconds
                const elapsedTime = currentTime - parseInt(quizStartTime);

                if (elapsedTime >= quizDuration) {
                    // The quiz duration has already passed, allow the user to attend the next question
                    timerElement.innerText = "You can attend the next question now!";
                    startQuizButton.disabled = false;
                    alreadyAnswered.innerText = "";
                    localStorage.removeItem("quizStartTime");
                    localStorage.removeItem("answeredToday");
                    
                } else {
                    // Resume the timer with the remaining time
                    const remainingTime = quizDuration - elapsedTime;
                    start24HourTimer(remainingTime);
                }
            }
        }

        // Function to start a timer with the given remaining time
        function start24HourTimer(remainingTime = 1 * 60 * 1000) {
            // Update the timer every second
            const timerInterval = setInterval(function () {
            	const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                // Display the timer
                timerElement.innerText = `Next question available in: ${hours}h ${minutes}m ${seconds}s`;

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    
                }

                remainingTime -= 1000;
            }, 1000);
        }

        // Function to submit the quiz and exit fullscreen mode
        function submitQuizAndExitFullscreen() {
            if (isInFullscreen && !isQuizSubmitted) {
                // Add your code to submit the quiz here
                // For example, you can check if all questions are answered, calculate scores, etc.

                // Exit fullscreen mode
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
                localStorage.setItem("answeredToday","true");

                // Mark that we are no longer in fullscreen mode and the quiz is submitted
                isInFullscreen = false;
                isQuizSubmitted = true;
                
                
                document.getElementById("submit-msg").innerText="Quiz Submitted Successfully";
                
            }
        }

     // Check if the user has already answered today
        const answeredToday1 = localStorage.getItem("answeredToday");

        if (answeredToday1 === "true") {
            // User has already answered today, disable the "Start Quiz" button
            startQuizButton.disabled = true;
            alreadyAnswered.innerText = "You have already answered today.";
        } 

        // Add event listener to the "Start Quiz" button
        startQuizButton.addEventListener("click", startQuizAndFullscreen);
        
        answerForm.addEventListener("submit", checkAnswer);
        

        // Listen for the user's attempt to exit fullscreen
        document.addEventListener("fullscreenchange", function () {
            if (!document.fullscreenElement && isInFullscreen && !isQuizSubmitted) {
                // Automatically submit the quiz and exit fullscreen mode
                submitQuizAndExitFullscreen();
            }
        });
    
    
        startOrResumeTimer();
    

        const questions = [
        	  {
        	    question: "What is a stop-loss order in trading?",
        	    options: [
        	      "An order to buy at a specified price",
        	      "An order to sell at a specified price",
        	      "An order to buy at the market price",
        	      "An order to sell at the market price",
        	    ],
        	    correctAnswer: "An order to sell at a specified price",
        	  },
        	  {
        	    question: "What does 'IPO' stand for in the context of trading?",
        	    options: [
        	      "Initial Public Offering",
        	      "International Portfolio Organization",
        	      "Investor Profit Opportunity",
        	      "Internal Performance Order",
        	    ],
        	    correctAnswer: "Initial Public Offering",
        	  },
        	  {
        	    question: "Which market is known for trading commodities such as gold and oil?",
        	    options: ["Stock market", "Forex market", "Commodity market", "Bond market"],
        	    correctAnswer: "Commodity market",
        	  },
        	  {
        	    question: "What is the term for the difference between the bid and ask price of a security?",
        	    options: ["Spread", "Margin", "Leverage", "Volatility"],
        	    correctAnswer: "Spread",
        	  },
        	  {
        	    question: "In technical analysis, what does RSI stand for?",
        	    options: [
        	      "Relative Strength Index",
        	      "Return on Investment",
        	      "Risk and Strategy Indicator",
        	      "Resistance and Support Index",
        	    ],
        	    correctAnswer: "Relative Strength Index",
        	  },
        	  {
        	    question: "What is the primary function of a stock exchange?",
        	    options: [
        	      "To set interest rates",
        	      "To issue government bonds",
        	      "To facilitate the buying and selling of stocks",
        	      "To provide insurance services",
        	    ],
        	    correctAnswer: "To facilitate the buying and selling of stocks",
        	  },
        	  {
        	    question: "What is the term for a market condition where prices are falling sharply?",
        	    options: ["Bull market", "Bear market", "Sideways market", "Bullish market"],
        	    correctAnswer: "Bear market",
        	  },
        	  {
        	    question: "What does 'Diversification' mean in investment?",
        	    options: [
        	      "Investing in a single asset class",
        	      "Spreading investments across different assets",
        	      "Investing in high-risk assets",
        	      "Holding onto cash",
        	    ],
        	    correctAnswer: "Spreading investments across different assets",
        	  },
        	  {
        	    question: "What is a 'Blue Chip' stock?",
        	    options: [
        	      "A low-priced stock",
        	      "A speculative stock",
        	      "A well-established, stable, and reputable company's stock",
        	      "A stock with high volatility",
        	    ],
        	    correctAnswer: "A well-established, stable, and reputable company's stock",
        	  },
        	  {
        	    question: "What is 'Day Trading'?",
        	    options: [
        	      "Buying and selling within the same trading day",
        	      "Investing for the long term",
        	      "Trading during the night",
        	      "Trading only on weekends",
        	    ],
        	    correctAnswer: "Buying and selling within the same trading day",
        	  },
        	  {
        	    question: "What does 'Liquidity' refer to in trading?",
        	    options: [
        	      "How quickly an asset can be converted into cash without affecting its price",
        	      "How much profit can be made in a trade",
        	      "The size of a company",
        	      "The total assets of a company",
        	    ],
        	    correctAnswer: "How quickly an asset can be converted into cash without affecting its price",
        	  },
        	  {
        	    question: "What is a 'Pip' in Forex trading?",
        	    options: [
        	      "A small fruit",
        	      "A unit of currency movement",
        	      "A type of stock",
        	      "A trading strategy",
        	    ],
        	    correctAnswer: "A unit of currency movement",
        	  },
        	  {
        	    question: "What is the 'Bullish' market sentiment?",
        	    options: [
        	      "Positive outlook, expecting prices to rise",
        	      "Negative outlook, expecting prices to fall",
        	      "No specific outlook",
        	      "A market for bulls",
        	    ],
        	    correctAnswer: "Positive outlook, expecting prices to rise",
        	  },
        	  {
        	    question: "What is 'Volatility' in the context of trading?",
        	    options: [
        	      "A measure of market stability",
        	      "A measure of market predictability",
        	      "A measure of market size",
        	      "A measure of price fluctuations",
        	    ],
        	    correctAnswer: "A measure of price fluctuations",
        	  },
        	  {
        	    question: "What is the purpose of a 'Margin Call'?",
        	    options: [
        	      "To request more time for trading",
        	      "To close a trading account",
        	      "To notify traders of their margin balance",
        	      "To request additional funds due to trading losses",
        	    ],
        	    correctAnswer: "To request additional funds due to trading losses",
        	  },
        	];

        
        let streak = 0;
        let answeredToday = false;

        // Function to get the streak from local storage
        function getStreak() {
        	const streakValue = '<%= session.getAttribute("streak") %>';
            return streakValue ? parseInt(streakValue) : 0;
        }

        // Function to update the streak and store it in the session attribute
        function updateStreak(newStreak) {
            streak = newStreak;
            streakElement.textContent = `${streak}`;

            // Get the quiz start time and answeredToday from localStorage
            const quizStartTime = localStorage.getItem("quizStartTime");
            const answeredToday = localStorage.getItem("answeredToday");

            // Create an object containing all the data you want to send
            const data = {
                streak: newStreak,
                quizStartTime: quizStartTime,
                answeredToday: answeredToday
            };

            fetch('updateStreakServlet', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response if needed
                })
                .catch(error => {
                    console.error('Error updating streak:', error);
                });

        }

        function displayRandomQuestion() {
        	let answeredToday = localStorage.getItem("answeredToday");
          if (!answeredToday) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            const randomQuestion = questions[randomIndex];
            questionText.textContent = randomQuestion.question;

            // Populate answer options
            answerSelect.innerHTML = "";
            for (const option of randomQuestion.options) {
            	  const optionElement = document.createElement("option");
            	  optionElement.value = option;
            	  optionElement.textContent = option;
            	  answerSelect.appendChild(optionElement);
            	}
          } else {
            // Quiz is completed for the day, exit fullscreen mode (modify as needed)
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }

        // Function to check the answer
        function checkAnswer(e) {
          e.preventDefault();
          
       // Check if the user has already answered today
          const answeredToday = localStorage.getItem("answeredToday");

          if (!answeredToday) {
            const selectedAnswer = answerSelect.value.trim();
            const randomQuestion = questions.find((q) => q.question === questionText.textContent);
            
            console.log("Selected Answer:", selectedAnswer);
            console.log("Correct Answer:", randomQuestion.correctAnswer.trim());

            if (selectedAnswer === randomQuestion.correctAnswer.trim()) {
              updateStreak(streak + 1);
            } else {
              updateStreak(0);
            }
            
            // Mark that the user has answered today
            const answeredToday = '<%= session.getAttribute("answeredToday") %>';
            
            displayRandomQuestion();
            
            window.location.href="dailyquiz.jsp";
            
          }
        }

        // Initial question load
        displayRandomQuestion();

        // Initialize the streak from local storage
        updateStreak(getStreak());
