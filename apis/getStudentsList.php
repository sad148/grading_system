<?php
/**
 * Created by IntelliJ IDEA.
 * User: omkar
 * Date: 3/29/2018
 * Time: 6:18 PM
 */


$data = $_POST['data'];
$data = json_decode($data);

$grader_id = strtoupper(trim($data->grader_id));

$fileContents = file_get_contents($grader_id.'_students.txt');

if(!$fileContents)
{
    $response = array('code' => 400, 'message' => 'Error reading file','error'=> 'File Reading failed');
    $response = json_encode($response);
    echo $response;
}
else{
    $details = array();
    $file_data = explode("\n", $fileContents);

    for($i=0; $i<count($file_data); $i++)
    {
        $student_username = $file_data[$i];

        array_push($details, $student_username);
    }

    $response = array('code' => 200, 'message' => 'Success', 'data'=>$details);
    $response = json_encode($response);
    echo $response;

}


?>