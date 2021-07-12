<?php
	$i = 1;

	$name = $_POST["name"];
	$dbhost = 'localhost';  // mysql服务器主机地址
	$dbuser = 'root';       // mysql用户名
	$dbpass = '123456';     // mysql用户名密码
	$dbname = 'aqpt';		// mysql数据库名	
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(! $conn ){
		die('Could not connect: ' . mysqli_error());
	}	
	mysqli_select_db($conn, $dbname );

	$sql = "set names 'utf8'";
	mysqli_query($conn,$sql);
	
	$sql = "SELECT * FROM $name";
	$result = mysqli_query($conn,$sql);
	
	echo "<table border=\"2\" id=list_tab >";
		echo "<tr>";
			echo "<th width='20'><input type='checkbox' id='checkall' name='checkall' value='all'/></th>";
			echo "<th width='80'>问题类别</th>";
			echo "<th width='100'>问题来源</th>";
			echo "<th width='300'>问题描述</th>";
			echo "<th width='300'>整改措施</th>";
			echo "<th width='60'>责任人</th>";
			echo "<th width='70'>固编号</th>";
			echo "<th width='70'>问题级别</th>";
			echo "<th width='40'>考核</th>";
			echo "<th width='90''>提报时间</th>";
			echo "<th width='100''>修改/删除</th>";
		echo "</tr>";	
		
		if(mysqli_num_rows($result)>0){
			while($row = mysqli_fetch_assoc($result)){
			/*处理模板*/
			$describe = array();
			switch($row["source"]){
			   case "添乘":
			        $num = 0;
			        $shear_des = $row["describe"];
			        while($num<=12){
			             $describe[$num] = substr($shear_des,0,strpos($shear_des,"/"));
			             $shear_des = substr($shear_des,strpos($shear_des,"/")+1);
			             $num++;
			        }
			        $describe[$num] = $shear_des;
			        $des_mb = $describe[0]."年".$describe[1]."月".$describe[2]."日".$describe[3]."-".$describe[4]."，添乘".$describe[5]
                    ."机班使用".$describe[6]."机车值乘".$describe[7]."-".$describe[8]."间".$describe[9]."次货物列车，编组".
			        $describe[10]."/".$describe[11]."/".$describe[12]."。发现问题：".$describe[13];
			        break;
			   default :
			        $des_mb = $row["describe"];
			        break;
			}

			/*处理工号和姓名*/
				if(strpos($row["blame"],"/")){
					$num = 0;
					$blame = array();
					$bla_num = array();
					$shear_nam = $row["blame"];
					$shear_num = $row["bla_num"];
					while(strpos($shear_nam,"/")){
						$blame[$num] = substr($shear_nam,0,strpos($shear_nam,"/"));
						$bla_num[$num] = substr($shear_num,0,strpos($shear_num,"/"));
						$shear_nam = substr($shear_nam,strpos($shear_nam,"/")+1);
						$shear_num = substr($shear_num,strpos($shear_num,"/")+1);
						$num++;
					}
					$blame[$num] = $shear_nam;
					$bla_num[$num] = $shear_num;
					$num++;
					echo "<tr>";
						echo "<td rowspan='$num' width='20'><input type='checkbox' name='item[]' value='".$row['id']."'/></td>";
						echo "<td rowspan='$num' width='80'>".$row['cut']."</td>";
						echo "<td rowspan='$num' width='100'>".$row['source']."</td>";
						echo "<td rowspan='$num' width='300'>".$des_mb."</td>";
						echo "<td rowspan='$num' width='300'>".$row['step']."</td>";
						echo "<td width='60'>".$blame[0]."</td>";
						echo "<td width='70'>".$bla_num[0]."</td>";
						echo "<td rowspan='$num' width='70'>".$row['level']."</td>";
						echo "<td rowspan='$num' width='40'>".$row['check']."</td>";
						echo "<td rowspan='$num' width='90''>".$row['time']."</td>";
						echo "<td rowspan='$num' width='100''><input type='button' class='change' id='".$i++."' name='".$num."' value='修改'><input type='button' class='del' id='".$row['id']."' value='删除'></th>";
					echo "</tr>";
					$num--;
					$a = 1;
					while($num--){
						echo "<tr>";
							echo "<td width='60'>".$blame[$a]."</td>";
							echo "<td width='70'>".$bla_num[$a]."</td>";
						echo "</tr>";
						$a++;
						$i++;
					}
				}
				else{
					echo "<tr>";
						echo "<td width='20'><input type='checkbox' name='item[]' value='".$row['id']."'/></td>";
						echo "<td width='80'>".$row['cut']."</td>";
						echo "<td width='100'>".$row['source']."</td>";
						echo "<td width='300'>".$des_mb."</td>";
						echo "<td width='300'>".$row['step']."</td>";
						echo "<td width='60'>".$row["blame"]."</td>";
						echo "<td width='70'>".$row["bla_num"]."</td>";
						echo "<td width='70'>".$row['level']."</td>";
						echo "<td width='40'>".$row['check']."</td>";
						echo "<td width='90''>".$row['time']."</td>";
						echo "<td width='100''><input type='button' class='change' id='".$i++."' value='修改'><input type='button' class='del' id='".$row['id']."' value='删除'></th>";
					echo "</tr>";
				}
			}				
		}
		else{
			echo "<tr>";
				echo "<td colspan='11' align='left'>尚无待提交问题！</td>";
			echo "</tr>";
		}
		
	echo "</table>";

?>