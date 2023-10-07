/**
 * 
 */

 //market data front page dashboard js code start
 
 
 function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

setTimeout(hideLoader, 5000);


function renderclock() {
  document.getElementById(
    "time-li"
  ).innerText = `Dashboard Time Is : ${moment().format(
    "MMMM Do YYYY, h:mm:ss a"
  )}`;
}

renderclock();
setInterval(renderclock, 1000);

//try statement
try {

//search query for search bar code start
let searchbar = document.getElementById("searchbar");
const cards = document.getElementsByClassName("notifications-container");
searchbar.addEventListener("input", () => {
  //try statement
  try {
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

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});

//api data

 axios.get("/freshstocks_web/ENVServlet")
 .then(response => {	 
	 const res = response.data;
	 
	 const twelvedatakey = res.TWELVEDATA_API_KEY;
	const alphavantagekey = res.ALPHAVANTAGE_API_KEY;
		
	
	const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": res.FOREX_RAPID_KEY,
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  },
};



//try statement
try {
  let x;
  let y;
  let z;
  let a;
  let b;
  let c;
  let d;
  let e;
  let f;
  let g;
  let h;
  let i;
  let j;
  Promise.all([
    fetch(
      "https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact",
      options
    ),
    fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${alphavantagekey}`
    ),
    fetch(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=${alphavantagekey}`
    ),
    fetch(
      `https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=${alphavantagekey}`
    ),
    fetch(
      `https://api.twelvedata.com/logo?symbol=AAPL&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/logo?symbol=FRSH&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/logo?symbol=AMZN&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/logo?symbol=TSLA&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/price?symbol=AAPL&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/price?symbol=FRSH&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/price?symbol=AMZN&apikey=${twelvedatakey}`
    ),
    fetch(
      `https://api.twelvedata.com/price?symbol=TSLA&apikey=${twelvedatakey}`
    ),
  ])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
      const [
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10,
        data11,
        data12
      ] = data;

      x = data1["Time Series (5min)"];
      y = data2["Realtime Currency Exchange Rate"]['5. Exchange Rate'];
      z = data3["Time Series (Digital Currency Daily)"];
      a = data4["data"];
      b = data4;
      c = data5;
      d = data6;
      e = data7;
      f = data8;
      g = data9;
      h = data10;
      i = data11;
      j = data12;
      
      console.log(i);

      // create(y)
      
         //api call front card create from api response

      let rowdiv = document.createElement("div");
      rowdiv.setAttribute("class", "notifications-container");
      rowdiv.setAttribute("id", "first-card");
      rowdiv.innerHTML = `  <div class="logo-title">
                          <img class="ticker-logo" id="ticker-logo" src=${data5["url"]} alt="">
                          <h1 class="ticker-title" id="ticker-title">${data5["meta"]["symbol"]}</h1>
                        </div>
                        <div>
                          <h1 class="ticker-price">Price<br><span id="ticker-price"> $${data9["price"]}</span></h1>
                        </div>`;

      document.querySelector("#row").append(rowdiv);

      let rowdiv1 = document.createElement("div");
      rowdiv1.setAttribute("class", "notifications-container");
      rowdiv1.setAttribute("id", "second-card");
      rowdiv1.innerHTML = `  <div class="logo-title">
                          <img class="ticker-logo" id="ticker-logo" src=${data6["url"]} alt="">
                          <h1 class="ticker-title" id="ticker-title">${data6["meta"]["symbol"]}</h1>
                        </div>
                        <div>
                          <h1 class="ticker-price">Price<br><span id="ticker-price"> $${data10["price"]}</span></h1>
                        </div>`;

      document.querySelector("#row").append(rowdiv1);

      let rowdiv2 = document.createElement("div");
      rowdiv2.setAttribute("class", "notifications-container");
      rowdiv2.setAttribute("id", "third-card");
      rowdiv2.innerHTML = `  <div class="logo-title">
                          <img class="ticker-logo" id="ticker-logo" src=${data7["url"]} alt="">
                          <h1 class="ticker-title" id="ticker-title">${data7["meta"]["symbol"]}</h1>
                        </div>
                        <div>
                          <h1 class="ticker-price">Price<br><span id="ticker-price"> $${data11["price"]}</span></h1>
                        </div>`;

      document.querySelector("#row").append(rowdiv2);

      let rowdiv3 = document.createElement("div");
      rowdiv3.setAttribute("class", "notifications-container");
      rowdiv3.setAttribute("id", "last-card");
      rowdiv3.innerHTML = `  <div class="logo-title">
                          <img class="ticker-logo" id="ticker-logo" src=${data8["url"]} alt="">
                          <h1 class="ticker-title" id="ticker-title">${data8["meta"]["symbol"]}</h1>
                        </div>
                        <div>
                          <h1 class="ticker-price">Price<br><span id="ticker-price"> $${data12["price"]}</span></h1>
                        </div>`;

      document.querySelector("#row").append(rowdiv3);

      const labels = Object.keys(x).reverse();
      const prices = Object.values(x)
        .map((item) => parseFloat(item["4. close"]))
        .reverse();
      const ctx = document.getElementById("lineChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "MSFT Stock Price",
              data: prices,
              backgroundColor: "#E9FCD4", // Customize chart appearance
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: "Time",
            },
            y: {
              display: true,
              title: "Price",
            },
          },
        },
      });
      
      
console.log(z);

// Extract dates and prices
const labelsss = Object.keys(z).reverse(); // Get the dates and reverse the order for chronological display
const valuesss = labelsss.map(date => parseFloat(z[date]["4b. close (USD)"])); // Get the closing prices as values

const ctx2 = document.getElementById("cryptoChart").getContext("2d");

// Create a chart using Chart.js
new Chart(ctx2, {
  type: "line", // Use 'line' for a line chart
  data: {
    labels: labelsss,
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: valuesss,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // You can customize the appearance of the chart
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  },
});


      //crude oil api

      const crudelabels = [];
      const crudevalues = [];
      for (let i = 0; i < a.length; i++) {
        crudelabels.push(a[i]["date"]);
        crudevalues.push(a[i]["value"]);
      }

      // Get the dates and reverse the order for chronological display

      const ctx3 = document.getElementById("crudeChart").getContext("2d");
      new Chart(ctx3, {
        type: "line", // Use 'line' for a line chart
        data: {
          labels: crudelabels.reverse(),
          datasets: [
            {
              label: "WTI Crude Oil Price (USD)",
              data: crudevalues.reverse(),
              backgroundColor: "rgba(75, 192, 192, 0.2)", // You can customize the appearance of the chart
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
      
      
      console.log(y);


      //forex data api show

    const exchangeRate = y;
    
    const label = ['BTC to USD'];
    const datas = [parseFloat(exchangeRate)];

      const ctx1 = document
        .getElementById("optionMoversChart")
        .getContext("2d");
      new Chart(ctx1, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: "Volume Gainers BTC-USD",
              data: datas,
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Set desired background color
              borderColor: "rgba(75, 192, 192, 1)", // Set desired border color
              borderWidth: 1, // Set desired border width
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

   
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //catch statement
} catch (error) {
  console.error("Error" + error);
}


 })
 .catch((error) => {
	 console.error(error);
 })
 

//market data front page dashboard js code end

 }  catch (error) {
  console.error("Error" + error);
};


