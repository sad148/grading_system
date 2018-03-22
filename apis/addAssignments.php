<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$filename = "testpath/filename.txt";

$stmt = $mysqli->prepare("INSERT INTO assignments(id,course_id,name,created_at,updated_at) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $id, $course_id, $name, $time, $time);

$data = $POST['data'];

$SQLRecordsFailed = array();
$FileRecordsFailed = array();


foreach ($data as $value) {

    $tuple = json_decode($value);

    $id=md5(uniqid());
    $time = date();
    $course_id = $tuple->course_id;
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


$mysqli->close();
?>