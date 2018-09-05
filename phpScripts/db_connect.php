<?php 

$mysqli = new mysqli('localhost', 'root', 'poopoo', 'pixelpals');

if ($mysqli->connect_error) {
	echo $mysqli->connect_error;
}

?>
