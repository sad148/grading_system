<?php
/**
 * Created by IntelliJ IDEA.
 * User: omkar
 * Date: 3/29/2018
 * Time: 5:47 PM
 */

include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$records_failed = array();

$data = $_POST['data'];
$data = json_decode($data);

$grader_id = strtoupper(trim($data->grader_id));
$students = $data->students;

$filename = $grader_id."_students.txt";

foreach ($students as $user_id){
    
    $fileData = $user_id."\n";
    if(!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX))
    {
        array_push($records_failed,$user_id);
    }
}

if(count($records_failed) == 0)
{
    $response = array('code' => 200, 'message' => 'Success');
    $response = json_encode($response);
    echo $response;
}
else
{
    $response = array('code' => 400, 'message' => 'failed to write', 'failed_records' => $records_failed);
    $response = json_encode($response);
    echo $response;
}
