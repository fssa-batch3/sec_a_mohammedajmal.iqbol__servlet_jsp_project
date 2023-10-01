//crypto market page js code start


 function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


setTimeout(hideLoader, 3000);


//fetch api get response
  fetch(
    "https://api.coinranking.com/v2/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0")
    .then((response) => response.json())
    .then((data) => {
      // Access the array of coins from the response object
      const coins = data.data.coins;
      
      console.log(coins);

      // Extract the names of the coins using map()
      const coinNames = coins.map((coin) => coin);




      //card create


      let rowdiv;
      let label;
      let img;
      let label2;
      let span1;
      let span2;
      let div1;
      let div2;


for (let i = 0; i < 50; i++) {

  rowdiv = document.createElement("a");
  rowdiv.setAttribute("id", "card");
  rowdiv.setAttribute("href", `${coinNames[i]["coinrankingUrl"]}`);
  rowdiv.setAttribute("style",`background-color: ${coinNames[i]["color"]};`);
  const cardPrice = parseFloat(coinNames[i]["price"]).toFixed(6);


  label = document.createElement("label");
  rowdiv.append(label);

  img = document.createElement("img");
  img.setAttribute("id","avatar");
  img.setAttribute("src", coinNames[i]["iconUrl"]);
  label.append(img);

  label2 = document.createElement("label");
  label2.setAttribute("id", "info");
  rowdiv.append(label2);

  span1 = document.createElement("span");
  span1.setAttribute("id","info-1");
  span1.innerText =  coinNames[i]["name"];
  label2.append(span1);

  span2 = document.createElement("span");
  span2.setAttribute("id","info-2");
  span2.innerText = coinNames[i]["symbol"];
  label2.append(span2);


  div1 = document.createElement("div");
  div1.setAttribute("id", "content-1");
  div1.innerText = ` Coin Price : ${cardPrice}`;
  rowdiv.append(div1);


  div2 = document.createElement("div");
  div2.setAttribute("id", "content-2");
  div2.innerText = ` Coin Rank :${coinNames[i]["rank"]}`;
  rowdiv.append(div2);

  document.querySelector("#rowdiv").append(rowdiv);

      
}   
})
//catch statement
.catch((err) => console.error(err));



