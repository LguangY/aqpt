<?php
	header('Content-Type:application/json; charset=utf-8');

	$nme = $_POST["nme"];
	$a = $_POST["a"];

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

    if($a=="a"){
      $sql = "SELECT *  FROM `人员表` WHERE `姓名` LIKE '".$nme."'";
	  $result = mysqli_query($conn,$sql);
	  $row = mysqli_fetch_assoc($result);
	  echo json_encode($row["工号"]);
    }else{
      $sql = "SELECT *  FROM `人员表` WHERE `工号` LIKE '".$nme."'";
      $result = mysqli_query($conn,$sql);
	  $row = mysqli_fetch_assoc($result);
	  echo json_encode($row["姓名"]);
    }

?>