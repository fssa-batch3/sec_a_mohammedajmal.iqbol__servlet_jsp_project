<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .certificate {
            width: 1400px;
            height:760px;
            margin: auto auto;
            padding: 20px;
            border: 1px solid #ccc;
            position: relative;
        }
            @media print {
      @page {
        size: landscape;
         height: 400px;
      }
    }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        .description {
         font-size: 16px;
        }
        .recipient {
            font-size: 29px;
            text-align: center;
            margin-bottom: 40px;
        }
        .date {
            font-size: 16px;
            text-align: right;
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.3;
            font-size: 60px;
            font-weight: bold;
            color: #ccc;
            pointer-events: none;
        }
        #downloadButton , #back {
           padding:10px;
           background-color:dodgerblue;
           color:white;
           border:none;
           border-radius :5px;
        }
        #desc {
            width: 1000px;
            text-align: center;
            margin-left: 200px;
        }
    </style>
</head>
<body>
    <div class="certificate">
    <button id="back">Back to Course</button>
    <br><br><br><br><br><br>
        <h1>Certificate of Completion</h1>
        <div class="recipient">
            <p>This is to certify that</p>
            <p id="name"><strong></strong></p>
            <p>has successfully completed the<span id="course-name"></span></p>
            <br>
            <div class="description">
    <p id="desc">With unwavering determination and steadfast commitment, <span id="name-again"></span> has emerged as a beacon of excellence in the realm of trading. Through rigorous dedication and a relentless pursuit of knowledge, they have not only completed this course but have done so with commendable proficiency.

Their journey stands as a testament to their unwavering resolve and indomitable spirit. his accomplishments in trading are a testament to their remarkable skill and expertise, showcasing a deep understanding of the intricacies of the market.

With every challenge, they faced it head-on, exhibiting remarkable resilience and adaptability. This achievement is a reflection of their unwavering belief in their abilities, coupled with an insatiable thirst for learning.

As they stand at this milestone, it is clear that he is poised for even greater success in the world of trading. Their accomplishments serve as an inspiration to others, demonstrating that with diligence and self-assurance, one can conquer any endeavor. Congratulations on this well-deserved achievement!</p>
</div>
        </div>
        
        <div class="date" id="modified_at"></div>
        <div class="watermark">FRESHSTOCKS TRADING CERTIFICATE</div>
        <button id="downloadButton">Download PDF</button>
    </div>
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>


let urlParams = new URLSearchParams(window.location.search);
let courseID = urlParams.get('courseId');  

console.log(courseID);


axios.get("/freshstocks_web/UpdateMyCoursesServlet?courseId=" + courseID)
.then(response => {
    const courseProgressData = response.data; 
    
    console.log(courseProgressData);
    
    const jsDate = new Date(courseProgressData.latestModifiedAt);
    
    function formatTimestamp(date) {
    	  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    	  return date.toLocaleDateString(undefined, options);
    	}

    	const formattedDate = formatTimestamp(jsDate);
    
    document.getElementById("modified_at").innerText = "Date: " + formattedDate;
    
})
.catch(function (error) {
    // Handle error
	alert("Error fetching User Details");
});

axios.get("/freshstocks_web/SaveCourseServlet?courseId="+courseID)
.then(function (response) {
	
    let courseDetails = response.data;
    
    console.log(courseDetails);
    
    document.getElementById("course-name").innerText = " " + courseDetails.name;
    
    
    axios.get("../registration?userId=" + courseDetails.userID)
    .then(response => {
      // Handle the response from the servlet
      console.log(response.data);
      let userDetails = response.data;
      
      document.getElementById("name").innerText = userDetails.username;
      document.getElementById("name-again").innerText = userDetails.username;
      
    })
    .catch(function (error) {
        // Handle error
    	alert("Error fetching User Details");
    });
    
})
.catch(function (error) {
    // Handle error
	alert("Error fetching course Details");
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = "details.jsp?courseID=" + courseID;
});

    
    document.getElementById('downloadButton').addEventListener('click', function() {
        document.getElementById("downloadButton").style.display = "none";
        document.getElementById("back").style.display = "none";
        window.print();
    });
</script>
</body>
</html>
    