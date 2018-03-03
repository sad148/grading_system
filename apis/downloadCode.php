<?php
include 'defaults.php';

$student = $_POST['student'];
$assignment = $_POST['assignment'];
$path = $basePath . $student . '/' . $assignment;
$zip = new ZipArchive();
$filename = $path . "/download.zip";

if ($zip->open($filename, ZipArchive::CREATE) !== TRUE) {
    exit("cannot open <$filename>\n");
}

if (file_exists($path . "/feedback.txt") == 1) {
    $myfile = fopen($path . "/feedback.txt", "r") or die("Unable to open file!");
    $fileData = fread($myfile, filesize($path . "/feedback.txt"));
    $fileData = explode("\n", $fileData);
    $version = explode(',', $fileData[0]);
    //get latest version from first line of feedback file
    $version = $version[0];
    if (file_exists($path . '/' . $version) == 1) {
        //read all files from latest version folder
        $files = scandir($path . '/' . $version . '/');
        foreach ($files as $file) {
            if (!is_dir($file)) {
                $zip->addFile($path . '/' . $version . '/' . $file, $file);
            }
        }
        $zip->addFile('F:/Project/grading system/apis/runn.sh', 'runn.sh');
        $zip->close();
        $response = array('code' => 200, 'message' => 'Success');
        $response = json_encode($response);
        echo $response;
    } else {
        $response = array('code' => 400, 'message' => 'Version folder not found');
        $response = json_encode($response);
        echo $response;
    }
} else {
    $response = array('code' => 400, 'message' => 'Main feedback file not found');
    $response = json_encode($response);
    echo $response;
}
?>