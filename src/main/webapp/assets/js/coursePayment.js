/**
 * 
 */

let urlParams = new URLSearchParams(window.location.search);
    let courseID = urlParams.get('courseId');  
    
    
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
      <form>
          <div class="form-group">
              <label for="PaymentAmount">Payment amount</label>
              <div class="amount-placeholder">
                  <span>$</span>
                  <span>${res.toFixed(2)}</span>
              </div>
          </div>
          <div class="form-group">
              <label or="NameOnCard">Course Name</label>
              <input id="NameOnCard" class="form-control" type="text" value="${name}" style="width:200px;" disabled></input>
          </div><br>
          <div class="form-group">
              <label or="NameOnCard">Name on card</label>
              <input id="NameOnCard" class="form-control" type="text" maxlength="255" required></input>
          </div><br>
          <div class="form-group">
              <label for="CreditCardNumber">Card number</label>
              <input id="CreditCardNumber" class="null card-image form-control" type="text" required></input>
          </div><br>
          <div class="expiry-date-group form-group">
              <label for="ExpiryDate">Expiry date</label>
              <input id="ExpiryDate" class="form-control" type="text" placeholder="MM / YY" maxlength="7" required></input>
          </div>
          <div class="security-code-group form-group">
              <label for="SecurityCode">Security code</label>
              <div class="input-container" >
                  <input id="SecurityCode" class="form-control" type="text" required></input>
                  <i id="cvc" class="fa fa-question-circle"></i>
              </div>
              <div class="cvc-preview-container two-card hide">
                  <div class="amex-cvc-preview"></div>
                  <div class="visa-mc-dis-cvc-preview"></div>
              </div>
          </div>
          <div class="zip-code-group form-group">
              <label for="ZIPCode">ZIP/Postal code</label>
              <div class="input-container">
                  <input id="ZIPCode" class="form-control" type="text" maxlength="10" required></input>
                  <a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" data-placement="left" data-content="Enter the ZIP/Postal code for your credit card billing address."><i class="fa fa-question-circle"></i></a>
              </div>
          </div>
          <button id="PayButton" class="btn btn-block btn-success submit-button" type="button" onclick="submitpayment(${courseID})">
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
    console.error('Error fetching course details:', error);
});



function submitpayment(courseID) {
	event.preventDefault();
	
	let msg = confirm("Are you Sure Would You like to Pay Now ?");
	
	if(msg == true) {
		
		axios.post(`/freshstocks_web/BuyCourseServlet?courseId=${courseID}`)
            .then(function(response) {
                alert(response.data);
                window.location.href="learn.jsp";
            })
            .catch(function(error) {
                console.error(error);
            });
	}
	
}


