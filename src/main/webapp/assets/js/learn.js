/**
 * 
 */

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

setTimeout(hideLoader, 2000);

//js tabs code start
function openCity(evt, cityName) {
  //try statement
  try {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    document.getElementById("default").style.display = "none";

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
}

//return to home tabs function
function homeon() {
  //try statement
  try {
    document.getElementById("default").style.display = "block";
    document.getElementById("my-courses").style.display = "none";
    document.getElementById("blogs").style.display = "none";
    document.getElementById("latest-courses").style.display = "none";
    document.getElementById("youtube-videos").style.display = "none";
    document.getElementById("free-courses").style.display = "none";
    document.getElementById("live-courses").style.display = "none";

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
}

//blogs data JSON
const blogs_data = [
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/947cUtXZwI-HD.jpeg",
    blog_title: "How Professional Traders use..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #forex",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Folie13.png",
    blog_title: "6 Forex Price Action Trading..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #forex",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/cuphandle%20%282%29.png",
    blog_title: "Learn How To Use The Stocha..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/Stoch_MA-1.png",
    blog_title: "3 Great Reversal Strategies..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #money #Indicator",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/XAUUSD_2023-01-11_11-36-40.png",
    blog_title: "8 must know PRICE ACTION..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/OvBP_gJnU9E-HD-1.jpeg",
    blog_title: "Start Trading like a Pro with..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: "#PriceAction",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/aDih3RZkt9I-HD-1.jpeg",
    blog_title: "How to Trade STRONG Trends..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/OY-RwsKwm2o-HD.jpeg",
    blog_title: "Ultimate free Price Action..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/JDpYMDGawMI-HD.jpeg",
    blog_title: "Chart Pattern Trading – Full..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
  {
    img: "https://tradeciety.com/hubfs/Imported_Blog_Media/Ethcv9JS4Zs-HD.jpeg",
    blog_title: "9 best Day Trading tips to use..",
    blog_timing: "5 Min Read",
    blog_language: "English",
    blog_hashtag: " #finance #money",
    blog_cost: "Read for FREE",
  },
];

//blogs data card create
let course_div4;
for (i = 0; i < blogs_data.length; i++) {
  course_div4 = document.createElement("div");
  course_div4.setAttribute("class", "first-course3");
  course_div4.setAttribute(
    "href",
    "details.html?name=" + blogs_data[i]["blog_title"]
  );
  course_div4.innerHTML = `<div>
                       <img class="course-img" src=${blogs_data[i]["img"]} alt="">
                   </div>
                   <div>
                       <h3 class="course-title">${blogs_data[i]["blog_title"]}</h3>
                       <div class="course-details">
                           <p class="course-timing">${blogs_data[i]["blog_timing"]}</p>
                           <p class="course-ln">${blogs_data[i]["blog_language"]}</p>
                           <p class="course-enrolled">${blogs_data[i]["blog_hashtag"]}</p>
                       </div>
                    <h3 class="course-cost">${blogs_data[i]["blog_cost"]}</h3>
                   </div> `;

  document.querySelector(".scroll-courses-div4").append(course_div4);

  //search query for search bar code start

  let searchbar = document.getElementById("searchbar");
  const cards = document.getElementsByClassName("first-course3");

  searchbar.addEventListener("input", () => {
    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      if (
        element.innerHTML.toLowerCase().includes(searchbar.value.toLowerCase())
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  });
}

//search query for search bar code end

//search query for all courses start
//search query

let searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("first-course2-stocks");

searchbar.addEventListener("input", () => {
  for (let i = 0; i < cards.length; i++) {
    const element = cards[i];
    if (
      element.innerHTML.toLowerCase().includes(searchbar.value.toLowerCase())
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
});


// my courses div add

axios.get(`/freshstocks_web/getPurchasedCourses`)
    .then(function(response) {
        // Handle the response data, which should be an array of purchased courses
        let purchasedCourses = response.data;

        console.log(purchasedCourses);
    
purchasedCourses.forEach(function(course) {
	
	const markedPrice = course.markedPrice;
        const sellingPrice = course.sellingPrice;
        const discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;
        const discountFormatted = Math.floor(discountPercentage.toFixed(2));
        
let div1 = document.createElement("a");
div1.setAttribute("href",`details.jsp?courseID=${course.courseID}`);
div1.setAttribute("class","first-course2-stocks");
div1.innerHTML = `						
                      <div>
							<img class="course-img-stocks" src="${course.coverImage}"
								alt="">
						</div>
						<div>
							<h3 class="course-title">${course.name}</h3>
							<p class="course-description">${course.description}</p>
							<div class="course-details">
								<p class="course-timing">
									<span class="timing">Timing:</span>
									${course.timing}</p>
								<p class="course-ln">
									<span class="lang">Language:</span>
									${course.language}</p>
							</div>
							<div class="flexcost">
								<p class="course-cost">
									fresh Price: &#8377;${course.sellingPrice}</p>
								<p>
									Old Price: <strike class="course-oldcost">&#8377;${course.markedPrice}</strike>
								<p>
								<p class="course-discount">
									Discount:
									${discountFormatted} %
								</p>
							</div>
							<br>
						</div>
	`;
	
	document.querySelector(".scroll-courses-div-mycourses").append(div1);
    });
    
    })
    .catch(function(error) {
        console.error(error);
    });
    
    

//google translate start

function googleTranslateElementInit() {
  const translateElement =  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
  return translateElement;
}

//google translate end
   
   
   //google translate
   function googleTranslateElementInit() {
     const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
     return translateElement;
   }
   