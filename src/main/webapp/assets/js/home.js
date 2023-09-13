/**
 * 
 */

 document.addEventListener("DOMContentLoaded", function () {
    const chatBotPopup = document.getElementById("chatBotPopup");

    // Function to open the daily quiz page when the popup is clicked
    function openDailyQuizPage() {
        // Replace 'dailyquiz.html' with the actual URL of your daily quiz page
        const quizPageUrl = 'dailyquiz.jsp';
        
        // Open the quiz page in a new browser window with sandboxed attributes
        const quizWindow = window.open(quizPageUrl, '_blank');
        
        // Add noopener and noreferrer attributes to the opened window
        if (quizWindow) {
            quizWindow.opener = null;
            quizWindow.rel = 'noopener noreferrer';
        }
    }

    // Add a click event listener to the chat bot popup
    chatBotPopup.addEventListener("click", openDailyQuizPage);
});
