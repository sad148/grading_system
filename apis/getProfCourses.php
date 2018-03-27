<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");


$data = $_GET['data'];
$data = json_decode($data);
$prof_id = strtoupper(trim($data->professor_id));

// $prof_id = "prof145";

$sql="SELECT coursesVsProfessor.professor_id, courses.term, courses.course_code,courses.section_code FROM CoursesVsProfessor join courses ON coursesVsProfessor.course_id = courses.id where coursesVsProfessor.professor_id=?";

if($stmt = $mysqli->prepare($sql)){
     $stmt->bind_param("s", $prof_id);
    if (!$stmt->execute()) {
        $response = array('code' => 400, 'message' => 'Retriving courses failed','error'=> $stmt->error);
        $response = json_encode($response);
        echo $response;
    }else{
        $stmt->bind_result($res_prof_id, $res_term, $res_course_code,$res_section_code);
        $details=array(); 
        while($stmt->fetch()){
            array_push($details, array('Prof_id' => $resultId, 
                'term' => $res_term,
                'course_code' => $res_course_code,
                'section_code' => $res_section_code));
        }

        $response = array('code' => 200, 'message' => 'Success', 'data'=>$details);
        $response = json_encode($response);
        echo $response;
        $stmt->close();
    }
}else{
     $response = array('code' => 400, 'message' => 'Retriving courses failed','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;

}
$stmt->close();

$mysqli->close();
?>