<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$username = strtoupper($_POST['username']);
$password = md5($_POST['password']);

$stmt = $mysqli->prepare("SELECT password,role from login where username = ? AND password =?");
$stmt->bind_param("ss", $username,$password);

$stmt2 = $mysqli->prepare("SELECT * from grader where username = ?");
$stmt2->bind_param("s", $username);

if (!$stmt->execute()) {
    echo "Log in Error: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Cannot complete login','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}
else{
	
	
    $stmt->bind_result($result);
	
	if($result -> num_rows > 0)
	{
		$row = $result -> fetch_assoc();
		$role = $row['role']
	
		if($role == 1)
		{
			professorLogIn();
		}
		else
		{
			graderLogIn();
		}	
	}
	else
	{
		$response = array('code' => 400, 'message' => 'Incorrect username or password');
		$response = json_encode($response);
		echo $response
	}
	
	$stmt->close();
	$mysqli->close();
	
	function professorLogIn()
	{
		$response = array('code' => 200, 'message' => 'Success', 'flag' => 1);
		$response = json_encode($response);
		echo $response
	}
	
	
	function graderLogIn($password1,$password)
	{
		if (!$stmt2->execute())
		{
			echo "SQL Error: (" . $stmt2->errno . ") " . $stmt2->error;
			$response = array('code' => 400, 'message' => 'SQL error','error'=> $stmt2->error);
			$response = json_encode($response);
			echo $response;
		}
		else
		{
			$stmt2->bind_result($result2);
	
			if($result2 -> num_rows > 0)
			{
				
				$response = array('code' => 200, 'message' => 'Success' 'flag' => 0);
				$response = json_encode($response);
				echo $response
			}
			else
			{
				$response = array('code' => 400, 'message' => 'Grader does not exist');
				$response = json_encode($response);
				echo $response
			}	
			
			$stmt2 -> close();
		}
		
	}
			
	

?>