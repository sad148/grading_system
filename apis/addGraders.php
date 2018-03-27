<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$data = $_POST['info'];
$data = json_decode($data);
$graders = $data->graders;
$course_id = $data->course_id;
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->sec_code));
$term = strtoupper(trim($data->term));
// $course_code = "2710 ADVANCE DATABASE";
// $sec_code = "2006";
// $term = "SPRING 2019";
// $graders = array();
// array_push($graders, array('name'=>"raghav","email"=>"rar155"));

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
        $filename = "/Users/Raghav/PITT/SPR 2018/WEB TECH/grading_system/filename.txt";
    $stmt = $mysqli->prepare("INSERT INTO grader(id, name, course_id) VALUES (?, ?, ?)");

        $stmt->bind_param("sss", $email, $name, $course_id);
        
        $errorMessage = null;
        echo $graders;
        $SQLRecordsFailed = array();
        $FileRecordsFailed = array();
        foreach ($graders as $tuple) {
            echo "string";
            $name = $tuple->name;
            $email = $tuple->email;

            if ($stmt) {
                if (!$stmt->execute()) {
                    array_push($SQLRecordsFailed, $email);
                } else {
                    $fileData = $email . "\n";
                    if (!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX)) {
                        array_push($FileRecordsFailed, $email);
                    }
                }
            }
        }
        if ((count($SQLRecordsFailed) == 0) && (count($FileRecordsFailed) == 0)) {
            $response = array('code' => 200, 'message' => 'Success');
            $response = json_encode($response);
            echo $response;
        } else {
            $response = array('code' => 400, 'message' => 'Failed', 'error' => $stmt->error, 'SQL_failed_records' => $SQLRecordsFailed, 'File_failed_records' => $FileRecordsFailed);
            $response = json_encode($response);
            echo $response;
        }
        if ($stmt)
            $stmt->close();
    
    }
    
}
$mysqli->close();
?>