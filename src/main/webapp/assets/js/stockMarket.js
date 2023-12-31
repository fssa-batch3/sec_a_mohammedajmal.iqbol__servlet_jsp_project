//stock market data page js code start
//api data


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

 function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}



//data for user to enter the stock nae not stock symbol
let stockdata = {
  "Apple Inc.": "AAPL",
  "Microsoft Corporation": "MSFT",
  "Amazon.com, Inc.": "AMZN",
  "Alphabet Inc.": "GOOGL",
  "Google Inc.": "GOOGL",
  "Meta Inc.": "META",
  "Intel Corporation": "INTC",
  "IBM Corporation": "IBM",
  "Cisco Systems, Inc.": "CSCO",
  "Oracle Corporation": "ORCL",
  "Adobe Inc.": "ADBE",
  "Salesforce.com, Inc.": "CRM",
  "SAP SE": "SAP",
  "Tata Consultancy Services Limited": "TCS",
  "Infosys Limited": "INFY",
  "Wipro Limited": "WIPRO",
  "Procter & Gamble Co" : "PG",
  "General Electric Co" : "GE",
  "Reliance Industries Limited": "RELIANCE",
  "Tesla, Inc.": "TSLA",
  "NVIDIA Corporation": "NVDA",
  "JPMorgan Chase & Co.": "JPM",
  "Johnson & Johnson": "JNJ",
  "Procter & Gamble Co.": "PG",
  "Visa Inc.": "V",
  "Mastercard Incorporated": "MA",
  "PayPal Holdings, Inc.": "PYPL",
  "AT&T Inc.": "T",
  "Verizon Communications Inc.": "VZ",
  "Comcast Corporation": "CMCSA",
  "The Walt Disney Company": "DIS",
  "Netflix, Inc.": "NFLX",
  "Uber Technologies, Inc.": "UBER",
  "Lyft, Inc.": "LYFT",
  "Airbnb, Inc.": "ABNB",
  "Zoom Video Communications, Inc.": "ZM",
  "Shopify Inc.": "SHOP",
  "Square, Inc.": "SQ",
  "Advanced Micro Devices, Inc.": "AMD",
  "Twitter, Inc.": "TWTR",
  "Alibaba Group Holding Limited": "BABA",
  "Baidu, Inc.": "BIDU",
  "Tencent Holdings Limited": "TCEHY",
  "JD.com, Inc.": "JD",
  "Exxon Mobil Corporation": "XOM",
  "Chevron Corporation": "CVX",
  "Royal Dutch Shell plc": "RDS-A",
  "BP plc": "BP",
  "The Coca-Cola Company": "KO",
  "PepsiCo, Inc.": "PEP",
  "McDonald's Corporation": "MCD",
  "Walmart Inc.": "WMT",
  "Target Corporation": "TGT",
  "Costco Wholesale Corporation": "COST",
  "Johnson Controls International plc": "JCI",
  "Honeywell International Inc.": "HON",
  "Caterpillar Inc.": "CAT",
  "3M Company": "MMM",
  "General Electric Company": "GE",
  "Ford Motor Company": "F",
  "General Motors Company": "GM",
  "The Goldman Sachs Group, Inc.": "GS",
  "Morgan Stanley": "MS",
  "The Bank of New York Mellon Corporation": "BK",
  "The Charles Schwab Corporation": "SCHW",
  "American Express Company": "AXP",
  "The Home Depot, Inc.": "HD",
  "Lowe's Companies, Inc.": "LOW",
"DocuSign, Inc.": "DOCU",
"Twilio Inc.": "TWLO",
"Atlassian Corporation Plc": "TEAM",
"HubSpot, Inc.": "HUBS",
"Slack Technologies, Inc.": "WORK",
"Zscaler, Inc.": "ZS",
"CrowdStrike Holdings, Inc.": "CRWD",
"Okta, Inc.": "OKTA",
"Netskope, Inc.": "NET",
"Cloudflare, Inc.": "NET",
"Veeva Systems Inc.": "VEEV",
"Fastly, Inc.": "FSLY",
"Alteryx, Inc.": "AYX",
"PagerDuty, Inc.": "PD",
"New Relic, Inc.": "NEWR",
"Domo, Inc.": "DOMO",
"MongoDB, Inc.": "MDB",
"Bill.com Holdings, Inc.": "BILL",
"Datadog, Inc.": "DDOG",
"Smartsheet Inc.": "SMAR",
"JFrog Ltd.": "FROG",
"Sumo Logic, Inc.": "SUMO",
"The Trade Desk, Inc.": "TTD",
"Dynatrace, Inc.": "DT",
"Vonage Holdings Corp.": "VG",
"ServiceNow, Inc.": "NOW",
"NICE Ltd.": "NICE",
"RingCentral, Inc.": "RNG",
"Paycom Software, Inc.": "PAYC",
"DocuWare AG": "DW2A",
"AppFolio, Inc.": "APPF",
"Anaplan, Inc.": "PLAN",
"Qualys, Inc.": "QLYS",
"Cloudera, Inc.": "CLDR",
"Medallia, Inc.": "MDLA",
"SailPoint Technologies Holdings, Inc.": "SAIL",
"Crowdstrike Holdings, Inc.": "CRWD",
"Pagerduty, Inc.": "PD",
"The RealReal, Inc.": "REAL",
"Zuora, Inc.": "ZUO",
"Coupa Software Incorporated": "COUP",
"Blackline, Inc.": "BL",
"Twist Bioscience Corporation": "TWST",
"Palo Alto Networks, Inc.": "PANW",
"Nutanix, Inc.": "NTNX",
"LogMeIn, Inc.": "LOGM",
"Virtu Financial, Inc.": "VIRT",
"Rapid7, Inc.": "RPD",
"Seres Therapeutics, Inc.": "MCRB",
"Illumina, Inc.": "ILMN",
"Billtrust Holdings, Inc.": "BTRS",
"Carvana Co.": "CVNA",
"Marvell Technology Group Ltd.": "MRVL",
"DigitalOcean Holdings, Inc.": "DOCN",
"Akamai Technologies, Inc.": "AKAM",
"Atlassian Corporation Plc.": "TEAM",
"Dynavax Technologies Corporation": "DVAX",
"Qualtrics International Inc" : "XM",
"Freshworks Inc" : "FRSH",

};


 axios.get("/freshstocks_web/ENVServlet")
 .then(response => {	 
	 const res = response.data;
	 	 
	 const twelvedatakey = res.TWELVEDATA_API_KEY;
	const alphavantagekey = res.ALPHAVANTAGE_API_KEY;
		


//When user clicks the submit the stock event runs
let newticker = document.getElementById("submit");
newticker.addEventListener("click", (event) => {
  event.preventDefault();
  
  showLoader();

  getData().then((data) => {
    // Handle the resolved data here

 setTimeout(hideLoader, 2000);

    return data;
  }).catch((err) => {
    console.error(err);
  });
});
  

//stock market data page js code end
async function getData() {
  try{
   //try block
   let tickervalue = document.getElementById("search").value;

   let tickersymbol;
   for (const key in stockdata) {
        if(key.toLowerCase().includes(tickervalue.toLowerCase())){
                tickersymbol = stockdata[key];
        }
   }

   let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickersymbol}&interval=5min&apikey=${alphavantagekey}`)
   let data = await response.json()

   let x = data["Time Series (5min)"];

   const labels = Object.keys(x).reverse();
   const prices = Object.values(x)
     .map((item) => parseFloat(item["4. close"]))
     .reverse();
   const ctx = document.getElementById("myChart").getContext("2d");
   new Chart(ctx, {
     type: "line",
     data: {
       labels: labels,
       datasets: [
         {
           label: `${tickervalue} Stock Price`,
           data: prices,
           backgroundColor: "rgba(78, 115, 223, 0.2)",
 borderColor: "rgba(78, 115, 223, 1)",
 pointBackgroundColor: "rgba(78, 115, 223, 1)",
 pointBorderColor: "#fff",
 pointHoverBackgroundColor: "#fff",
 pointHoverBorderColor: "rgba(78, 115, 223, 1)",
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
 





  } catch(err) {
    //catch block when error occured
    document.getElementById('card-body').innerHTML = 'Sorry, No results found';
    alert("Sorry, No results found \nThis Page is going to Reload");
      window.location.reload();
    console.error( "Error" + err);
  }
}


  
 })
 .catch((error) => {
	 console.error(error);
 })
