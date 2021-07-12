<?php
    header('Content-Type:application/json; charset=utf-8'); 
	
	
	$cut = $_POST["cut"];
	$source = $_POST["source"];
	$blame = $_POST["blame"];
	$bla_num = $_POST["bla_num"];
	$level = $_POST["level"];
	$check = $_POST["check"];
	$describe = $_POST["describe"];
	$step = $_POST["step"];
	$name = $_POST["name"];
	//储存多个姓名工号
	$len = count($blame);
	$blame1 = $blame[0];
	$bla_num1 = $bla_num[0];
	for($i=1;$i<$len;$i++){
	  $blame1 .= "/" .$blame[$i];
	  $bla_num1 .= "/" . $bla_num[$i];
	}
	//储存问题描述
	$len = count($describe);
	$describe1 = $describe[0];
	for($i=1;$i<$len;$i++){
	  $describe1 .= "/".$describe[$i];
	}


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
	
	$sql = "INSERT INTO `$name` (`id`, `cut`, `source`, `blame`, `bla_num`, `level`, `check`, `describe`,`step`,`time`) VALUES (NULL, '$cut', '$source', '$blame1', '$bla_num1', '$level', '$check', '$describe1', '$step',CURRENT_TIME())";
	
	if(mysqli_query($conn,$sql))
//		$arr = array('a'=>"保存成功");
        echo "保存成功";
	else
	    echo "请重试";
//		$arr = array('a'=>"请重试");
//	echo json_encode($arr);
?>