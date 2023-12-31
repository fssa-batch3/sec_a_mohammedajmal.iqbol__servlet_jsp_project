//forex market page js code start


 function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


setTimeout(hideLoader, 3000);


 axios.get("/freshstocks_web/ENVServlet")
 .then(response => {	 
	 const res = response.data;
	 
	 console.log(res);
	 
	 const twelvedatakey = res.TWELVEDATA_API_KEY;
	const alphavantagekey = res.ALPHAVANTAGE_API_KEY;
		
	

//api call new

const options = {
  //method GET 
  method: "GET",
  //headers from rapidAPI 
  headers: {
    "X-RapidAPI-Key": res.FOREX_RAPID_KEY,
    "X-RapidAPI-Host": res.FOREX_RAPID_HOST,
  },
};

//try statement
  let x;
  let y;
  //fetch method request
  fetch(
    "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP",
    options
  )
     //.then rewsponse get from api
    .then((response) => response.json())
    .then((response) => {

      x = response;

      y = response.rates;


      //card create from api call
      for (let i = 0; i < 150; i++) {
        let values = Object.keys(y)[i];

        let rowdiv = document.createElement("div");
        rowdiv.setAttribute("class", "notifications-container");
        rowdiv.setAttribute("id", "first-card");
        rowdiv.innerHTML = `  <div id="ticker-div">
                                  <p  id="ticker-title">Base Currency : ${x.base}</p>
                                  <p id="ticker-title2">Curreny to Convert :  ${values}</p>
                                  <p id="ticker-title3">Currency Pair : ${x.base}/${values}</p>
                                  <p id="ticker-price">Currency Price : ${y[values]}</p>
                                 </div>
                            
                                    
                                  
                                </div>`;

        document.querySelector("#rowcardsdiv").append(rowdiv);
      }
    })
    //catch statement
    .catch((err) => console.error(err));
    
    
     })
 .catch((error) => {
	 console.error(error);
 })


//search query for search bar code start
let searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("notifications-container");
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

//forex market page js code end



//page loader 
window.onload = function() {
  // Show the loading screen
  document.getElementById("loading").classList.remove("hide");

  document.querySelector("#rowcardsdiv").classList.add("hide");

  // Hide the loading screen after 5 seconds
  setTimeout(function() {
    document.getElementById("loading").classList.add("hide");
    document.querySelector("#rowcardsdiv").classList.remove("hide");
  }, 2500);
};
