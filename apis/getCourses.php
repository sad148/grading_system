<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$stmt = $mysqli->prepare("SELECT id,term,course_code,section_code from courses where term = ?");
$stmt->bind_param("s", $term);

$data = $_GET['data'];
$data = json_decode($data);
$term = strtoupper(trim($data->term));
if (!$stmt->execute()) {
    echo "Retriving Courses failed: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Course Cannot be added to the system','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}else{

    $stmt->bind_result($courseId, $courseTerm, $courseCode, $sectionCode);
    $courses=array(); 
    while($stmt->fetch()){
         array_push($courses, array('id' => $courseId, 'course_code' => $courseCode, 'term' => $courseTerm, 'section_code' => $sectionCode));
    }

    $response = array('code' => 200, 'message' => 'Success', 'data'=>$courses);
    $response = json_encode($response);
    echo $response;
}
$stmt->close();
$mysqli->close();
?>