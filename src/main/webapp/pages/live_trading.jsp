<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Live forex Trading</title>
<link rel="stylesheet" href="../assets/css/live_trading.css">
</head>
<body>

<jsp:include page="header.jsp" />


<div class="content">
  <!-- Web Terminal Code Start -->
 <div id="webterminal" style="width:100%;height:800px;"></div>
 
  <!-- Web Terminal Code End -->
</div>
<div class="footer"> Copyright 2021-2023, freshstocks</div>

<script type="text/javascript" src="https://metatraderweb.app/trade/widget.js"></script>
<script type="text/javascript">
    new MetaTraderWebTerminal( "webterminal", {
        version: 5,
        server: "MetaQuotes-Demo",
        demoAllServers: true,
        startMode: "open_demo",
        language: "en",
        colorScheme: "green_on_black"
        } );
</script>
</body>
</html>