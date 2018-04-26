<?php 

	require("db_connect.php");
	
	session_start();

	if (!isset($_SESSION["user_id"])) {
		echo json_encode("not logged in");
		die();
	} 

	
	$userID = $_SESSION["user_id"];
	
	$query = "SELECT characters.name, servers.name, games.title, characters.character_id 		FROM characters
		INNER JOIN servers ON
		servers.server_id = characters.server_id
		INNER JOIN games ON
		games.game_id = servers.game_id
		INNER JOIN users ON
		users.user_id = characters.user_id
		WHERE users.user_id = '$userID'"; 
	$result = $mysqli->query($query);
	$mysqli ->close();

	$table_info = array();

	while($row = $result->fetch_row()) {
			array_push($table_info, $row);			
	}

	$json = json_encode($table_info);

	echo $json;

	
?>