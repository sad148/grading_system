<?php
/**
 * Created by IntelliJ IDEA.
 * User: Saurabh
 * Date: 3/2/2018
 * Time: 11:55 PM
 */

include 'defaults.php';
$assignment = $_POST['assignment'];
$filePath = $basePath . "Rubrik/" . $assignment . '-rubrik.txt';
if (file_exists($filePath) == 1) {
    $file = fopen($filePath, r);
    $fileData = fread($file, filesize($filePath));
    //split string from file into array on \n basis
    $fileData = explode("\n", $fileData);
    $nameArr = array();
    $counter = 0;
    for ($i = 0; $i < sizeof($fileData); $i += 3) {
        //remove \r from values
        $fileData[$i] = str_replace("\r", "", $fileData[$i]);
        $fileData[$i] = str_replace("\t", "", $fileData[$i]);
        $fileData[$i + 1] = str_replace("\r", "", $fileData[$i + 1]);
        $fileData[$i + 2] = str_replace("\r", "", $fileData[$i + 2]);
        $nameArr[$counter++] = array("grade" => intval($fileData[$i]), "shortForm" => $fileData[$i + 1], "fullForm" => $fileData[$i + 2]);
    }
    if (sizeof($fileData) > 0) {
        $response = array('code' => 200, 'message' => 'Success', data => $nameArr);
        $response = json_encode($response);
        fclose($file);
        echo $response;
    } else {
        $response = array('code' => 400, 'message' => 'Assignments list not found');
        $response = json_encode($response);
        fclose($file);
        echo $response;
    }
} else {
    $response = array('code' => 400, 'message' => 'Assignment specific rubrics file not found');
    $response = json_encode($response);
    echo $response;
}
?>