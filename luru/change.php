<?php
   // header('Content-Type:application/json; charset=utf-8'); 
	
	
	$cut = $_POST["cut"];
	$source = $_POST["source"];
	$blame = $_POST["blame"];
	$bla_num = $_POST["bla_num"];
	$level = $_POST["level"];
	$check = $_POST["check"];
	$describe = $_POST["describe"];
	$step = $_POST["step"];
	$name = $_POST["name"];
	$id = $_POST["id"];
	
	
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
	
	if($step){
		$prefer = 1;
	}else{
		$prefer = 0;
	}
	
	$sql = "UPDATE `$name` SET `cut` = '$cut', `source` = '$source', `blame` = '$blame', `bla_num` = '$bla_num', `level` = '$level', `check` = '$check', `describe` = '$describe', `step` = '$step' WHERE `$name`.`id` = $id";
	
	if(mysqli_query($conn,$sql)){
		echo "a";
	}else{
		echo "b";
	}
?>