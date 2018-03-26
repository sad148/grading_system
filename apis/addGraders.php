<?php
include './defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$data = $_POST['data'];
$data = json_decode($data);
$graders = $data->graders;
<<<<<<< HEAD
print_r($data);
=======
>>>>>>> c26710b678e7894764b03d10d0431d97688d12f8
// $course_id = $data->course_id;
$course_code = strtoupper(trim($data->course_code));
$sec_code = strtoupper(trim($data->sec_code));
$term = strtoupper(trim($data->term));
<<<<<<< HEAD
$type = strtoupper(trim($data->type));

if(is_null($course_code) || is_null($sec_code) || is_null($term) || is_null($type)){
=======
// $course_code = "2710 ADVANCED DATABASE";
// $sec_code = "2001";
// $term = "SPRING 2018";
// $graders = array();
// array_push($graders, array('name'=>"raghav","email"=>"rar155"));

if(is_null($course_code) || is_null($sec_code) || is_null($term)){
>>>>>>> c26710b678e7894764b03d10d0431d97688d12f8
     $response = array('code' => 400, 'message' => 'Missing values in parameters','error'=> 'missing values');
    $response = json_encode($response);
    echo $response;
}else{
<<<<<<< HEAD
    $courseId = getCourseCode($course_code,$sec_code,$term,$mysqli);
    $filename = "./filename.txt";
    if($stmt = $mysqli->prepare("INSERT INTO grader(id, name, course_id) VALUES (?, ?, ?,?)")){

        $stmt->bind_param("ssss", $email, $name, $course_id);
        
        $errorMessage = null;

        $SQLRecordsFailed = array();
        $FileRecordsFailed = array();

=======
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
        $SQLRecordsFailed = array();
        $FileRecordsFailed = array();
>>>>>>> c26710b678e7894764b03d10d0431d97688d12f8
        foreach ($graders as $tuple) {
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
<<<<<<< HEAD

=======
>>>>>>> c26710b678e7894764b03d10d0431d97688d12f8
        if ((count($SQLRecordsFailed) == 0) && (count($FileRecordsFailed) == 0)) {
            $response = array('code' => 200, 'message' => 'Success');
            $response = json_encode($response);
            echo $response;
        } else {
            $response = array('code' => 400, 'message' => 'Failed', 'error' => $stmt->error, 'SQL_failed_records' => $SQLRecordsFailed, 'File_failed_records' => $FileRecordsFailed);
            $response = json_encode($response);
            echo $response;
        }
<<<<<<< HEAD


        if ($stmt)
            $stmt->close();

    }else{
        $response = array('code' => 400, 'message' => 'Error Ading Graders','error'=> $stmt->error);
        $response = json_encode($response);
        echo $response;

    }
    

=======
        if ($stmt)
            $stmt->close();
    
    }
    
>>>>>>> c26710b678e7894764b03d10d0431d97688d12f8
}
$mysqli->close();
?>