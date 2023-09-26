/**
 * 
 */

 
//email send to user for contact using API



//email send event function
let submit = document.getElementById("submit");
submit.addEventListener("submit", function (e) {
  e.preventDefault();
  
  let email = document.getElementById("email").value;
  
  let message = document.getElementById("message").value;

//required params to send email
let params = {from_name: "freekyajmal@gmail.com",
               to_name: email,
               message: `Hello ${email}This Is Your Message ${message}Thank You Contacting Us.`,}

               //email send event
emailjs.send("service_sp6m68x","template_uo2qcla",params)
.then((res) => {
  alert("We will contact You Soon");
}) 
.catch((err) =>{
  console.error(err);
})
      

});


//navbar responsive code
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
  
  
  //google translate
  function googleTranslateElementInit() {
    try{

    const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    return translateElement;

    } catch (err) {
       console.error(err)
      }
      
  }
  