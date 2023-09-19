<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>HTML Video Player</title>
  <link rel="stylesheet" href="../assets/css/courseVideoPlayer.css">
  <link rel="icon" href="https://fav.farm/🔥" />
</head>
<body>

   <div class="player">
     <video class="player__video viewer" id="videoPlayer"></video>

     <div class="player__controls">
       <div class="progress">
        <div class="progress__filled" id="progressBar"></div>
       </div>
       <button class="player__button toggle" title="Toggle Play" id="toggleButton">►</button>
       <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1" id="volumeSlider">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" id="playbackRateSlider">
       <button data-skip="-10" class="player__button" id="skipBackwardButton">« 10s</button>
       <button data-skip="25" class="player__button" id="skipForwardButton">25s »</button>
     </div>
   </div>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="../assets/js/courseVideoPlayer.js"></script>
</body>
</html>