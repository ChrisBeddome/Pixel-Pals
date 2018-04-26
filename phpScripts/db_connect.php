<?php 

$mysqli = new mysqli('localhost', 'root', '', 'PixelPals');

if ($mysqli->connect_error) {
	echo $mysqli->connect_error;
}

?>