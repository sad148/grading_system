<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$data = $_POST['data'];
$data = json_decode($data);
$assignments = $data->assignments;
// $course_id = $data->course_id;
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->section_code));
$term = strtoupper(trim($data->term));

if(is_null($course_code) || is_null($sec_code) || is_null($term)){
     $response = array('code' => 400, 'message' => 'Missing values in parameters','error'=> 'missing values');
    $response = json_encode($response);
    echo $response;
}else{
    $course_id = getCourseCode($course_code,$sec_code,$term,$mysqli);
    if($course_id == null){
        $response = array('code' => 400, 'message' => 'No Course Found');
        $response = json_encode($response);
        echo $response;
    }else{

        // $filename = "filename.txt";

        $filename = $course_code.'/'.'assignments.txt';

        $stmt = $mysqli->prepare("INSERT INTO assignments(id,course_id,name,created_at,updated_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $id, $course_id, $name, $time, $time);

        $errorMessage = null;

        $SQLRecordsFailed = array();
        $FileRecordsFailed = array();

        foreach ($assignments as $tuple) {

            $id=md5(uniqid());
            $time = date('Y-m-d');
            $name = $tuple->name;

            if($stmt) {
                if (!$stmt->execute()) {
                    array_push($SQLRecordsFailed,$name);
                }
                else{
                    $fileData = $name."\n";
                    if(!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX))
                    {
                        array_push($FileRecordsFailed,$name);
                    }
                }
            }
        }

        if((count($SQLRecordsFailed) == 0 ) && (count($FileRecordsFailed) == 0))
        {
            $response = array('code' => 200, 'message' => 'Success');
            $response = json_encode($response);
            echo $response;
        }
        else
        {
            $response = array('code' => 400, 'message' => 'Failed', 'error' => $stmt->error, 'SQL_failed_records' => $SQLRecordsFailed, 'File_failed_records' => $FileRecordsFailed);
            $response = json_encode($response);
            echo $response;
        }



        if($stmt)
            $stmt->close();
    }
}

$mysqli->close();
?>