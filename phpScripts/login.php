<?php 

require("db_connect.php");
session_start();

if (isset($_SESSION["user_id"])) {
	echo json_encode("already logged in");
	die();
}

$email = mysqli_real_escape_string($mysqli, $_POST["username"]);
$password = $_POST["password"];

$query = "SELECT email, password, user_id FROM users WHERE email = '$email'"; 
$result = $mysqli->query($query);
$mysqli ->close();

if ($row = $result->fetch_assoc()) {
		if ($password == $row["password"]) {
			$_SESSION["user_id"] = $row["user_id"];
			echo json_encode("logged in");
		}
		else {
			echo json_encode("incorrect username or password");
		}
	}
else {
	echo json_encode("incorrect username or password");
} 

?>