<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$data = $_POST['data'];
$data = json_decode($data);

$rubric = $data->rubric;
// $assignment_id = strtoupper(trim($data->assignment_id));

$course_code = strtoupper(trim($data->course_code));
$assignment_id = $data->assignment_id;


$filename = $course_code.'/'.$assignment_id.'_rubric.txt';
$records_failed = array();

$counter = 0;
foreach ($rubric as $value) {


    $grade= $value->grade;
    $short_desc = $value->short_desc;
    $long_desc = $value->long_desc;

    if($counter == (count($rubric) - 1))
        $fileData = $grade."\n".$short_desc."\n".$long_desc;
    else
        $fileData = $grade."\n".$short_desc."\n".$long_desc."\n";

    if(!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX))
    {
        array_push($records_failed,$short_desc);
    }
    $counter++;
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