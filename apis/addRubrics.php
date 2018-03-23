<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$filename = "testpath/filename.txt";

$data = $POST['data'];
$records_failed = array();


foreach ($data as $value) {

    $tuple = json_decode($value);

    $grade= $tuple->grade;
    $short_desc = $tuple->short_desc;
    $long_desc = $tuple->long_desc;

    $fileData = $grade."\n".$short_desc."\n".$long_desc."\n";
    if(!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX))
    {
        array_push($records_failed,$short_desc);
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
    $response = array('code' => 400, 'message' => 'failed', 'failed_records' => $records_failed);
    $response = json_encode($response);
    echo $response;
}

$mysqli->close();
?>