<?php
/**
 * Created by IntelliJ IDEA.
 * User: sad148
 * Date: 2/18/2018
 * Time: 12:05 PM
 */

$newFeedback = $_POST['newFeedback'];
$grades = $_POST['grades'];
$student = $_POST['student'];
$assignment = $_POST['assignment'];
$basePath = "E:/Saurabh/grading system/apis/401-handin/";

//code and main feedback path
$codePath = $basePath . $student . '/' . $assignment;
$feedbackUpdated = $_POST['feedbackUpdated'];
$gradesUpdated = false;
if(file_exists($codePath . "/feedback.txt") == 1) {
    $myfile = fopen($codePath . "/feedback.txt", "r") or die("Unable to open file!");
    $fileData = fread($myfile, filesize($codePath . "/feedback.txt"));
    $fileData = explode("\n", $fileData);

    if (!$feedbackUpdated) {
        $fileData = implode("\n", $fileData);
        $data = array('$data' => $fileData);
        $response = array('code' => 200, 'message' => 'Updated successfully', 'data' => $data);
        $response = json_encode($response);
        echo $response;
    } else {
        $index = 0;
        $closeReaderIndex;
        //version denotes multiple uploads of an assignment by a student
        $version = 1;
        $readerIndex = array();
        foreach ($fileData as $item) {
            if ($index == 0) {
                $data = explode(",", $item);
                //update latest grades
                $data[1] = $grades;
                $version = $data[0];
                $fileData[0] = implode(",", $data);
            } else if (strpos($item, "#READER:") !== false) {
                array_splice($fileData, $index + 1, 0, "Grades - " . $grades);
                $gradesUpdated = true;
                foreach ($newFeedback as $newfeedback1) {
                    $newfeedback1 = json_decode($newfeedback1);
                    $string = $newfeedback1->grade . " " . $newfeedback1->fullForm;
                    array_splice($fileData, $index + 2, 0, $string);
                }
                $closeReaderIndex = $index + sizeof($newFeedback) + 2;
            } else if (strpos($item, "</#READER>")) {
                array_push($readerIndex, $index);
            }
            $index++;
        }

        if (sizeof($readerIndex) == 0) {
            array_splice($fileData, $closeReaderIndex, 0, "</#READER>");
        }

        if ($gradesUpdated) {
            $fileData = implode("\n", $fileData);
            $fileWrite = file_put_contents($codePath . "/feedback.txt", $fileData);
            if ($fileWrite) {
                if (copy($codePath . "/feedback.txt", $codePath . "/" . $version . "/feedback.txt")) {
                    $data = array('feedback' => $fileData);
                    $response = array('code' => 200, 'message' => 'Success', 'data' => $data);
                    $response = json_encode($response);
                    echo $response;
                } else {
                    $response = array('code' => 400, 'message' => 'Error in copying to version folder');
                    $response = json_encode($response);
                    echo $response;
                }
            } else {
                $response = array('code' => 400, 'message' => 'Error in updating feedback');
                $response = json_encode($response);
                echo $response;
            }
        } else {
            $response = array('code' => 400, 'message' => 'Feedback format is different');
            $response = json_encode($response);
            echo $response;
        }
        fclose($myfile);
    }
} else {
    $response = array('code' => 400, 'message' => 'Main feedback file not found');
    $response = json_encode($response);
    echo $response;
}
?>