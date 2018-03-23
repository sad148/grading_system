<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

function getDetails($courseId, $type, $mysqli){
    $sql="";
    switch ($type){
        case "STUDENTS": 
        $sql="SELECT id,name from students where course_id = ?";
        break;  

        case "GRADERS":
        $sql="SELECT id,name from graders where course_id = ?";
        break;  

        case "ASSIGNMENTS": 
        $sql="SELECT id,name from assignments where course_id = ?";
        break;  
       default:
    }
    if($stmt = $mysqli->prepare($sql)){
         $stmt->bind_param("s", $courseId);
        if (!$stmt->execute()) {
            echo "Retriving Details failed: (" . $stmt->errno . ") " . $stmt->error;
            $response = array('code' => 400, 'message' => 'Course Cannot be added to the system','error'=> $stmt->error);
            $response = json_encode($response);
            echo $response;
        }else{
            $stmt->bind_result($resultId, $resultName);
            $details=array(); 
            while($stmt->fetch()){
                array_push($details, array('id' => $resultId, 'name' => $resultName));
            }

            $response = array('code' => 200, 'message' => 'Success', 'data'=>$details);
            $response = json_encode($response);
            echo $response;
        }
    }else{
         $response = array('code' => 400, 'message' => 'Retriving Details failed','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
    }

   
}
$stmt = $mysqli->prepare("SELECT id from courses where course_code = ? and section_code=? and term=?");
$stmt->bind_param("sss", $course_code,$sec_code,$term);

$course_code = strtoupper(trim($_GET['course_code']));
$sec_code = strtoupper(trim($_GET['section_code']));
$term = strtoupper(trim($_GET['term']));
$type = strtoupper(trim($_GET['type']));
//echo $courseId." ".$course_code." ".$term." sec ".$sec_code." \n";
if (!$stmt->execute()) {
    $response = array('code' => 400, 'message' => 'Retriving Details failed','error'=> $stmt->error);
    $response = json_encode($response);
    echo $response;
}else{
    $stmt->bind_result($courseId);
    $stmt->fetch();
    
    if($courseId == null){
        $response = array('code' => 400, 'message' => 'No Assignment found for the course');
        $response = json_encode($response); 
        echo $response;
    }else{
        $stmt->close(); //close the statment or else it wont work becomes out of sync. 
        getDetails($courseId,$type,$mysqli);
    }
    
}
$stmt->close();
$mysqli->close();
?>