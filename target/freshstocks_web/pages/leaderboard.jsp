<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>Trading Daily Quiz Leaderboard</title>
  <link rel="stylesheet" type="text/css" href="../assets/css/quizleaderboard.css">  
</head>
<body>
  <h1>Trading Daily Quiz Leaderboard</h1>
  
  <table id="leaderboard">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Profile</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Streak</th>
        <th>Recent Quiz Attempted</th>
        <th>Quiz Experience</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="../assets/js/leaderboard.js"></script>
</body>
</html>
    