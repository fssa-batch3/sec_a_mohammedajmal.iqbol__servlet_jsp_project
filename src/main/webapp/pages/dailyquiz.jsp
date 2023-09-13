<%@page import="java.sql.Timestamp"%>
<%@page import="com.fssa.freshstocks.utils.exception.DatabaseException"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="com.fssa.freshstocks.utils.ConnectionUtil"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.fssa.freshstocks.model.Question"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Daily Quiz</title>
<link rel="stylesheet" href="../assets/css/dailyquiz.css" />
</head>
<body>
<%
 int userId = (int) session.getAttribute("loggedInUserID");
int streakCount = 0;
Timestamp quizStartTime = new Timestamp(System.currentTimeMillis());
String time = "";
try (Connection connection = ConnectionUtil.getConnection()) {
    // Query to retrieve the streak_count for a specific user
    String streakCountQuery = "SELECT * FROM user_quiz_info WHERE user_id = ?";

    try (PreparedStatement pst = connection.prepareStatement(streakCountQuery)) {
        pst.setInt(1, userId);
        try (ResultSet resultSet = pst.executeQuery()) {
            if (resultSet.next()) {
                streakCount = resultSet.getInt("streak_count");
                quizStartTime = resultSet.getTimestamp("quiz_start_time");
                time = quizStartTime.toString();
            } 
        }
    }
} catch (SQLException | DatabaseException e) {
    e.printStackTrace();
}
%>
	<div class="container">
		<div class="quiz-header">
			<h1 class="quiz-title">Daily Trading Quiz</h1>
			<div class="streak-div">
				<p class="quiz-streak">
					&#128293;<span class="streak-value" id="streak"><%= streakCount %></span>
				</p>
			</div>
			<button id="start-quiz-button">Start Quiz</button>
		</div>
		<%
		List<Question> questions = new ArrayList<>();

		try (Connection connection = ConnectionUtil.getConnection()) {
			// Query to retrieve random questions from the quiz_questions table
			String randomQuestionsQuery = "SELECT * FROM quiz_questions ORDER BY RAND() LIMIT 1"; // Adjust the LIMIT as needed

			try (PreparedStatement preparedStatement = connection.prepareStatement(randomQuestionsQuery);
			ResultSet resultSet = preparedStatement.executeQuery()) {

				while (resultSet.next()) {
			Question question = new Question();
			question.setQuestion(resultSet.getString("question_text"));
			question.setoption1(resultSet.getString("option1"));
			question.setoption2(resultSet.getString("option2"));
			question.setoption3(resultSet.getString("option3"));
			question.setoption4(resultSet.getString("option4"));
			question.setCorrectAnswer(resultSet.getString("correct_answer"));
			questions.add(question);
				}
			}
		} catch (SQLException | DatabaseException e) {
			e.printStackTrace();
		}

		for (Question question : questions) {
		%>
		<div class="quiz-content">
			<form class="answer-form" id="answer-form" action="../submitAnswer"
				method="POST"  style="display:none;">
				<div class="question-container">
					<span>Question:
						<p class="question-text" id="question-text"><%=question.getQuestion()%></p>
					</span>
				</div>
				<input type="hidden" name="correctAnswer"
					value="<%=question.getCorrectAnswer()%>"> <input
					type="hidden" name="quizStartTime" id="quizStartTime" value="">
				<input type="hidden" name="answeredToday" id="answeredToday"
					value=""> <label for="answer">Select your answer:</label> <select
					id="answer" class="answer-select" name="selectedAnswer" required>
					<option value="<%=question.getOption1()%>"><%=question.getOption1()%></option>
					<option value="<%=question.getOption2()%>"><%=question.getOption2()%></option>
					<option value="<%=question.getOption3()%>"><%=question.getOption3()%></option>
					<option value="<%=question.getOption4()%>"><%=question.getOption4()%></option>
				</select>
				<button type="submit" class="submit-button" id="submit-button">Submit</button>
			</form>
		</div>

		<%
		}
		%>
		<div class="quiz-footer">

			<p class="already-answered" id="already-answered"></p>
			<p class="timer" id="timer"></p>
			<h1 class="submit-msg" id="submit-msg"></h1>
			<a href="leaderboard.jsp">LeaderBoard</a>

			<ol>
				<h2>Daily Quiz Rules</h2>
				<li class="quiz-info"><strong>Test Timing:</strong> You have a
					total of 1 minute to complete the quiz.</li>
				<li class="quiz-info"><strong>Entering Full Screen:</strong> To
					begin the quiz, click the "Start Quiz" button. Please do not
					attempt to exit full-screen mode during the quiz, as it will
					automatically submit your answers.</li>
				<li class="quiz-info"><strong>Questions:</strong> You will be
					presented a single trading-related question. Read each question
					carefully.</li>
				<li class="quiz-info"><strong>Answers:</strong> For each
					question, select the answer you believe is correct from the
					dropdown menu and click the "Submit" button.</li>
				<li class="quiz-info"><strong>Scoring:</strong> You will earn
					points for each correct answer. Your streak will increase with each
					correct answer and decrease with each incorrect answer.</li>
				<li class="quiz-info"><strong>Streak&#128293;:</strong> Your
					streak reflects the number of consecutive correct answers. Try to
					maintain a high streak throughout the quiz.</li>
				<li class="quiz-info"><strong>Navigation:</strong> You cannot
					go back to previous questions once they are answered, so choose
					your answers wisely.</li>
				<li class="quiz-info"><strong>Auto-Submission:</strong> If you
					try to exit full-screen mode or if the time limit of 1 minute is
					reached, the quiz will be automatically submitted.</li>
				<li class="quiz-info"><strong>Restart:</strong> After the quiz
					is completed, you can restart a new quiz session.</li>
				<li class="quiz-info"><strong>Enjoy:</strong> Have fun and
					enjoy the quiz! It's a great way to test your trading knowledge.</li>
			</ol>
			<br> &emsp;<a href="home.jsp" class="back-button">Back to
				Home</a>
		</div>
	</div>


<script>


         var quizStartTime = new Date(); 
         var quizStartTimeMillis = quizStartTime.getTime();
        document.getElementById("quizStartTime").value = quizStartTimeMillis;
        document.getElementById("answeredToday").value = "true";
        
        
        let isInFullscreen = false;
        let isQuizSubmitted = false;
        
        const startQuizButton = document.getElementById("start-quiz-button");
        const submitButton = document.getElementById("submit-button");

        startQuizButton.addEventListener("click", () => {
        	
                if (!isInFullscreen && !isQuizSubmitted) {
                	document.getElementById("answer-form").style.display = "block";
                     
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

                    setTimeout(() => {
                        if (!isQuizSubmitted) {
                            submitQuizAndExitFullscreen();
                        }
                    }, 60000); // Simulated delay before quiz submission 60seconds
            }
        });
        
        submitButton.addEventListener("click", submitQuizAndExitFullscreen);
        
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

                // Mark that we are no longer in fullscreen mode and the quiz is submitted
                isInFullscreen = false;
                isQuizSubmitted = true;
                
                document.getElementById("answer-form").style.display = "none";
                document.getElementById("submit-msg").innerText="Quiz Submitted Successfully";
                
            }
            }
    	
    	document.addEventListener('keydown', function(event) {
    	    if (event.ctrlKey) {
    	        document.getElementById('answer-form').submit();
    	    }
    	});
    	
    	

</script>
</body>
</html>