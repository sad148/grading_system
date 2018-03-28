<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

function getDetails($courseId,$assignment_id, $type, $mysqli){
    $sql="";
    switch ($type){
        case "STUDENTS":
            $sql="SELECT id,name from students where course_id = ?";
            break;

        case "GRADERS":
            $sql="SELECT id,name from grader where course_id = ?";
            break;

        case "ASSIGNMENTS":
            $sql="SELECT id,name from assignments where course_id = ?";
            break;

        case "RUBRICS":
            getRubrics($assignment_id);
            break;

       default:
    }
    if($stmt = $mysqli->prepare($sql)){
         $stmt->bind_param("s", $courseId);
        if (!$stmt->execute()) {
            $response = array('code' => 400, 'message' => 'Retrieving Details failed','error'=> $stmt->error);
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
            $stmt->close();
        }
    }else{
         $response = array('code' => 400, 'message' => 'Retriving Details failed','error'=> $stmt->error);
        $response = json_encode($response);
        echo $response;

    }
    $stmt->close();

}


$data = $_POST['data'];
$data = json_decode($data);
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->section_code));
$term = strtoupper(trim($data->term));
$type = strtoupper(trim($data->type));
$assignment_id = strtoupper(trim($data->assignment_id));

if(is_null($course_code) || is_null($sec_code) || is_null($term) || is_null($type)){
     $response = array('code' => 400, 'message' => 'Missing values in parameters','error'=> 'missing values');
    $response = json_encode($response);
    echo $response;
}else{

    $courseId = getCourseCode($course_code,$sec_code,$term,$mysqli);

    if($courseId == null){
        $response = array('code' => 400, 'message' => 'No Course Found');
        $response = json_encode($response); 
        echo $response;
    }else{
      getDetails($courseId,$assignment_id,$type,$mysqli);
    }
}
$mysqli->close();


function getRubrics($assignment_id)
{
    $fileContents = file_get_contents($assignment_id.'_rubric.txt');


    if(!$fileContents)
    {
        $response = array('code' => 400, 'message' => 'Error reading file','error'=> 'File Reading failed');
        $response = json_encode($response);
        echo $response;
    }
    else{
        $details = array();
        $file_data = explode("\n", $fileContents);

        for($i=0; $i<count($file_data); $i = $i + 3)
        {
            $grade = $file_data[$i];
            $short_desc = $file_data[$i+1];
            $long_desc = $file_data[$i+2];

            array_push($details, array('grade' => $grade, 'short_desc' => $short_desc,'long_desc' => $long_desc));
        }

        $response = array('code' => 200, 'message' => 'Success', 'data'=>$details);
        $response = json_encode($response);
        echo $response;

    }
}
?>