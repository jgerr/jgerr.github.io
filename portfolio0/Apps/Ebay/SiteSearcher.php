																	<!--Joanna Gerr
																	Period 5 Gabor
																	12/9/2014-->

	<?php
	$endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';
	$globalid = 'EBAY-US';
	$appid = 'JaneHsuc6-130b-48bd-9886-296547a9ccc';
	$query = urlencode($_REQUEST['searched']);  

	$apicall = "$endpoint?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=$appid&GLOBAL-ID=$globalid&keywords=$query&paginationInput.entriesPerPage=100&outputSelector(0)=SellerInfo";
	
	$file = simplexml_load_file($apicall);
	if ($file->ack == "Success") {
		$output = '';
		foreach($file->searchResult->item as $item) {
			$pic   = $item->galleryURL;
			$link  = $item->viewItemURL;
			$title = $item->title;
			$country = $item->country;
			$type = $item->listingInfo->listingType;
			$price = $item->sellingStatus->convertedCurrentPrice;
			$condition = $item->condition->conditionDisplayName;
			if (substr($price, -3, 1)!='.')
				$price.='0';
			$time = $item->sellingStatus->timeLeft;
			$T = strpos($time, 'T')+1;
			$H = strpos($time, 'H')+1;
			$M = strpos($time, 'M')+1;
			$S = strpos($time, 'S')+1;
			$time = substr($time, 1, 1).' days, '.substr($time, $T, $H-$T-1).'h '.substr($time, $H, $M-$H-1).'m '.substr($time, $M, $S-$M-1).'s ';
			$seller = $item->sellerInfo->sellerUserName;
			$stars = $item->sellerInfo->positiveFeedbackPercent.'%';#feedbackRatingStar;
			$shipping = $item->shippingInfo ->handlingTime;

			$output .= "<tr><td rowspan=3><img src=\"$pic\"></td>
							<td colspan=5><a href=\"$link\">$title	</a></td></tr>
						<tr><td colspan=2><i>Seller: </i>$seller</td><td><i>Rating: </i>$stars</td>
							<td><i>Country: </i>$country</td></tr>
						<tr><td><i>Price: </i><br>$$price</td><td><i>Condition: </i><br>$condition	
							</td><td><i>Time remaining: </i><br>$time</td><td><i>Lot type: </i><br>$type</td></tr>";
		}
	}
	?>
																	
<html>
	<head>
	<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
	<title>Ebay Searcher</title>
	<style>
	body{background-color:#f7f7f7; color:#676767; font-family:'Abel'; margin-top:0; margin-left:0}
	table{border-spacing:12px; padding:7%;margin-left:15%; margin-right:15%}
	#itemInput{text-align:center;position:fixed; height:12%; width:100%; background-color:#e8e8e8; border:1px solid #999999}
	a:link{color:#333333; text-decoration:none; font-size:1.3em}
	</style>
</head>
<body>
	<form id=itemInput name=itemInput method=get action='SiteSearcher.php'>
		<span style='font-size:1.5em'>Ebay Searcher</span><br>
		<input type=text id=searched name=searched><button type=submit accesskey=S><u>S</u>ubmit</button>
		<br>First 100 results for: <?php echo $_REQUEST['searched'];?>
	</form>
	<table>
		<?php echo $output;?>
	</table>
</body>
</html>