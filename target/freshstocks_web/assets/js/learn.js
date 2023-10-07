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
    
purchasedCourses.forEach(function(course) {
	
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
    });
    
    
    }
    
    })
    .catch(function(error) {
        console.error(error);
    });
    
    