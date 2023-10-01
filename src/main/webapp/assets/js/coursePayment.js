/**
 * 
 */

let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseId');  
    
    if(courseID == null) {
		window.location.href="internal-server-error.jsp";
	}
    
    
    axios.get(`/freshstocks_web/SaveCourseServlet?courseId=${courseID}`)
.then(function (response) {
	
	const res = response.data.sellingPrice;
	
	const name = response.data.name;
	console.log(res);
	
    
let div1 = document.createElement("div");
div1.setAttribute("class","container");
div1.innerHTML = `
  <div id="Checkout" class="inline">
      <h1>Pay Invoice</h1>
      <div class="card-row">
          <span class="visa"></span>
          <span class="mastercard"></span>
          <span class="amex"></span>
          <span class="discover"></span>
      </div>
      <form  onsubmit="submitpayment(${courseID})">
          <div class="form-group">
              <label for="PaymentAmount">Payment amount</label>
              <div class="amount-placeholder">
                  <span>&#8377;</span>
                  <span>${res.toFixed(2)}</span>
              </div>
          </div>
          <div class="form-group">
              <label or="NameOnCard1">Course Name</label>
              <input id="NameOnCard1" class="form-control" type="text" value="${name}" style="width:200px;" disabled></input>
          </div><br>
          <div class="form-group">
              <label or="NameOnCard">Cardholder Name:</label>
              <input id="NameOnCard" class="form-control" type="text"  pattern="^[a-zA-Z\s'-]+$" placeholder="John Doe" required title="Enter a valid cardholder name" ></input>
          </div><br>
          <div class="form-group">
              <label for="CreditCardNumber">Card Number:</label>
              <input id="CreditCardNumber" class="null card-image form-control" pattern="^[0-9]{16}$" type="text" title="Enter a 16-digit card number" required></input>
          </div><br>
          <div class="expiry-date-group form-group">
              <label for="ExpiryDate">Expiry date</label>
              <input id="ExpiryDate" class="form-control" type="text" pattern="^(0[1-9]|1[0-2])\/[0-9]{4}$" placeholder="MM / YYYY" title="Enter the expiry date in MM/YYYY format" required></input>
          </div>
          <div class="security-code-group form-group">
              <label for="SecurityCode">Security code</label>
              <div class="input-container" >
                  <input id="SecurityCode" class="form-control" type="password" pattern="^[0-9]{3,4}$" title="Enter a 3 or 4-digit CVV" required></input>
                  <i id="cvc" class="fa fa-question-circle"></i>
              </div>
              <div class="cvc-preview-container two-card hide">
                  <div class="amex-cvc-preview"></div>
                  <div class="visa-mc-dis-cvc-preview"></div>
              </div>
          </div>
          <button id="PayButton" class="btn btn-block btn-success submit-button" type="submit" >
              <span class="submit-button-lock"></span>
              <span class="align-middle">Pay ${res.toFixed(2)}</span>
          </button>
      </form>
  </div>
`;


document.querySelector("body").append(div1);




})
.catch(function (error) {
    // Handle error
    alert("Error fetching course details" + error);
});



function submitpayment(courseID) {
    event.preventDefault();

    try {
        let cardholderName = document.getElementById("NameOnCard").value.trim();
        let cardNumber = document.getElementById("CreditCardNumber").value.trim();
        let expiryDate = document.getElementById("ExpiryDate").value.trim();

        // Regular expressions for validation
        let nameRegex = /^[A-Za-z\s'-]{2,}(?:\s[A-Za-z\s'-]{2,}){1,3}$/;
        let cardNumberRegex = /^[0-9]{16}$/;
        let expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;

        // Validation
        if (!cardholderName.match(nameRegex)) {
            alert("Please enter a valid cardholder name Hint: John Doe");
            return; 
        } else if (!cardNumber.match(cardNumberRegex)) {
            alert("Please enter a 16-digit card number");
            return; 
        } else if (!expiryDate.match(expiryDateRegex)) {
            alert("Please enter the expiry date in MM/YYYY format");
            return; 
        }
        
        let currentDate = new Date();
        let expiryParts = expiryDate.split('/');
        let expiryMonth = parseInt(expiryParts[0], 10);
        let expiryYear = parseInt(expiryParts[1], 10);

        let expirationDate = new Date(expiryYear, expiryMonth - 1);

        if (expirationDate <= currentDate) {
            alert("Future Date Not Accepted! Please enter a valid expiry date");
            return;
        }

        let msg = confirm("Are you sure you would like to pay now?");

        if (msg == true) {

            axios.post(`/freshstocks_web/BuyCourseServlet?courseId=${courseID}`)
                .then(function (response) {
                    alert(response.data);
                    window.location.href = "learn.jsp";
                })
                .catch(function (error) {
                    alert(error);
                });
        }

    } catch (error) {
        console.error("Error: " + error);
    }
}


