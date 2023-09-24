/**
 * 
 */

 
 axios.get('/freshstocks_web/leaderboard')
  .then(function (response) {
	  
    let leaderboardData = response.data;

    console.log(leaderboardData);
    
    let table = document.getElementById("leaderboard");

    // Populate the table with data
    leaderboardData.forEach(function (entry, index) {
      let row = document.createElement('tr');
      let rankCell = document.createElement('td');
      let profileCell = document.createElement('td');
      let profile1Cell = document.createElement('img');
      let nameCell = document.createElement('td');
      let genderCell = document.createElement('td');
      let streakCell = document.createElement('td');
      let quiztimeCell = document.createElement('td');
      let QuizExperienceLevel = document.createElement('td');
      rankCell.textContent = (index + 1);
      profile1Cell.src = entry.profileImg;     
      profile1Cell.style.width = "50px";
profile1Cell.style.height = "30px";
profile1Cell.style.padding = "10px";
      nameCell.textContent = entry.name;
const timeAgoString = formatTimeAgo(entry.quizEndTime);
      quiztimeCell.textContent = timeAgoString;
      genderCell.textContent = entry.gender;
      streakCell.textContent = entry.streak;
      QuizExperienceLevel.textContent = entry.streak > 30 ? "Expert" : entry.streak > 10 ? "Intermediate" : "Novice";  
      row.appendChild(rankCell);
      profileCell.appendChild(profile1Cell);
      row.appendChild(profileCell);
      row.appendChild(nameCell);
      row.appendChild(genderCell);
      row.appendChild(streakCell);
      row.appendChild(quiztimeCell);
      row.appendChild(QuizExperienceLevel);
      table.appendChild(row);
    });

  })
  .catch(function (error) {
    console.error('Error fetching leaderboard data:', error);
  });
  
  
function formatTimeAgo(dateTimeString) {
  const providedTime = new Date(dateTimeString);
  const currentTime = new Date();
  const timeDifference = currentTime - providedTime;

  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  let timeAgoString = '';
  if (daysAgo > 0) {
    timeAgoString += `${daysAgo} days, `;
  }
  if (hoursAgo > 0) {
    timeAgoString += `${hoursAgo} hours, `;
  }
  if (minutesAgo > 0) {
    timeAgoString += `${minutesAgo} minutes, `;
  }

  return timeAgoString.slice(0, -2) + ' ago';
}