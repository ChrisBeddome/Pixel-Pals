	<?php 

	require("db_connect.php");
	
	$query = "SELECT title FROM games ORDER BY title";
	$result = $mysqli->query($query);
	$mysqli ->close();
	
	$table_info = array();
	
	while($row = $result->fetch_assoc()) {
			array_push($table_info, $row["title"]);	
	}

	$json = json_encode($table_info);
	
	echo $json;

	?>
	
