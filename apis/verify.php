<?php


$con = mysqli_connect('localhost', 'root', '', 'grading_system');

$email = $_POST['email'];
$password = $_POST['password'];
$password = md5($password);

$query = "Select * from users where email='$email'";

$result = mysqli_query($con, $query);

if (@mysqli_num_rows($result) == 0) {
    header("location: login.js?n=1");
} else {
    $row = mysqli_fetch_assoc($result);
    $password1 = $row['password'];
    $role = $row['role'];
    if ($password1 != $password) {
        header("location: login.js?m=1");
    } else {

        if ($role == 1)
            header("location: Professor.html");
        else
            header("location: Grader.html");
    }


}
mysqli_close($con);
?>
