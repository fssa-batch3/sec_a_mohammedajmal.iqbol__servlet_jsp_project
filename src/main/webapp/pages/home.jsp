<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
<link rel="stylesheet" href="../assets/css/home.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Tilt+Neon&display=swap"
	rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto&display=swap"
	rel="stylesheet">
<!--socialmediafontawesome start-->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	integrity="">
<!--socialmediafontawesome end-->
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link href="https://cdn.jsdelivr.net/npm/hint.css@2.7.0/hint.min.css"
	integrity="" rel="stylesheet">
<link rel="stylesheet" href="hint.css" />
</head>
<body>

	<%
	if (session.getAttribute("loggedInemail") == null) {
		response.sendRedirect("login.jsp");
	} else {

		String loggedInEmail = (String) session.getAttribute("loggedInemail");
		Integer loggedInUserID = (Integer) session.getAttribute("loggedInUserID");

		UserService userService = new UserService();
		String profileImg = userService.getUserProfilesFromUserID(loggedInUserID);
	%>


	<div class="chat-bot-popup" id="chatBotPopup">
		<div class="chat-icon">
			<img name="quiz-icon" id="quiz-icon" src="../assets/images/quiz.png"/>
		</div>
	</div>

	<jsp:include page="header.jsp" />

	<div class="heropage">

		<div class="heropageletters">
			<h1 class="heroheading">
				Right Place to Learn trading,Monitor daily Live Market <br>
				Data, Live News Updates ,Blogs and More...
			</h1>
			<p class="heropara">
				freshstocks is a true three dimensional platform that supports
				Equities, Futures, Forex, <br> CFD's,ETFs,
				Derivatives,Options,Funds,with more than 100+ markets worldwide
			</p>
			<div class="herobtnimgflex">
				<form action="learn.jsp">
					<button class="herobtn1">Explore free Trading Courses</button>
				</form>
				<img class="peopleimg" src="../assets/images/team.png" alt="">
				<div class="herouserpara">
					<span class="marquee"> 500 members joined us <br> in
						the past 7-days.
					</span>
				</div>
			</div>


			<div>
				<!-- TradingView Widget BEGIN -->
				<div class="tradingview-widget-container">
					<div class="tradingview-widget-container__widget"></div>
					<div class="tradingview-widget-copyright">
						<a href="https://in.tradingview.com/markets/" rel="noopener"
							target="_blank"><span class="blue-text"></span></a>
					</div>
				</div>
			</div>
		</div>


		<div class="herodashboarddiv">

			<img class="herodashboard"
				src="../assets/images/Screenshot 2023-01-17 141614.png"
				alt="trading-dashboard">
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

				<img class="fallgraphimg"
					src="../assets/website images/output-onlinepngtools (1).png"
					alt="candlesticks image">
				<h1 class="featuresdiv1h1">Perfect Market Analysis</h1>
				<p class="featuresdiv1para">
					We gives best market analysis to feel<br> Users Comfortable In
					trading Assets
				</p>
			</div>

			<div class="featuresdiv2">
				<img class="businessanalysisimg"
					src="../assets/website images/output-onlinepngtools (2).png"
					alt="business-analysis image">
				<h1 class="featuresdiv2h1">Learning & Development</h1>
				<p class="featuresdiv2para">
					You can learn how to trade in easy way<br> and develop your
					trading knowledge
				</p>
			</div>


		</div>




	</div>
	<!--secondpage end-->
	<!--thirdpage start-->

	<div class="thirdpage">

		<div class="thirdpageletters">
			<h1 class="thirdpageh1">100+ New Assets At One Place</h1>
			<p class="thirdpagepara">
				You can easily analyse various markets by our<br> perfect &
				accurate technical analysis strategy<br> and can trade in a
				easiest way.
			</p>

		</div>

		<div class="thirdpageimgdiv">
			<img class="thirdpageimg"
				src="../assets/website images/metatrader4-mobile (1).png"
				alt="learn image">
		</div>

	</div>
	<!--thirdpage end-->
	<!--fourth page start-->
	<div class="fourthpage">

		<div class="fourthpageimgdiv">


			<div class="fourthpageimgdiv1">
				<span class="material-symbols-outlined" id="icongoogle">
					account_circle </span>

				<h1 class="fourthpageimgpara">Users Worldwide</h1>
				<h1 class="fourthpageimgh1">100+</h1>

			</div>


			<div class="fourthpageimgdiv2">
				<span class="material-symbols-outlined" id="icongoogle">
					insert_chart </span>

				<h1 class="fourthpageimgpara">Investments Worldwide</h1>
				<h1 class="fourthpageimgh1">$500.52+</h1>
			</div>


			<div class="fourthpageimgdiv3">
				<span class="material-symbols-outlined" id="icongoogle">
					insert_chart </span>

				<h1 class="fourthpageimgpara">Profits Worldwide</h1>
				<h1 class="fourthpageimgh1">700.58+</h1>
			</div>




			<div class="fourthpageimgdiv4">
				<span class="material-symbols-outlined" id="icongoogle">
					insert_chart </span>

				<h1 class="fourthpageimgpara">Profit Rate Worldwide</h1>
				<h1 class="fourthpageimgh1">80%</h1>
			</div>







		</div>


		<div class="fourthpageletters">
			<h1 class="fourthpageh1">Our Stats All Around the World</h1>
			<p class="fourthpagepara">
				our family is growing fastly all around the world<br> with good
				learnings and profits
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
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">kishor</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					“I had been using this web platform since now. It's service is best
					and cheap that nobody can give.<br> It gives me a lot of
					knowledge about trading,<br>thanks to the company fresh
					stocks.”
				</p>

			</div>

			<div class="customerreviewsdiv2">

				<div class="profilenamediv">
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">kamalesh</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					Lorem ipsum dolor sit amet. Ut tempora voluptatem eum laboriosam
					illo est dolor voluptate qui repellat culpa ea nisi magnam! Eos
					mollitia galisum et simili<br>que totam in asperiores
					voluptatum. Aut nulla ipsam quo quam aliquid et fuga beatae qui
					enim inventore<br> et dolorum dolore ad fugiat ratione et
					natus harum.<br> Ut atque beatae et exercitationem cumque sit
					ration<br>e rerum rem explicabo dolore! qui ipsam saepe.

				</p>

			</div>

			<div class="customerreviewsdiv3">

				<div class="profilenamediv">
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">chandru</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					“I had been using this web platform since now. It's service is best
					and cheap that nobody can give.<br> It gives me a lot of
					knowledge about trading,<br>thanks to the company fresh
					stocks.”
				</p>

			</div>

			<div class="customerreviewsdiv4">

				<div class="profilenamediv">
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">Vicky</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					“I had been using this web platform since now. It's service is best
					and cheap that nobody can give.<br> It gives me a lot of
					knowledge about trading,<br>thanks to the company fresh
					stocks.”
				</p>

			</div>

			<div class="customerreviewsdiv5">

				<div class="profilenamediv">
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">Sridevan</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					“I had been using this web platform since now. It's service is best
					and cheap that nobody can give.<br> It gives me a lot of
					knowledge about trading,<br>thanks to the company fresh
					stocks.”
				</p>

			</div>

			<div class="customerreviewsdiv6">

				<div class="profilenamediv">
					<div>
						<img class="customerreviewsimg"
							src="../assets/website images/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.webp"
							alt="boy profile photo">
					</div>

					<div class="customerreviewsletters">
						<p class="customerreviewsh3">Durga</p>
						<p class="customerreviewspara1">FSSA Student</p>
					</div>


				</div>
				<p class="customerreviewspara2">
					“I had been using this web platform since now. It's service is best
					and cheap that nobody can give.<br> It gives me a lot of
					knowledge about trading,<br>thanks to the company fresh
					stocks.”
				</p>

			</div>


		</div>

		<div>
			<button class="customerreviewsbtn">VIEW MORE TESTIMONIALS</button>
		</div>



	</div>
	<!--fifthpage end-->

	<!--getstartedsectionstart-->
	<div class="getstartedcontainer">

		<p class="getstartedheading">Get started In a few Steps</p>


		<div class="getstarteddiv">

			<div class="getstarteddiv1">

				<img class="getstartedimg"
					src="https://crypo.netlify.app/assets/img/landing/user.svg"
					alt="account-user-img"> <span class="getstartedspan1">1</span>
				<p class="getstartedpara">Create an account</p>
			</div>

			<div class="getstarteddiv2">
				<img class="getstartedimg2"
					src="https://crypo.netlify.app/assets/img/landing/bank.svg"
					alt="deposit-img"> <span class="getstartedspan2">2</span>
				<p class="getstartedpara2">Learn How to do Trade</p>

			</div>

			<div class="getstarteddiv3">
				<img class="getstartedimg"
					src="https://crypo.netlify.app/assets/img/landing/trade.svg"
					alt="trade-img"> <span class="getstartedspan3">3</span>
				<p class="getstartedpara3">Start buying & selling</p>

			</div>

		</div>


	</div>
	<!--getstartedsectionend-->


	<div class="getstartbannercontainer">

		<h1 class="getstartheadingbanner">
			Become part of a global community of people who have<br> found
			their path to the trading world with trust
		</h1>
		<a class="getstartbtnfooter" href="#">Get Started</a>

	</div>
	</main>

	<div class="footerdiv" style="margin-top: 150px;">
		<jsp:include page="footer.jsp" />
	</div>


	<%
	}
	%>

	<script type="text/javascript"
		src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		integrity=""></script>
		<script src="../assets/js/home.js"></script>

</body>
</html>

