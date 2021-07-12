<?php
    header('Content-Type:application/json; charset=utf-8');
    date_default_timezone_set('PRC');

    $qs = $_POST["qs"];
    $js = $_POST["js"];
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
	get_data($qs,$js,$conn,$bm,$flag);

	function get_data($qishi,$jieshu,$conn,$bm,$flag){
		$source = array("现场","添乘","音频","视频","LKJ","责任行车概况","段发通知书","通知书","退勤报","其他","");
		$data = array();

		if($flag == "true")
		    $lev = " AND `level` != '无'";
		else
		    $lev = "";

		for($a=0;$a<6;$a++){
			for($i=0;$i<11;$i++){
				$sql = "SELECT * FROM `all` WHERE `source` like '%".$source[$i]."%' AND `class` like '%".$bm[$a]."%' AND time>='".$qishi."' AND time<= '".$jieshu."'".$lev;
				$result = mysqli_query($conn,$sql);
				$data[$i] = mysqli_num_rows($result);
			}
			$re[$a] = $data;
		}
		//echo $sql;
		echo json_encode($re);
	}
?>