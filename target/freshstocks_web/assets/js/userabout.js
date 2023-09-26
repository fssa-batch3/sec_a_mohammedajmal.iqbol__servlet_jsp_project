/**
 * 
 */

 //navbar responsive function
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
    const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    return translateElement;
  }
  