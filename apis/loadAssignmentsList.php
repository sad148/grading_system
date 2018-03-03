<?php
/**
 * Created by IntelliJ IDEA.
 * User: Saurabh
 * Date: 3/2/2018
 * Time: 10:18 PM
 */
include 'defaults.php';
$grader = $_POST['grader'];
$filePath = $basePath . $grader . '_assignments.txt';
if(file_exists($filePath) == 1) {
    $file = fopen($filePath, r);
    $fileData = fread($file, filesize($filePath));
//split string from file into array on \n basis
    $fileData = explode("\n", $fileData);
    $nameArr = array();
    foreach ($fileData as $item) {
        //remove \r from assignment names
        $item = str_replace("\r", "", $item);
        array_push($nameArr, $item);
    }
    if (sizeof($fileData) > 0) {
        $response = array('code' => 200, 'message' => 'Success', data => $nameArr);
        $response = json_encode($response);
        echo $response;
    } else {
        $response = array('code' => 400, 'message' => 'Assignments list not found');
        $response = json_encode($response);
        echo $response;
    }
} else {
    $response = array('code' => 400, 'message' => 'Grader specific assignment list not found');
    $response = json_encode($response);
    echo $response;
}
?>