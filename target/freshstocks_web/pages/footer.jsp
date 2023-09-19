<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>footer jsp</title>
<!--socialmediafontawesome start-->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	integrity="">
<!--socialmediafontawesome end-->
<link rel="stylesheet" href="assets/css/footer.css" />
<c:choose>
	<c:when test="${not empty loggedInEmail}">
		<!-- Include CSS for logged-in users -->
		<link rel="stylesheet" href="../assets/css/footer.css" />
	</c:when>
	<c:otherwise>
		<!-- Include CSS for not logged-in users -->
		<link rel="stylesheet" href="assets/css/footer.css" />
	</c:otherwise>
</c:choose>
</head>
<body>
	<br>
	<br>
	<br>
	<br>

	<footer
		style="position: relative; top: 4%; font-family: 'Poppins', sans-serif; font-weight: 300; cursor: pointer; z-index: 20;">
		<!--footer start-->
		<div class="footer">

			<div class="footercontainer">
				<div class="footerlogodiv">
					<br>
					<p class="footerletters">freshstocks is a platform that
						supports Equities, Futures, Forex, CFD's,ETFs,
						Derivatives,Options,Funds and Many more...</p>
				</div>

				<div class="footerlinkdiv">

					<div class="footerpagelink1and2flex">
						<div class="footerpagelinks1">

							<div>
								<p
									style="opacity: 0.7; color: white; margin-left: 15px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 16px;">COMPANY</p>
							</div>
							<br>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="../index.html">Home</a>
								</p>
							</div>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="./pages/about.html">About</a>
								</p>
							</div>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="./pages/marketdata.html">Market</a>
								</p>
							</div>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="pages/register.html">Trade</a>
								</p>
							</div>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="./pages/register.html">Learm</a>
								</p>
							</div>
							<div>
								<p style="margin-top: 5px;">
									<a class="footerlink1" href="./pages/contact.html">Contact</a>
								</p>
							</div>


						</div>





						<div class="footerpagelink3and4flex">
							<div class="footerpagelinks3">

								<div>
									<p
										style="opacity: 0.7; color: white; margin-left: 10px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 16px;"
										class="footheading">LEARNING LINKS</p>
								</div>
								<br>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Latest
											Courses</a>
									</p>
								</div>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Live
											Courses</a>
									</p>
								</div>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Free
											Courses</a>
									</p>
								</div>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Paid
											Courses</a>
									</p>
								</div>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Trading
											Blogs</a>
									</p>
								</div>
								<div>
									<p style="margin-top: 5px;">
										<a class="footerlink1" href="./pages/register.html">Trading
											Videos</a>
									</p>
								</div>




							</div>
						</div>


						<div class="footerpagelinks4">

							<div>
								<p
									style="opacity: 0.7; color: white; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 16px;">SOCIAL-MEDIA
									CONNECT LINKS</p>
							</div>
							<br>
							<div style="display: flex; flex-wrap: wrap; margin-left: -10px;">
								<div>
									<span class="hint--top" aria-label="facebook"> <a
										href="https://www.facebook.com/freeky.ajmal"
										class="fa fa-facebook" aria-label="footer social media links"></a></span>
								</div>
								<div>
									<span class="hint--top" aria-label="twitter"> <a
										href="https://twitter.com/freaky__ajmal" class="fa fa-twitter"
										aria-label="footer social media links"></a></span>
								</div>
								<div>
									<span class="hint--top" aria-label="linkedin"> <a
										href="https://www.linkedin.com/in/mohammed-ajmal-479b311b8/"
										class="fa fa-linkedin" aria-label="footer social media links"></a></span>
								</div>
								<div>
									<span class="hint--top" aria-label="youtube"> <a
										href="https://www.youtube.com/c/FreshworksInc"
										class="fa fa-youtube" aria-label="footer social media links"></a></span>
								</div>
								<div>
									<span class="hint--top" aria-label="instagram"> <a
										href="https://www.instagram.com/freaky__ajmal/"
										class="fa fa-instagram" aria-label="footer social media links"></a></span>
								</div>
							</div>

							<div class="newsletter">
								<span class="hint--left" aria-label="Email"> <input
									class="footeremail" type="email" name="email"
									placeholder="Type your E-mail Here" /></span> <span
									class="hint--right" aria-label="Submit">
									<button class="submitbtn">Submit</button>
								</span>
							</div>


						</div>
					</div>

					<div class="info">
						<div>
							<p>
								<a class="privacypolicy"
									href="https://www.termsfeed.com/live/7c509de1-e109-4917-8118-fda89327ef34"
									target="_blank" rel="noopener">Privacy policy</a>
							</p>
						</div>
						<div class="faq">
							<p style="margin-left: 20px;">FAQ'S</p>
						</div>
						<div class="riskwarning">
							<p style="margin-left: 20px;">Risk Warning</p>
						</div>
					</div>


				</div>
			</div>
			<div class="copyrights">
				<p
					style="background-color: #0069D9; color: white; font-size: 18px; font-weight: 300; font-family: 'Poppins', sans-serif; text-align: center; padding: 10px; position: relative; margin-top: -20px;">&copy;
					2020 - 2025 freshstocks Inc. All Rights Reserved</p>
			</div>
			<!--footer page end-->
		</div>
	</footer>

	<!--footer end-->


</body>
</html>