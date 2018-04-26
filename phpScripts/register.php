<?php 

require("db_connect.php");

$username = mysqli_real_escape_string($mysqli, $_POST["username"]);
$email = mysqli_real_escape_string($mysqli, $_POST["email"]);
$password = $_POST["password"];

$query = "SELECT * FROM users WHERE username = '$username'";
$result = $mysqli->query($query);

if ($result->fetch_row()) {
	echo json_encode("Someone has already registered with that username, please choose another username");
	die();
}

$query = "SELECT * FROM users WHERE email = '$email'";
$result = $mysqli->query($query);

if ($result->fetch_row()) {
	echo json_encode("Someone has already registered with that email address, please choose another email address");
	die();
}

$query = "INSERT INTO users (user_id, username, email, password)
						VALUES (NULL, '$username', '$email', '$password')"; 
$result = $mysqli->query($query);


echo json_encode("registered");
?>