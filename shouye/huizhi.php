<?php
    header('Content-Type:application/json; charset=utf-8');
    date_default_timezone_set('PRC');

    $flag = $_POST["flag"];

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
	switch($flag){
		//本天概况
		case 0:
		    $qs = date('Y-m-d')."+00:00:00";
			$js = date('Y-m-d')."+23:59:59";
			get_data($qs,$js,$conn);
			break;
		//本月概况
		case 1:
			$qs = date('Y-m')."-1+00:00:00";
			$js = date('Y-m')."-31+23:59:59";
			get_data($qs,$js,$conn);
			break;
	}


	function get_data($qishi,$jieshu,$conn){
		$level = array("无","违标2","违标1","一般","严违","特严");
		$data = array();

		for($i=0;$i<6;$i++){
		    $sql = "SELECT * FROM `all` WHERE `level` = '".$level[$i]."' AND time>='".$qishi."' AND time<= '".$jieshu."'";
	 	    $result = mysqli_query($conn,$sql);
			$data[$i] = mysqli_num_rows($result);
		}
		echo json_encode($data);
	}

?>