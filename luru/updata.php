<?php

    header('Content-Type:application/json; charset=utf-8'); 

	$name = $_POST["name"];
	$class = $_POST["class"];
	$team = $_POST["team"];
	$nn = $_POST["nn"];
	$dd = $_POST["item"];
  
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
	
	$ce3 = 0;
	for($i=0;$i<$nn;$i++){
		$id = $dd[$i];
		$sql = "SELECT *  FROM `$name` WHERE `id` = $id";
		$result = mysqli_query($conn,$sql);
		$row = mysqli_fetch_assoc($result);
		$cut = $row['cut'];
		$source = $row['source'];
		$blame = $row['blame'];
		$bla_num = $row['bla_num'];
		$level = $row['level'];
		$check = $row['check'];
		$describe = $row['describe'];
		$step = $row['step'];
		$sql = "INSERT INTO `all` (`id`, `class`, `team`, `name`, `cut`, `source`, `blame`, `bla_num`, `level`, `check`, `describe`, `step`, `time`) VALUES (NULL, '$class', '$team', '$name','$cut', '$source', '$blame', '$bla_num', '$level', '$check', '$describe','$step',CURRENT_TIME())";
		$cs1 = mysqli_query($conn,$sql);
		$sql = "DELETE FROM `$name` WHERE `id` = $id";
		$cs2 = mysqli_query($conn,$sql);
		if($cs1&&$cs2)
			$ce3++;
	}
	if($ce3 == $nn)
		$arr = array('a'=>"提交成功");
	else
		$arr = array('a'=>"出现了未知的错误！请联系管理员！");
	echo json_encode($arr);
?>