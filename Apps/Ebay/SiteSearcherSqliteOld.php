																	<!--Joanna Gerr
																	Period 5 Gabor
																	12/10/2014-->

	<?php
	$endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';
	$globalid = 'EBAY-US';
	$appid = 'JaneHsuc6-130b-48bd-9886-296547a9ccc';
	$query = urlencode($_REQUEST['searched']);  

	$apicall = "$endpoint?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=$appid&GLOBAL-ID=$globalid&keywords=$query&paginationInput.entriesPerPage=100&outputSelector(0)=SellerInfo";
	
	$file = simplexml_load_file($apicall);

	class ebDB extends SQLite3{
		function __construct(){
			$this->open('ebay.db');
		}
	}

	$db = new ebDB();
	
	#$db->exec("CREATE TABLE Items(Id STRING PRIMARY KEY, AuctionId STRING UNIQUE, Picture STRING, Link STRING, Title STRING, Location STRING, Type STRING, Price STRING, Condition STRING, Time STRING, Seller STRING, Rating STRING, Shipping STRING, Timenum INTEGER, Totalcost STRING)");
	
	if ($file->ack == "Success") {
		$output = '';
		$storage = array();
		$numres = 0;
		foreach($file->searchResult->item as $item) {
			$numres+=1;
			$id = $item->itemId;
			$pic = $item->galleryURL;
			$link = 'http://www.ebay.com/itm/'.$id;#$item->viewItemURL; 
			#temp chrontab -e input: 0 0,12 * * * /usr/bin/php/ /web-docs/Ebay/SiteSearcher_v4.php?searched=alpacasso# <-change dep on cronjob location
			$title = $item->title;
			$location = $item->location;
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
			$timeNum = ((integer)substr($time, 1, 1)*86400)+((integer)substr($time, $T, $H-$T-1)*3600)+((integer)substr($time, $H, $M-$H-1)*60)+((integer)substr($time, $M, $S-$M-1));
			$time = substr($time, 1, 1).' days,<br>'.substr($time, $T, $H-$T-1).'h '.substr($time, $H, $M-$H-1).'m '.substr($time, $M, $S-$M-1).'s ';
			$seller = $item->sellerInfo->sellerUserName;
			$stars = $item->sellerInfo->positiveFeedbackPercent.'%';
			$shipping = $item->shippingInfo ->shippingServiceCost;
			if (substr($shipping, -2, 1)=='.')
				$shipping.='0';
			#do formatting first, then move into an array or arrays! ! 
			#you could conceivably sort by: price, seller rating, distance (shipping cost?)
			#cards, eng, and study
			$totalcost = (float)$price+(float)$shipping;
			$totalcost = (string)$totalcost;
			if (substr($totalcost, -2, 1)=='.')
				$totalcost.='0';
			$output .= "<tr><td rowspan=3><img src=\"$pic\"></td>
							<td colspan=7><a href=\"$link\">$title	</a></td></tr>
						<tr><td><i>ID: </i>$id</td></tr>
						<tr><td>$$price <br>(+ $$shipping shipping)</td>
							<td>$$totalcost</td>
							<td>$time</td>
							<td>$seller<br>$stars<br>$location</td>
							<td>$type</td>
							<td>$condition</td>
						</tr>";
			$stars = (string)$stars;
			$stars = substr($stars,0,strlen($stars)-1);
			$arr = [(string)$id, (string)$pic, (string)$link, (string)$title, (string)$location, (string)$type, (string)$price, (string)$condition, (string)$time, (string)$seller, 
			$stars, (string)$shipping, (integer)$timeNum, (string)$totalcost];
			$storage[] = $arr;
			foreach ( $arr as $key => $val ){
				if ( is_string( $val ) ){
					$arr[$key] = SQLite3::escapeString( $val );
					$arr[$key] = str_replace('"','""',$arr[$key]);
				}
			}	
			$db->exec('INSERT OR REPLACE INTO Items (Id, AuctionId, Picture, Link, Title, Location, Type, Price, Condition, Time, Seller, Rating, Shipping, Timenum, Totalcost) VALUES (NULL, "'.$arr[0].'","'.$arr[1].'","'.$arr[2].'","'.$arr[3].'","'.$arr[4].'","'.$arr[5].'","'.$arr[6].'","'.$arr[7].'","'.$arr[8].'","'.$arr[9].'","'.$arr[10].'","'.$arr[11].'","'.$arr[12].'","'.$arr[13].'")');
		}
	}
	?>
																	
<html>
	<head>
	<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
	<title>Ebay Searcher</title>
	<style>
	body{background-color:#f7f7f7; color:#676767; font-family:'Abel'; margin-top:0; margin-left:0}
	table{border-spacing:12px; padding:7%;margin-left:10%; margin-right:10%;}
	#itemInput{text-align:center;position:fixed; height:12%; width:100%; background-color:#e8e8e8; border:1px solid #999999}
	a:link{color:#333333; text-decoration:none; font-size:1.3em}
	.cat{font-size:1.15em}
	</style>
</head>
<body onload='tableDisplay();'>
	<script>
		var len = <?php echo json_encode($numres);?>;
		var baseArr = <?php echo json_encode($storage);?>;
		var prevArr = baseArr;
		var curArr = baseArr;
		var curSortBy = '';
		function gelm(id){
			return document.getElementById(id);
		}
		function tableDisplay(){
			if ((len==0)||(len==null))
				gelm('tabley').style.display = 'none';
			else
				gelm('tabley').style.display = 'table';
		}
		function numsort(a, b){
			return a-b;
		}
		function sortByCategory(sortIdx){ //sort, change innerHTML
			var sortSet = {};
			var sortArr = [];
			for (var x in baseArr){
				if (((sortIdx==6)||(sortIdx==10))||(sortIdx==13))
					baseArr[x][sortIdx] = parseFloat(baseArr[x][sortIdx]);	
				if (sortSet.hasOwnProperty(baseArr[x][sortIdx]))
					sortSet[baseArr[x][sortIdx]].push(x);
				else{
					sortSet[baseArr[x][sortIdx]] = [x];
					sortArr.push(baseArr[x][sortIdx]);	
				}
			}
			sortArr.sort(numsort);
			if (sortIdx==10)
				sortArr.reverse();
			var tempArr = curArr;
			curArr = [];
			for (var j in sortArr){
				var appendIndice = sortSet[sortArr[j]];
				for (var k in appendIndice){
					curArr.push(baseArr[appendIndice[k]]);
				}
			}
			if (tempArr.toString()==curArr.toString()){
				prevArr.reverse();
				curArr.reverse();
			}
			else
				prevArr=tempArr;
			assembleInnerHTML(curArr);
		}
		
		function assembleInnerHTML(array){
			gelm('tabley').innerHTML = '<tr id="constant">'+gelm('constant').innerHTML+'</tr>';

			for (var y in array){
				var ar6str = array[y][6]+'';
				var disp6 = '';
				if (ar6str.substr(ar6str.length-2,1)=='.')
					disp6='0';
				else if (ar6str.indexOf('.')==-1)
					disp6='.00';
					
				var ar13str = array[y][13]+'';
				var disp13 = '';
				if (ar13str.substr(ar13str.length-2,1)=='.')
					disp13='0';
				else if (ar13str.indexOf('.')==-1)
					disp13='.00';
				
				gelm('tabley').innerHTML += '<tr><td rowspan=3><img src=\"'+array[y][1]+'\"></td><td colspan=5><a href=\"'+array[y][2]+'\">'+array[y][3]+'</a></td></tr><tr><td><i>ID: </i>'+array[y][0]+'</td></tr><tr><td>$'+array[y][6]+disp6+'<br>(+ $'+array[y][11]+' shipping)</td><td>$'+array[y][13]+disp13+'</td><td>'+array[y][8]+'</td><td>'+array[y][9]+'<br>'+array[y][10]+'%<br>'+array[y][4]+'</td><td>'+array[y][5]+'</td><td>'+array[y][7]+'</td></tr>';
			}			
		}
	</script>
	<form id=itemInput name=itemInput method=get action='SiteSearcherSqlite.php'>
		<span style='font-size:1.5em'>Ebay Searcher</span><br>
		<input type=text id=searched name=searched><button type=submit accesskey=S><u>S</u>ubmit</button>
		<br>First <?php echo $numres;?> results for: <?php echo $_REQUEST['searched'];?>

	</form>
	<table id ='tabley'>
		<tr id='constant'>
			<td></td>
			<td class='cat'><a href='#' onclick='sortByCategory(6);'>Price</a></td>
			<td class='cat'><a href='#' onclick='sortByCategory(13);'>Total</a></td>
			<td class='cat'><a href='#' onclick='sortByCategory(12);'>Time</a></td>
			<td class='cat'><a href='#' onclick='sortByCategory(10);'>Seller</a></td>
			<td class='cat'><a href='#' onclick='sortByCategory(5);'>Type</a></td>
			<td class='cat'><a href='#' onclick='sortByCategory(7);'>Condition</a></td>
		</tr>
		<?php echo $output;?>
	</table>
</body>
</html>