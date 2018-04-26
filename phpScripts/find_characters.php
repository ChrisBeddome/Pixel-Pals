<?php 

	require("db_connect.php");
	
	$name = mysqli_real_escape_string($mysqli, $_POST["name"]);
	$game = mysqli_real_escape_string($mysqli, $_POST["game"]);
	$server = mysqli_real_escape_string($mysqli, $_POST["server"]);


	if ($name == "" && ($server == "default" || $server == "all")) {
		
		$query = "SELECT characters.name, servers.name, games.title, users.username, users.user_id
							FROM characters
							INNER JOIN users
							ON characters.user_id = users.user_id
							INNER JOIN servers ON
							servers.server_id = characters.server_id
							INNER JOIN games ON
							games.game_id = servers.game_id
							WHERE games.title = '$game'"; 
		$result = $mysqli->query($query);
		$mysqli ->close();
	
		$table_info = array();

		while($row = $result->fetch_row()) {
				array_push($table_info, $row);	
		}

		$json = json_encode($table_info);

		echo $json;
	}
	
	else if ($name == "") {
		
		$query = "SELECT characters.name, servers.name, games.title, users.username, users.user_id
							FROM characters
							INNER JOIN users
							ON characters.user_id = users.user_id
							INNER JOIN servers ON
							servers.server_id = characters.server_id
							INNER JOIN games ON
							games.game_id = servers.game_id
							WHERE games.title = '$game' AND servers.name = '$server'"; 
		$result = $mysqli->query($query);
		$mysqli ->close();
	
		$table_info = array();

		while($row = $result->fetch_row()) {
				array_push($table_info, $row);	
		}

		$json = json_encode($table_info);

		echo $json;
	}

	else if ($server == "default" || $server == "all") {
		$query = "SELECT characters.name, servers.name, games.title, users.username, users.user_id
							FROM characters
							INNER JOIN users
							ON characters.user_id = users.user_id
							INNER JOIN servers ON
							servers.server_id = characters.server_id
							INNER JOIN games ON
							games.game_id = servers.game_id
							WHERE games.title = '$game' AND characters.name LIKE '$name%'"; 
		$result = $mysqli->query($query);
		$mysqli ->close();
	
		$table_info = array();

		while($row = $result->fetch_row()) {
				array_push($table_info, $row);	
		}

		$json = json_encode($table_info);

		echo $json;
	}

	else {
		$query = "SELECT characters.name, servers.name, games.title, users.username, users.user_id
							FROM characters
							INNER JOIN users
							ON characters.user_id = users.user_id
							INNER JOIN servers ON
							servers.server_id = characters.server_id
							INNER JOIN games ON
							games.game_id = servers.game_id
							WHERE games.title = '$game' AND servers.name = '$server' AND characters.name LIKE '$name%'"; 
		$result = $mysqli->query($query);
		$mysqli ->close();
	
		$table_info = array();

		while($row = $result->fetch_row()) {
				array_push($table_info, $row);	
		}

		$json = json_encode($table_info);

		echo $json;
	}

	?>