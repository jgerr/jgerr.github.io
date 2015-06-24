<?php
	class ebDB extends SQLite3{
		function __construct(){
			$this->open('ebay.db');
		}
	}

	$db = new ebDB();
	$info = $db->query('SELECT AuctionId, Picture, Link, Title, Location, Type, Price, Condition, Endtime, Seller, Rating, Shipping, Timenum, Totalcost, UpdatedTime FROM Items');
	$arrayString = '';
	while($item = $info->fetchArray()){
		$arrayString .= '<tr>';
		$idx = 1;
		foreach($item as $key=>$val){
			if ($idx==6)
				$arrayString.='<td><a href="' .$val.'">'.$val.'</a></td>';
			else if ($idx%2==0)
				$arrayString.='<td>'.$val.'</td>';
			$idx++;
		}
		$arrayString .= '</tr>';
	}
?>
<html>
	<head>
		<title>Cron Job Data</title>
		<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
		<style>
		body{background-color:#f7f7f7; color:#676767; font-family:'Abel'; margin-top:0; margin-left:0}
		table{border-spacing:10px; padding:2%;}
		#header{padding-left:2%; font-size:36px}
		#tabley tr *:nth-child(2){display:none}
		#tabley tr *:nth-child(13){display:none}
		</style>
	</head>
	<body>
		<br>
		<span id=header>Cron Job Database:</span>
		<table id=tabley>
			<tr>	
				<td>Auction ID</td>
				<td>Picture</td>
				<td>Link</td>
				<td>Title</td>
				<td>Location</td>
				<td>Type</td>
				<td>Price</td>
				<td>Condition</td>
				<td>End Time</td>
				<td>Seller</td>
				<td>Rating</td>
				<td>Shipping</td>
				<td>Timenum</td>
				<td>Totalcost</td>
				<td>Updated Time</td>
			</tr>
			<?php echo $arrayString; ?>
		</table>
	</body>
</html>