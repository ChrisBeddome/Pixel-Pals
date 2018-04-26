	<?php 

	require("db_connect.php");
	session_start();

	if (!isset($_SESSION["user_id"])) {
		echo json_encode("no messages");
		die();
	}

	$user_id = $_SESSION["user_id"];


	
	$query = "SELECT messages.sender_id,
						(SELECT users.username FROM users WHERE users.user_id = messages.sender_id) AS 'sender', 
						messages.content, messages.timestamp FROM messages
						WHERE messages.receiver_id = $user_id
						ORDER BY messages.timestamp DESC;";
	$result = $mysqli->query($query);
	$mysqli ->close();

	
	
	$table_info = array();
	
	while($row = $result->fetch_assoc()) {
			array_push($table_info, $row);	
	}

	$json = json_encode($table_info);
	
	echo $json;

	?>
	
