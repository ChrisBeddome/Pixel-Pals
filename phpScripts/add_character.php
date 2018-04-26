<?php 

	require("db_connect.php");

	session_start();

	if (!isset($_SESSION["user_id"])) {
		die();
	} 
	
	$name = mysqli_real_escape_string($mysqli, $_POST["name"]);
	$game = mysqli_real_escape_string($mysqli, $_POST["game"]);
	$server = mysqli_real_escape_string($mysqli, $_POST["server"]);
	$userID = mysqli_real_escape_string($mysqli, $_SESSION["user_id"]);
	
	$query = "SELECT game_id FROM games WHERE title = '$game'";
	$result = $mysqli->query($query);

	$gameID = $result->fetch_row()[0];

	$query = "SELECT servers.server_id 
						FROM servers
						INNER JOIN games
						ON games.game_id = servers.game_id
						WHERE games.game_id = $gameID && servers.name = '$server'";
	$result = $mysqli->query($query);
	$serverID = $result->fetch_row()[0];

	$query = "INSERT INTO characters (character_id, server_id, user_id, name)
						VALUES (NULL, '$serverID', '$userID', '$name')";
	$result = $mysqli->query($query);

	$mysqli ->close();

	echo json_encode("character added");

?>