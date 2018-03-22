<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$stmt = $mysqli->prepare("INSERT INTO assignments(id,course_id,name,created_at,updated_at) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $id, $course_id, $name, $time, $time);

$data = $POST['data'];
$errorMessage = null;


foreach ($data as $value) {

    $tuple = json_decode($value);

    $id=md5(uniqid());
    $time = date();
    $name = $tuple->course_id;
    $email = $tuple->name;

    if($stmt) {
        if (!$stmt->execute()) {
            $errorMessage = $errorMessage." ".$name;
        }
    }
}

if(is_null($errorMessage))
{
    $response = array('code' => 200, 'message' => 'Success');
    $response = json_encode($response);
    echo $response;
}
else
{
    $errorMessage = "Insertion of ".$errorMessage." records failed";
    $response = array('code' => 400, 'message' => $errorMessage, 'error' => $stmt->error);
    $response = json_encode($response);
    echo $response;
}


if($stmt)
    $stmt->close();


$mysqli->close();
?>