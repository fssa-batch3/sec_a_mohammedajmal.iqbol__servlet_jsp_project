<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | freshstocks</title>
  <link rel="stylesheet" href="../assets/css/usercontact.css">
    <script type="text/javascript">
        (function () {
            emailjs.init("xJczW25BwYvEu6S51");
        })();
        </script>
</head>

<body>


  
  <jsp:include page="header.jsp" />
  <!-- nav end -->



  <!-- heropage start -->

  <div class="heropage">


    <div class="hero-letters">
      <div class="contact-form">
        <span class="heading">Contact Us</span>
        <form id="submit">
          <label for="name">Name:</label>
          <input type="text" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit" id="sub">Submit</button>
        </form>
      </div>

    </div>

    <div class="hero-image">
      <img class="hero-img" src="../assets/images/attract-users.svg" alt="">
    </div>

  </div>


  <script src="https://smtpjs.com/v3/smtp.js" integrity=""></script>
  <script src="../assets/js/userContact.js"></script>
 <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" integrity=""></script>


</body>

</html>