<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$stmt = $mysqli->prepare("INSERT INTO courses (id, term, course_code, section_code,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $id, $term, $course_code, $section_code, $time,$time);



$data = $_POST['data'];
$data = json_decode($data);
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->sec_code));
$term = strtoupper(trim($data->term));

// $term = strtoupper(trim($_POST['term']));
// $course_code = strtoupper(trim($_POST['course_code']));
// $section_code = strtoupper(trim($_POST['section_code']));
// $id=md5(uniqid());
// $time=date();

print $stmt->error; //to check errors

if (!$stmt->execute()) {
    echo "Adding Courses failed: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Course Cannot be added to the system','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}else{
    $response = array('code' => 200, 'message' => 'Success');
    $response = json_encode($response);
    echo $response;
}
$stmt->close();
$mysqli->close();
?>