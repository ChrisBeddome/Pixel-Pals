<?php 

session_start();

if (isset($_SESSION["user_id"])) {
	session_destroy();
	echo json_encode("logged out");
} else {
	echo json_encode("yer not even logged in dawg");
}

?>

