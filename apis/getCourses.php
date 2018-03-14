<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$stmt = $mysqli->prepare("SELECT distinct(course_code) from courses where term = ?");
$stmt->bind_param("s", $term);

$term = strtoupper(trim($_POST['term']));
if (!$stmt->execute()) {
    echo "Retriving Courses failed: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Course Cannot be added to the system','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}else{

    $stmt->bind_result($course);
    $courses=array(); 
    while($stmt->fetch()){
        array_push($courses, $course);
    }

    $response = array('code' => 200, 'message' => 'Success', 'data'=>$courses);
    $response = json_encode($response);
    echo $response;
}
$stmt->close();
$mysqli->close();
?>