<?php 

	require("db_connect.php");	
	session_start();

	$user_id = $_SESSION["user_id"];
	$char_id = mysqli_real_escape_string($mysqli, $_POST["charID"]);

	$query = "SELECT users.user_id FROM users
						INNER JOIN characters ON
						characters.user_id = users.user_id
						WHERE characters.character_id = $char_id";
	$result = $mysqli->query($query);
	$char_owner_id = $result->fetch_row()[0];


	//make sure user owns the character before deleting
	if ($char_owner_id === $user_id) {
		$query = "DELETE FROM characters WHERE character_id = $char_id"; 
		$result = $mysqli->query($query);
		$mysqli ->close();
	
		$json = json_encode("character deleted");
	
		echo $json;
	} 

	else {
		echo json_encode("You do not own this character");
		$mysqli ->close();
	}
	
?>	