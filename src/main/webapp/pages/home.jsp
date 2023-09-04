<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.fssa.freshstocks.model.*"%>
<%@ page import="com.fssa.freshstocks.services.*"%>
<%@ page import="com.fssa.freshstocks.services.exception.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.DecimalFormat"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Home | freshstocks</title>
    <link rel="stylesheet" href="../assets/css/userhome.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Tilt+Neon&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto&display=swap" rel="stylesheet">
  <!--socialmediafontawesome start-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="">
  <!--socialmediafontawesome end-->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link href="https://cdn.jsdelivr.net/npm/hint.css@2.7.0/hint.min.css" integrity="" rel="stylesheet">
<link rel="stylesheet" href="hint.css" />
</head>
<body>

	<% 
   
   if(session.getAttribute("loggedInemail") == null) {
        response.sendRedirect("login.html");
     } else {
   
   String loggedInEmail = (String) session.getAttribute("loggedInemail");
   Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

   UserService userService = new UserService();
   String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);

    %>
     <nav>
        <div class="navbar">
            <img class="nav-logo" src="../assets/images/Screenshot 2023-02-11 021952.png" alt="">
           
            <div class="navlinks">
                <a href="./userabout.html" class="navlink">About</a>&emsp;
                <!-- <a href="#" class="navlink">Market</a> -->
                <div class="dropdown">
                    <a class="dropbtn" href="marketdata.html">Market</a>
                    
                  </div>
                <!-- <a href="#" class="navlink">Trade</a> -->
                <div class="dropdown">
                    <a class="dropbtn" href="live_trading.html">Trade</a>

                  </div>
                <!-- <a href="#" class="navlink">News</a> -->
                <!-- <a href="#" class="navlink">Learn</a> -->
                <div class="dropdown">
                    <a class="dropbtn" href="learn.jsp">Learn</a>
                    <a href="./userContact.html" class="navlink" id="contact">Contact</a>

                  </div>

                  
                
            </div>
            
            <!-- support images notification img start -->
            <div class="notification"  id="notification-img">
              
              <div class="dropdown">
                <span class="hint--bottom hint--rounded" aria-label="Notifications"><img class="notificationimg" onclick="profile1()" src="../assets/images/icons8-notification-50.png" alt="notification-img"></span>
                <div class="dropdown-content-notification">
                  <a><div class="notify-head">

                   <h1 class="notify-user-h1">Notifications</h1>

                  </div></a>
                   <a href="#"><div class="notify-1">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Ajith</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-2">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Chnadru</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-1">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Kamalesh</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-2">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Durga</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-1">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Vanitha</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-2">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Vicky</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-1">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Susi kumar</b> promoted your answer</p>

                  </div></a> 
                  <a href="#"><div class="notify-2">

                    <img class="notify-user-img" src="../assets/images/icons8-male-user-48.png" alt="">
                    <p class="notify-user-p"><b>Akshaya</b> promoted your answer</p>

                  </div></a> 
                </div>
              </div>
        
            </div>
            <div class="notification">
                <div class="dropdown1">
                  <span class="hint--bottom hint--rounded" aria-label="Lnaguage Selector"><img class="notificationimg" onclick="profile1()" src="../assets/images/icons8-translator-50.png" alt="translator-img"></span>
                <div class="dropdown-content-lang"><br>
                  <div id="google_translate_element" id="lang"></div>
                    </div>
                    </div>
            </div>
            <div class="notification">

              <a id="notificationimg" href="userContact.html">
                <span class="hint--bottom hint--rounded" aria-label="Contact Support"><img class="notificationimg" src="../assets/images/icons8-online-support-50.png" alt="support-img"></span>
              </a>

            </div>

            <div class="notification">
             
                <!-- js code start userprofile -->
                <span class="hint--bottom hint--rounded" aria-label="User Profile"><a id="form" href="userProfile.jsp">
                <img alt="profileImage" src="<%=profileImg%>" id="user-profile">
            </a></span>
            </div>

        </div>

        <hr>
    </nav>

    <!-- nav end -->

    <div class="heropage">
  
        <div class="heropageletters">  
          <h1 class="heroheading">Right Place to Learn trading,Monitor daily Live Market <br> Data, Live News Updates ,Blogs and More...</h1>
          <p class="heropara">freshstocks is a true three dimensional
              platform that supports Equities, Futures, Forex, <br> CFD's,ETFs,
              Derivatives,Options,Funds,with more than 100+ markets worldwide </p>
          <div class="herobtnimgflex">
            <form action="learn.jsp">
              <button class="herobtn1">Explore free Trading Courses</button></form>
          <img  class="peopleimg" src="../assets/images/team.png" alt=""><div class="herouserpara">
            <span class="marquee">
              500 members joined us <br> in the past 7-days.
            </span>
          </div>
      </div>
      
      
      <div>
          <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <div class="tradingview-widget-copyright"><a href="https://in.tradingview.com/markets/" rel="noopener" target="_blank"><span class="blue-text"></span></a> </div>
        </div>
      </div>
      </div> 
      
      
      <div class="herodashboarddiv">
      
        <img class="herodashboard" src="../assets/images/Screenshot 2023-01-17 141614.png" alt="trading-dashboard">
      </div>
      
      </div>
      <!-- heropage end -->
      
       <!--secondpage start-->
       <div class="secondpage">
        <div class="secondpageletters">
          <p class="secondpageh3">FEATURES</p>
          <p class="secondpageh1">Try Our best Technical Analysis Platform</p>
        </div>
      
      
        <div class="featuresdiv">
      
          <div class="featuresdiv1">
      
            <img class="fallgraphimg" src="../assets/website images/output-onlinepngtools (1).png" alt="candlesticks image">
            <h1 class="featuresdiv1h1">Perfect Market Analysis</h1>
            <p class="featuresdiv1para"> We gives best market analysis
              to feel<br> Users Comfortable In trading Assets</p>
          </div>
      
          <div class="featuresdiv2">
            <img class="businessanalysisimg" src="../assets/website images/output-onlinepngtools (2).png"
              alt="business-analysis image">
            <h1 class="featuresdiv2h1">Learning & Development</h1>
            <p class="featuresdiv2para">You can learn how to trade in easy way<br>
              and develop your trading knowledge</p>
          </div>
      
      
        </div>
      
      
      
      
      </div>
      <!--secondpage end-->
      <!--thirdpage start-->
      
      <div class="thirdpage">
      
        <div class="thirdpageletters">
          <h1 class="thirdpageh1">100+ New Assets At One Place</h1>
          <p class="thirdpagepara">You can easily analyse various markets
            by our<br> perfect & accurate technical analysis strategy<br> and can trade in a easiest way.</p>
      
        </div>
      
        <div class="thirdpageimgdiv">
          <img class="thirdpageimg" src="../assets/website images/metatrader4-mobile (1).png" alt="learn image">
        </div>
      
      </div>
      <!--thirdpage end-->
      <!--fourth page start-->
      <div class="fourthpage">
      
        <div class="fourthpageimgdiv">
      
      
          <div class="fourthpageimgdiv1">
            <span class="material-symbols-outlined" id="icongoogle">
              account_circle
            </span>
      
            <h1 class="fourthpageimgpara">Users Worldwide</h1>
            <h1 class="fourthpageimgh1">100+</h1>
      
          </div>
      
      
          <div class="fourthpageimgdiv2">
            <span class="material-symbols-outlined" id="icongoogle">
              insert_chart
            </span>
      
            <h1 class="fourthpageimgpara">Investments Worldwide</h1>
            <h1 class="fourthpageimgh1">$500.52+</h1>
          </div>
      
      
          <div class="fourthpageimgdiv3">
            <span class="material-symbols-outlined" id="icongoogle">
              insert_chart
            </span>
      
            <h1 class="fourthpageimgpara">Profits Worldwide</h1>
            <h1 class="fourthpageimgh1">700.58+</h1>
          </div>
      
      
      
      
          <div class="fourthpageimgdiv4">
            <span class="material-symbols-outlined" id="icongoogle">
              insert_chart
            </span>
      
            <h1 class="fourthpageimgpara">Profit Rate Worldwide</h1>
            <h1 class="fourthpageimgh1">80%</h1>
          </div>
      
      
      
      
      
      
      
        </div>
      
      
        <div class="fourthpageletters">
          <h1 class="fourthpageh1">Our Stats All Around the World</h1>
          <p class="fourthpagepara">our family is growing fastly all around the world<br> with good learnings and profits
          </p>
          <br>
          <button class="statsbtn1">See Our Statistics</button>
        </div>
      
      
      
      </div>
      <!--fourth page end-->
      <!--fifthpage start-->
      <div class="fifthpage">
      
      
        <div class="fifthpageletters">
          <p class="secondpageh3">TESTIMONIALS</p>
          <p class="secondpageh1">Voice of our customers about Us</p>
      
        </div>
      
        <div class="customerreviewsdiv">
      
          <div class="customerreviewsdiv1">
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">kishor</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">“I had been using this web platform since now. It's service is best and cheap
              that nobody can give.<br> It gives me a lot of knowledge about trading,<br>thanks to the company fresh
              stocks.”
            </p>
      
          </div>
      
          <div class="customerreviewsdiv2">
      
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">kamalesh</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">Lorem ipsum dolor sit amet. Ut tempora voluptatem eum laboriosam illo est dolor
              voluptate qui repellat culpa ea nisi magnam! Eos mollitia galisum et simili<br>que totam in asperiores
              voluptatum. Aut nulla ipsam quo quam aliquid et fuga beatae qui enim inventore<br> et dolorum dolore ad fugiat
              ratione et natus harum.<br> Ut atque beatae et exercitationem cumque sit ration<br>e rerum rem explicabo
              dolore! qui ipsam saepe.
      
            </p>
      
          </div>
      
          <div class="customerreviewsdiv3">
      
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">chandru</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">“I had been using this web platform since now. It's service is best and cheap
              that nobody can give.<br> It gives me a lot of knowledge about trading,<br>thanks to the company fresh
              stocks.”
            </p>
      
          </div>
      
          <div class="customerreviewsdiv4">
      
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">Vicky</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">“I had been using this web platform since now. It's service is best and cheap
              that nobody can give.<br> It gives me a lot of knowledge about trading,<br>thanks to the company fresh
              stocks.”
            </p>
      
          </div>
      
          <div class="customerreviewsdiv5">
      
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">Sridevan</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">“I had been using this web platform since now. It's service is best and cheap
              that nobody can give.<br> It gives me a lot of knowledge about trading,<br>thanks to the company fresh
              stocks.”
            </p>
      
          </div>
      
          <div class="customerreviewsdiv6">
      
            <div class="profilenamediv">
              <div><img class="customerreviewsimg"
                  src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
                  alt="boy profile photo"></div>
      
              <div class="customerreviewsletters">
                <p class="customerreviewsh3">Durga</p>
                <p class="customerreviewspara1">FSSA Student</p>
              </div>
      
      
            </div>
            <p class="customerreviewspara2">“I had been using this web platform since now. It's service is best and cheap
              that nobody can give.<br> It gives me a lot of knowledge about trading,<br>thanks to the company fresh
              stocks.”
            </p>
      
          </div>
      
      
        </div>
      
        <div><button class="customerreviewsbtn">VIEW MORE TESTIMONIALS</button></div>
      
      
      
      </div>
      <!--fifthpage end-->
      
      <!--getstartedsectionstart-->
      <div class="getstartedcontainer">
      
      <p class="getstartedheading">Get started In a few Steps</p>
      
      
      <div class="getstarteddiv">
      
      <div class="getstarteddiv1">
      
      <img class="getstartedimg" src="https://crypo.netlify.app/assets/img/landing/user.svg" alt="account-user-img">
      <span class="getstartedspan1">1</span>
      <p class="getstartedpara">Create an account</p>
      </div>
      
      <div class="getstarteddiv2">
      <img class="getstartedimg2" src="https://crypo.netlify.app/assets/img/landing/bank.svg" alt="deposit-img">
      <span class="getstartedspan2">2</span>
      <p class="getstartedpara2">Learn How to do Trade</p>
      
      </div>
      
      <div class="getstarteddiv3">
      <img class="getstartedimg" src="https://crypo.netlify.app/assets/img/landing/trade.svg" alt="trade-img">
      <span class="getstartedspan3">3</span>
      <p class="getstartedpara3">Start buying & selling</p>
      
      </div>
      
      </div>
      
      
      </div>
      <!--getstartedsectionend-->
      
      
      <div class="getstartbannercontainer">
       
      <h1 class="getstartheadingbanner">Become part of a global community of people who have<br> found their path to the trading world with trust</h1>
      <a class="getstartbtnfooter" href="#">Get Started</a>
      
      </div>
      </main>
      
      
      <footer id="/footer">
        <!--footer start-->
        <div class="footer">
      
          <div class="footercontainer">
      
            <div class="footerlogodiv">
              <img class="footerlogo" src="../assets/images/Screenshot 2023-02-11 021952.png" alt="footer logo"/>
              <p class="footerletters">freshstocks is a platform that supports Equities, Futures, Forex,
                CFD's,ETFs, Derivatives,Options,Funds and Many more...</p>
            </div>
      
            <div class="footerlinkdiv">
      
              <div class="footerpagelink1and2flex">
                <div class="footerpagelinks1">
      
                  <div>
                    <p style="opacity:0.7; color:white; margin-left: 15px;  font-family: 'Poppins', sans-serif;
                    font-weight: 700; font-size: 16px;">COMPANY</p>
                  </div><br>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="userHome.html">Home</a></p>
                  </div>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="./about.html">About</a></p>
                  </div>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="market.html">Market</a></p>
                  </div>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="live_trading.html">Trade</a></p>
                  </div>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="news.html">News</a></p>
                  </div>
                  <div>
                    <p style="margin-top:5px;"><a class="footerlink1" href="learn.html">Learn</a></p>
                  </div>
      
      
                </div>
      
               
      
      
      
                <div class="footerpagelink3and4flex">
                  <div class="footerpagelinks3">
      
                    <div>
                      <p style="opacity:0.7; color:white; margin-left: 10px; font-family: 'Poppins', sans-serif;
                      font-weight: 700; font-size: 16px;" class="footheading">LEARNING LINKS</p>
                    </div><br>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Latest Courses</a></p>
                    </div>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Live Courses</a></p>
                    </div>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Free Courses</a></p>
                    </div>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Paid Courses</a></p>
                    </div>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Trading Blogs</a></p>
                    </div>
                    <div>
                      <p style="margin-top:5px;"><a class="footerlink1" href="./learn.html">Trading Videos</a></p>
                    </div>
      
      
      
      
                  </div>
                </div>
      
      
                <div class="footerpagelinks4">
      
                  <div>
                    <p style="opacity:0.7; color:white; font-family: 'Poppins', sans-serif;
                    font-weight: 700; font-size: 16px;">SOCIAL-MEDIA CONNECT LINKS</p>
                  </div><br>
                  <div style="display:flex; flex-wrap: wrap; margin-left:-10px;">
                    <div><span class="hint--top hint--rounded" aria-label="facebook"><a href="https://www.facebook.com/freeky.ajmal" class="fa fa-facebook" aria-label="footer social media links"></a></span></div>
                    <div><span class="hint--top hint--rounded" aria-label="twitter"><a href="https://twitter.com/freaky__ajmal" class="fa fa-twitter" aria-label="footer social media links" ></a></span></div>
                    <div><span class="hint--top hint--rounded" aria-label="linkedin"><a href="https://www.linkedin.com/in/mohammed-ajmal-479b311b8/" class="fa fa-linkedin" aria-label="footer social media links" ></a></span></div>
                    <div><span class="hint--top hint--rounded" aria-label="youtube"><a href="https://www.youtube.com/c/FreshworksInc" class="fa fa-youtube" aria-label="footer social media links" ></a></span></div>
                    <div><span class="hint--top hint--rounded" aria-label="instagram"><a href="https://www.instagram.com/freaky__ajmal/" class="fa fa-instagram" aria-label="footer social media links" ></a></span></div>
                  </div>
      
                <div class="newsletter">
                  <span class="hint--left hint--rounded" aria-label="User Email"><input class="footeremail" type="email" name="email" placeholder="Type your E-mail Here"/></span>
                  <span class="hint--right hint--rounded" aria-label="Submit"><button class="submitbtn">
                    Submit
                  </button></span>
                </div>
      
      
                </div>
              </div>
      
              <div class="info">
                <div class="privacypolicy">
                  <p><a style="margin-left:20px; color:#0094ff; text-decoration: none; position: relative; bottom:3px;"
                      href="https://www.termsfeed.com/live/7c509de1-e109-4917-8118-fda89327ef34" target="_blank" rel="noopener">Privacy
                      policy</a></p>
                </div>
                <div class="faq">
                  <p style="margin-left:20px;">FAQ'S</p>
                </div>
                <div class="riskwarning">
                  <p style="margin-left:20px;">Risk Warning</p>
                </div>
              </div>
      
      
            </div>
          </div>
          <div class="copyrights">
            <p class="copyrightpara">
              &copy; 2020 - 2025 freshstocks Inc.  All Rights Reserved
            </p>
          </div>
          <!--footer page end-->
          <!--footer end-->
      
         
      </footer>

<%
}
%>

<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" integrity=""></script>

</body>
</html>

