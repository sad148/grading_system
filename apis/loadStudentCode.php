<?php
/**
 * Created by IntelliJ IDEA.
 * User: Saurabh
 * Date: 3/3/2018
 * Time: 12:15 AM
 */

include 'defaults.php';
$student = $_POST['student'];
$assignment = $_POST['assignment'];
$path = $basePath . $student . '/' . $assignment;
if (file_exists($path) == 1) {
    $file = fopen($path . '/feedback.txt', 'r');
    $fileData = fread($file, filesize($path . '/feedback.txt'));
    $fileData = explode('\n', $fileData);
    $version = explode(',', $fileData[0]);
    $grades = $version[1];
    $version = $version[0];
    if (file_exists($path . '/' . $version) == 1) {
        $files = scandir($path . '/' . $version);
        foreach ($files as $item) {
            if (!is_dir($path . '/' . $version . '/' . $item)) {
                if (strpos($item, ".java") !== false) {
                    $code = fopen($path . '/' . $version . '/' . $item, 'r');
                    $codeData = fread($code, filesize($path . '/' . $version . '/' . $item));
                    break;
                }
            }
        }
        if (file_exists($path . '/' . $version . '/feedback.txt')) {
            $feedback = fopen($path . '/' . $version . '/feedback.txt', 'r');
            $feedbackData = fread($feedback, filesize($path . '/' . $version . '/feedback.txt'));
        }

        $data = array('code' => $codeData, 'feedback' => $feedbackData, 'grades' => intval($grades));
        $response = array('code' => 200, 'message' => 'Success', 'data' => $data);
        $response = json_encode($response);
        echo $response;
    }
} else {
    $response = array('code' => 400, 'message' => 'Main feedback file not found');
    $response = json_encode($response);
    echo $response;
}
?>