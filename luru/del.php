<?php
	header('Content-Type:application/json; charset=utf-8'); 
	
	$id = $_POST["id"];
	$name = $_POST["name"];
	
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
	
	$sql = "DELETE FROM `$name` WHERE `$name`.`id` = $id";
	if(mysqli_query($conn,$sql)){
		$arr = array('a'=>"a");
	}else{
		$arr = array('a'=>"b");
	}
	echo json_encode($arr);
?>