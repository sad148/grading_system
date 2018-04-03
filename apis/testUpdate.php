 <<?php  

include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$grades = 10;
$student = "rar156";
$assignment = "qwewqeqw";
$grader="rar155";

 $stmt = $mysqli->prepare($sql="INSERT INTO grades (assignment_id, student_id, grader_id, grade) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE grade=?");
$stmt->bind_param("sssii", $assignment, $student,$grader, $grades, $grades);

if (!$stmt->execute()) {
    $response = array('code' => 400, 'message' => 'File Updated Error in MYSQL');
    $response = json_encode($response);
    echo $response;
}else{
    $response = array('code' => 200, 'message' => 'Success');
    $response = json_encode($response);
    echo $response;
}



 ?>

                   