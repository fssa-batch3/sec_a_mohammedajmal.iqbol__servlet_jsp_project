   //  api call stock market search

   const urls = "https://api.twelvedata.com/indices";

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
      <h1 class="heading-card">${y[i]["name"]}</h1>
      <p><b>Symbol : </b>&emsp;${y[i]["symbol"]}</p>
      <p><b>Country : </b>&emsp;${y[i]["country"]}</p>
      <p><b>Currency :</b>&emsp;&emsp;${y[i]["currency"]}</p>
      <p><b>Exchange :</b>&emsp;&emsp;${y[i]["exchange"]}</p>
      <p><b>Mic Code :</b>&emsp;&emsp;${y[i]["mic_code"]}</p>
      </div>
    `;

       document.getElementById("forex").append(next_div);
     }
   };

   let searchbar = document.getElementById("searchbar");
   const cards = document.getElementsByClassName("cardsforex");

   //search bar user search
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
