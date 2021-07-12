<?php
	$name = $_POST["username"];
    $pass = $_POST["password"];
	header('Content-Type:application/json; charset=utf-8'); 

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
	
	$sql = "SELECT * FROM `user`WHERE num = \"".$name."\"";
	$retval = mysqli_query( $conn, $sql );
	$row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
	$rpass = $row['password'];
	if(!$rpass){
		$arr = array('state'=>"a");
	}else{
		if($rpass==$pass){
			$arr = array('state'=>"c",'name'=>$row['name'],'num'=>$row['num'],'class'=>$row['class'],'team'=>$row['team'],'power'=>$row['power']);
		}else{
			$arr = array('state'=>"b");
		}
	}
	echo json_encode($arr);
?>