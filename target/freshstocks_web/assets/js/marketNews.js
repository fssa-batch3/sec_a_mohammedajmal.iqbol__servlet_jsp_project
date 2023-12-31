//market news page js code start

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


setTimeout(hideLoader, 5000);



 axios.get("/freshstocks_web/ENVServlet")
 .then(response => {	 
	 const res = response.data;
	 
	 const twelvedatakey = res.TWELVEDATA_API_KEY;
	const alphavantagekey = res.ALPHAVANTAGE_API_KEY;
		

//required params contains api key and host permissions 
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": res.FOREX_RAPID_KEY,
    "X-RapidAPI-Host": "seeking-alpha.p.rapidapi.com",
  },
};

//try statement
  let x;
  fetch(
    "https://seeking-alpha.p.rapidapi.com/news/v2/list?category=market-news%3A%3Aall&size=40&number=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {

      x = response.data;

      // card create using api response
      for (let i = 0; i < 40; i++) {
        let rowdiv = document.createElement("a");
        rowdiv.setAttribute("id", "card");
        rowdiv.innerHTML = `
    <div><img class="card_load" src=${x[i]["links"]["uriImage"]}></div>
    <div class="card_load_extreme_title">${x[i]["attributes"]["title"]}</div>
    <div class="card_load_extreme_descripion">${
      x[i]["attributes"]["content"]
    }</div>
    <div class="card_load_extreme_title_published"> Published On : ${x[i][
      "attributes"
    ]["publishOn"].split("T")}</div>`;

        document.querySelector("#rowdiv").append(rowdiv);
      }
    })
    //catch statement
    .catch((err) => console.error(err));



 })
 .catch((error) => {
	 console.error(error);
 })

//market news page js code end



//page loader 
window.onload = function() {
  // Show the loading screen
  document.getElementById("loading").classList.remove("hide");

  document.querySelector("#rowdiv").classList.add("hide");

  // Hide the loading screen after 5 seconds
  setTimeout(function() {
    document.getElementById("loading").classList.add("hide");
    document.querySelector("#rowdiv").classList.remove("hide");
  }, 3000);
};
