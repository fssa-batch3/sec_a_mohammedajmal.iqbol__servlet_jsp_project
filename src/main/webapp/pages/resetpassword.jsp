<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verify OTP | User</title>
    <link rel="stylesheet" href="../assets/css/resetpassword.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" integrity=""></script>
    <script type="text/javascript">
        (function () {
            emailjs.init("xJczW25BwYvEu6S51");
        })();
        </script>
</head>
<body>
    

    <form class="form">
        <p class="heading">Reset User password</p>
        <p class="heading1">Submit your registration email to restore access to<br> your Personal Area. You will receive a link to your<br> new password. If you have any problems, please<br><a href="userContact.jsp" class="link">contact us.</a></p>
        <input class="input" placeholder="Enter your Email" type="email" required id="otp-input">
        <button class="btn1" id="submit">Verify Email</button>
        <button class="btn2" id="verify">Reset Password</button>
        <button class="btn3" onclick="back()">Back</button>
      </form>

<script
		src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
		integrity=""></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      <script src="https://smtpjs.com/v3/smtp.js" integrity=""></script>
      <script src="../assets/js/resetpassword.js"></script>
</body>
</html>