/**
 * 
 */


function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

setTimeout(hideLoader, 1000);


//search query

let searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("card");

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
        
        
        
        if(purchasedCourses.length == 0) {
		    let div1 = document.createElement("div");
            div1.innerHTML = `<p>No Courses Available</p>`;
		    document.querySelector("#my-course").append(div1);
		} else {
    
for(let i=purchasedCourses.length-1; i>=0; i--){
	
	let course = purchasedCourses[i];
	
	const markedPrice = course.markedPrice;
        const sellingPrice = course.sellingPrice;
        const discountPercentage = ((markedPrice - sellingPrice) / markedPrice) * 100;
        const discountFormatted = Math.floor(discountPercentage.toFixed(2));
        
let div1 = document.createElement("a");
div1.setAttribute("href",`details.jsp?courseID=${course.courseID}`);
div1.setAttribute("class","card mb-4");
div1.innerHTML = `						
    <img src="${course.coverImage}" class="card-img-top" alt="Course Image">
    <div class="card-body">
        <h5 class="card-title">${course.name}</h5>
        <p class="card-text" id="description">${course.description}</p>
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex flex-column">
                <span class="text-muted">Timing</span>
                <span>${course.timing}</span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Language</span>
                <span>${course.language}</span>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
                <span class="text-muted">Selling Price</span>
                <span>&#8377;${course.sellingPrice}</span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Old Price</span>
                <span>&#8377;${course.markedPrice}</span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-muted">Discount</span>
                <span>${discountFormatted}%</span>
            </div>
        </div>
    </div> 
	`;
	
	document.querySelector("#my-course").append(div1);
	
    }
    
    
    }
    
    })
    .catch(function(error) {
        console.error(error);
    });
    
    
    
let blogData = [
  {
    "image": "https://tradeciety.com/hubfs/AUDUSD_2023-09-05_10-11-15.png",
    "title": "Bollinger Bands Explained - The Best Trading Indicator",
    "link": "https://tradeciety.com/bollinger-bands-explained-step-by-step"
  },
  {
    "image": "https://tradeciety.com/hubfs/NASDAQ_2023-08-30_19-47-41.png",
    "title": "How To Use The Reward Risk Ratio Like A Professional",
    "link": "https://tradeciety.com/how-to-use-reward-risk-ratio-guide"
  },{
    "image": "https://tradeciety.com/hubfs/Imported_Blog_Media/Fotolia_50337059_XS-1.jpg",
    "title": "How To Become A Profitable Trader - 8 steps",
    "link": "https://tradeciety.com/become-a-profitable-trader"
  },{
    "image": "https://tradeciety.com/hubfs/CADJPY_2023-08-15_09-58-33.png",
    "title": "Best Trend Following Trading Strategies",
    "link": "https://tradeciety.com/best-trend-following-trading-strategies"
  },{
    "image": "https://tradeciety.com/hubfs/new%20traders.jpg",
    "title": "7 Best Tips for New Traders - Best Tips Explained",
    "link": "https://tradeciety.com/tips-for-new-traders"
  },{
    "image": "https://tradeciety.com/hubfs/Open%20%282%29.png",
    "title": "Best Day Trading Trading Strategies Explained",
    "link": "https://tradeciety.com/best-day-trading-trading-strategies-explained"
  }
];
    
    
// trading blogs 
let blogContainer = document.getElementById("blog");

for (let blog of blogData) {
  let card = document.createElement("a");
  card.setAttribute("class", "card mb-3");
  card.setAttribute("href", blog.link);
  card.setAttribute("target","_blank");

  // Create the card structure with dynamic content
  card.innerHTML = `
    <img src="${blog.image}" class="card-img-top" alt="Blog Image">
    <div class="card-body">
        <p class="card-title" id="description1">${blog.title}</p>
    </div>
  `;
  blogContainer.appendChild(card);
}
    
    
    
    
    