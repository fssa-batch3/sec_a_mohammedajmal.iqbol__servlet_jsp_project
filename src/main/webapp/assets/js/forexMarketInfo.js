  //  api call stock market search

  const urls = "https://api.twelvedata.com/forex_pairs";

  let y;
  fetch(urls)
    .then((response) => {
      return response.json();
    })
    .then((parsedData) => {
      y = parsedData.data;
      createtags(y)
    })

    .catch((err) => {
      console.error(err + "OOps Something went wrong..!!");
    });



  //card create
  function createtags(y) {
    for (let i = 0; i <= 500; i++) {
      next_div = document.createElement("div");
      next_div.setAttribute("class", "cardsforex");
      next_div.innerHTML = `
   <div class="cards-innerforex-div">
     <h1 class="heading-card">${y[i]["symbol"]}</h1>
     <p><b>Currency_Base : </b>&emsp;${y[i]["currency_base"]}</p>
     <p><b>Currency_Group :</b>&emsp;&emsp;${y[i]["currency_group"]}</p>
     <p><b>Currency_Quote :</b>&emsp;&emsp;${y[i]["currency_quote"]}</p>
     </div>
   `;

      document.getElementById("forex").append(next_div);
    }
  };


  //searchbar user search
  let searchbar = document.getElementById("searchbar");
  const cards = document.getElementsByClassName("cardsforex");

  searchbar.addEventListener("input", () => {
    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      if (element.innerHTML.toLowerCase().includes(searchbar.value.toLowerCase())) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  });



//google translate
  function googleTranslateElementInit() {
const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
return translateElement;
}
