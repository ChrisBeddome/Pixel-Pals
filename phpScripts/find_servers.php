<?php 

	require("db_connect.php");	

	$game = mysqli_real_escape_string($mysqli, $_POST["game"]);
	
	$query = "SELECT name FROM servers
	INNER JOIN games ON
	games.game_id = servers.game_id
	WHERE games.title = '$game'"; 
	$result = $mysqli->query($query);
	$mysqli ->close();
	
	$table_info = array();
	
	while($row = $result->fetch_row()) {
			array_push($table_info, $row[0]);	
	}
	
	$json = json_encode($table_info);
	
	echo $json;

?>