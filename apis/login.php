<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$data = $_POST['data'];
$data = json_decode($data);
$username = strtoupper($data->username);
$password = md5($data->password);

//$username = "OBS5";
//$password = md5("omkar123");

$stmt = $mysqli->prepare("SELECT role from login where username = ? AND password =?");
$stmt->bind_param("ss", $username,$password);
//$stmt->bind_result($user_password,$user_role);


if (!$stmt->execute()) {
    echo "Log in Error: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Cannot complete login','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}
else {

    $stmt->bind_result($user_role);
    $role = 3; //default value

        while ($stmt->fetch()) {
            $role = $user_role;
        }

        $stmt ->close();

        if ($role == 1) {
            professorLogIn();
        } else if($role ==0){
            $stmt = $mysqli->prepare("SELECT name from grader where username = ?");
            $stmt->bind_param("s", $username);
            graderLogIn($stmt);
        }
        else
            {
        $response = array('code' => 400, 'message' => 'Incorrect username or password');
        $response = json_encode($response);
        echo $response;
    }

    //$stmt->close();
    $mysqli->close();
}
	
	function professorLogIn()
	{
		$response = array('code' => 200, 'message' => 'Success', 'role' => 1);
		$response = json_encode($response);
		echo $response;
	}
	
	
	function graderLogIn($stmt2)
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

            while ($stmt2->fetch()) {
                //echo $result2;
            }

	
			if($stmt2 -> num_rows() > 0)
			{
				
				$response = array('code' => 200, 'message' => 'Success' ,'role' => 0);
				$response = json_encode($response);
				echo $response;
			}
			else
			{
				$response = array('code' => 400, 'message' => 'Grader does not exist');
				$response = json_encode($response);
				echo $response;
			}	
			
			$stmt2 -> close();
		}
		
	}
			
	

?>