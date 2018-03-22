<?php
include 'defaults.php';
header("Content-Type: application/json; charset=UTF-8");

$filename = "testpath/filename.txt";

$stmt = $mysqli->prepare("INSERT INTO students(id, name, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $id, $name, $email);

$data = $POST['data'];
$SQLErrorMessage = null;
$fileErrorMessage = null;


foreach ($data as $value) {

    $tuple = json_decode($value);

    $id=md5(uniqid());
    $name = $tuple->name;
    $email = $tuple->email;

    if($stmt) {
        if (!$stmt->execute()) {
            $SQLErrorMessage = $SQLErrorMessage." ".$name;
        }
        else{
            $fileData = $email."\n";
            if(!file_put_contents($filename, $fileData, FILE_APPEND | LOCK_EX))
            {
                $fileErrorMessage = "File Writing failed";
            }
        }
    }
}

if(is_null($SQLErrorMessage) && is_null($fileErrorMessage))
{
    $response = array('code' => 200, 'message' => 'Success');
    $response = json_encode($response);
    echo $response;
}
else
{
    $errorMessage = "Insertion of ".$SQLErrorMessage." records failed";
    $response = array('code' => 400, 'message' => $SQLErrorMessage, 'error' => $stmt->error);
    $response = json_encode($response);
    echo $response;
}


if($stmt)
    $stmt->close();


$mysqli->close();
?>