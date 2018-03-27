<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$stmt = $mysqli->prepare("INSERT INTO courses (id, term, course_code, section_code,created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $id, $term, $course_code, $section_code, $time,$time);



$data = $_POST['data'];
$data = json_decode($data);
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->section_code));
$term = strtoupper(trim($data->term));
$prof_id = strtoupper(trim($data->professor_id));

// $term = "SPRING 2018";
// $course_code = "2150";
// $section_code = "2099";
// $prof_id = "prof145";
$id=md5(uniqid());
$time=date();

print $stmt->error; //to check errors

if (!$stmt->execute()) {
    echo "Adding Courses failed: (" . $stmt->errno . ") " . $stmt->error;
    $response = array('code' => 400, 'message' => 'Course Cannot be added to the system','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}else{
	$stmt->close();
	$stmt = $mysqli->prepare("INSERT INTO coursesVsProfessor (course_id, professor_id) VALUES (?, ?)");
	$stmt->bind_param("ss", $id, $prof_id);
	if (!$stmt->execute()) {
	    $response = array('code' => 400, 'message' => 'Mapping Courses to Professor failed','error'=> $stmt->error);
	    $response = json_encode($response);
	    echo $response;
	}else{
		$response = array('code' => 200, 'message' => 'Success');
		$response = json_encode($response);
		echo $response;
	}
}
$stmt->close();
$mysqli->close();
?>