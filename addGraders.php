<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$filename = "./filename.txt";
$stmt = $mysqli->prepare("INSERT INTO grader(id, name, email, course_id) VALUES (?, ?, ?,?)");
$stmt->bind_param("ssss", $id, $name, $email, $course_id);
$data = $_POST['data'];

$data = json_decode($data);
$graders = $data->graders;
$course_id = $data->course_id;
$errorMessage = null;

$SQLRecordsFailed = array();
$FileRecordsFailed = array();

foreach ($graders as $tuple) {
    $id = md5(uniqid());
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


$mysqli->close();
?>
