<?php
$basePath = "F:/Project/grading system/apis/401-handin/";
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Content-Type:application/json');
    exit;
}
// Create connection
 $mysqli = new mysqli("localhost", "root", "root", "grading");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
	
?>