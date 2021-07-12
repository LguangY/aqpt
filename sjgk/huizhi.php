<?php
    header('Content-Type:application/json; charset=utf-8');
    date_default_timezone_set('PRC');

    $qs = $_POST["qs_l"];
    $js = $_POST["js_l"];
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

    get_data($qs,$js,$conn,$flag,$bm);

	function get_data($qishi,$jieshu,$conn,$flag,$bm){
		$level = array("无","违标2","违标1","一般","严违","特严");
		$data = array();

		if($flag == "true"){
            $i = 1;
            $data[0] = 0;
        }
        else{
            $i = 0;
        }

		while($i<6){
		    $sql = "SELECT * FROM `all` WHERE `level` = '".$level[$i]."' AND time>='".$qishi."' AND time<= '".$jieshu."'AND `class` like '%".$bm."%'";
	 	    $result = mysqli_query($conn,$sql);
			$data[$i] = mysqli_num_rows($result);
			$i++;
		}
		echo json_encode($data);
	}

?>