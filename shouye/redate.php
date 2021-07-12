<?php
    header('Content-Type:application/json; charset=utf-8');
    date_default_timezone_set('PRC');

    $flag = $_POST["flag"];
	$bm = $_POST["bm"];

    $dbhost = 'localhost';  // mysql服务器主机地址
   	$dbuser = 'root';       // mysql用户名
   	$dbpass = '123456';     // mysql用户名密码
   	$dbname = 'aqpt';		// mysql数据库名
   	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
   	if(! $conn )
   	{
   		die('Could not connect: ' . mysqli_error());
   	}
   	mysqli_select_db($conn, $dbname );

   	$sql = "set names 'utf8'";
   	mysqli_query($conn,$sql);
	
	switch($bm){
		case "东一":
			$bz = array("第01指导组","第02指导组","第03指导组","第04指导组","第05指导组","第06指导组");
			$fo = 6;
			break;
		case "东二":
			$bz = array("第07指导组","第08指导组","第09指导组","第10指导组","第10指导组");
			$fo = 5;
			break;
		case "瓦日":
			$bz = array("第12指导组","第13指导组","第14指导组","第15指导组","第16指导组","第17指导组","第18指导组","第19指导组");
			$fo = 8;
			break;
	}
	switch($flag){
		//本天概况
		case 0:
		    $qs = date('Y-m-d')."+00:00:00";
			$js = date('Y-m-d')."+23:59:59";
			get_data($qs,$js,$conn,$fo,$bz);
			break;
		//本月概况
		case 1:
			$qs = date('Y-m')."-1+00:00:00";
			$js = date('Y-m')."-31+23:59:59";
			get_data($qs,$js,$conn,$fo,$bz);
			break;
	}


	function get_data($qishi,$jieshu,$conn,$fo,$bz){
		$source = array("现场","添乘","音频","视频","LKJ","责任行车概况","段发通知书","通知书","退勤报","其他");
		$data = array();
		for($a=0;$a<$fo;$a++){
			for($i=0;$i<10;$i++){
				$sql = "SELECT * FROM `all` WHERE `source` = '".$source[$i]."' AND time>='".$qishi."' AND time<= '".$jieshu."' AND `team` = '".$bz[$a]."'";
				$result = mysqli_query($conn,$sql);
				$data[$i] = mysqli_num_rows($result);
			}
			$re[$a] = $data;
		}
		//echo $sql;
		echo json_encode($re);
	}

?>