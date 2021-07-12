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
	
	$bm = array('','东一','东二','瓦日','内勤','安质室');
	switch($flag){
		//本天概况
		case 0: 
		    $qs = date('Y-m-d')."+00:00:00";
			$js = date('Y-m-d')."+23:59:59";
			get_data($qs,$js,$conn,$bm);
			break;
		//本月概况
		case 1: 
			$qs = date('Y-m')."-1+00:00:00";
			$js = date('Y-m')."-31+23:59:59";
			get_data($qs,$js,$conn,$bm);
			break;
	}
	
	
	function get_data($qishi,$jieshu,$conn,$bm){
		$source = array("现场","添乘","音频","视频","LKJ","责任行车概况","段发通知书","通知书","退勤报","其他");
		$data = array();

		for($a=0;$a<6;$a++){
			for($i=0;$i<10;$i++){
				$sql = "SELECT * FROM `all` WHERE `source` = '".$source[$i]."' AND `class` like '%".$bm[$a]."%' AND time>='".$qishi."' AND time<= '".$jieshu."'" ;
				$result = mysqli_query($conn,$sql);
				$data[$i] = mysqli_num_rows($result);
			} 
			$re[$a] = $data;
		}
		//echo $sql;
		echo json_encode($re);
	}

?>