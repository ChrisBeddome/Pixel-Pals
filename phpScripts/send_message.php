<?php 

	require("db_connect.php");

	session_start();

	if (!isset($_SESSION["user_id"])) {
		echo json_encode("fail");
		die();
	} 
	
	$receiver = mysqli_real_escape_string($mysqli, $_POST["username"]);
	$content = mysqli_real_escape_string($mysqli, $_POST["content"]);
	$sender = mysqli_real_escape_string($mysqli, $_SESSION["user_id"]);
	$time = date('Y-m-d H:i:s');

	$query = "SELECT user_id FROM users WHERE username = '$receiver'";
	$result = $mysqli->query($query);
	$receiverID = $result->fetch_row()[0];


	
	$query = "INSERT INTO messages (message_id, sender_id, receiver_id, content, timestamp)
						VALUES (NULL, '$sender', '$receiverID', '$content', '$time')";
	$result = $mysqli->query($query);

	if ($mysqli->error) {
		echo json_encode($mysqli->error);
	} 
	else {
		echo json_encode("sent");
	}

	$mysqli->close();
?>