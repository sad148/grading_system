<?php
$basePath = "F:/Project/grading system/apis/401-handin/";
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type:application/json');
    exit;
}
// Create connection
 $mysqli = new mysqli("localhost", "root", "root", "grading");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
function getCourseCode($course_code, $section_code,$term, $mysqli){
	$stmt = $mysqli->prepare("SELECT id from courses where course_code = ? and section_code=? and term=?");
	$stmt->bind_param("sss", $course_code,$section_code,$term);
	if (!$stmt->execute()) {
		return null;
	}else{
		$stmt->bind_result($courseId);
	    $stmt->fetch();
	    if($courseId == null){
	       return null;
	    }else{
	        $stmt->close(); //close the statment or else it wont work becomes out of sync. 
	        return $courseId;
	    }
	}
}
?>