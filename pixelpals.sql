-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2018 at 09:02 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE pixelpals;
use pixelpals;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pixelpals`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_characters`
-- (See below for the actual view)
--
CREATE TABLE `all_characters` (
`character` varchar(100)
,`username` varchar(50)
,`server` varchar(100)
,`game` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `character_id` int(10) UNSIGNED NOT NULL,
  `server_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`character_id`, `server_id`, `user_id`, `name`) VALUES
(1, 11, 1, 'Meatball'),
(2, 13, 1, 'Cheese'),
(3, 20, 2, 'Jackson Sundowner'),
(4, 18, 2, 'Rikker'),
(5, 11, 4, 'Taco'),
(6, 13, 2, 'Docien'),
(7, 25, 3, 'Booger'),
(8, 20, 4, 'Derage'),
(9, 15, 4, 'ClydeFrog'),
(10, 16, 2, 'Lemmiwinks'),
(11, 20, 7, 'WienerMan'),
(15, 15, 1, 'Trogdor'),
(16, 11, 1, 'SparrowPrince'),
(17, 12, 7, 'Plumbus'),
(18, 32, 8, 'Jimbo'),
(19, 11, 1, 'Meatman'),
(21, 27, 1, 'Three Utai'),
(22, 27, 1, 'Irelia Ironheart'),
(23, 27, 1, 'Soup Price'),
(25, 44, 4, 'spaceman'),
(26, 49, 4, 'MachoMan'),
(27, 28, 4, 'Cheeseburger Randy'),
(34, 61, 2, 'Paddington Bear'),
(35, 62, 2, 'Charlie Kelly'),
(36, 38, 2, 'TRON'),
(37, 38, 2, 'Soup'),
(38, 38, 2, 'Marque'),
(39, 39, 2, 'Tnerb'),
(40, 31, 4, 'Sabien'),
(41, 31, 4, 'SuperWarp'),
(42, 32, 4, 'Ravien'),
(43, 32, 4, 'Brucealmighty'),
(44, 42, 4, 'Brewtality'),
(46, 25, 3, 'Trilliums'),
(47, 25, 3, 'Chicken Bill'),
(48, 22, 3, 'Paul'),
(50, 21, 3, 'Mug\'Paul'),
(51, 61, 8, 'ClydeFrog'),
(52, 61, 8, 'MexicanStaringFrog'),
(53, 61, 8, 'ScuzzleButt'),
(54, 61, 8, 'Sparrow Prince'),
(55, 61, 8, 'Lemmywinks'),
(56, 62, 8, 'Frog King'),
(57, 62, 8, 'Catatafish'),
(58, 14, 1, 'Superwarp'),
(60, 57, 2, 'Samwise Gamgee'),
(61, 57, 2, 'Meriadoc Brandybuck'),
(62, 57, 2, 'Perregrin Took'),
(63, 57, 2, 'Aragorn'),
(64, 57, 2, 'Gandalf the Grey'),
(65, 57, 2, 'Boromir'),
(66, 57, 2, 'Legolas'),
(67, 57, 2, 'Gimli'),
(68, 58, 2, 'Bilbo Baggins'),
(69, 58, 2, 'Tom Bombadil'),
(70, 58, 2, 'Faramir'),
(71, 58, 2, 'Glorfindel'),
(72, 58, 2, 'Elrond'),
(73, 58, 2, 'Sauruman the White'),
(77, 11, 1, 'Cheddar'),
(78, 27, 1, 'Jackson Sundowner'),
(79, 47, 14, 'Gazorpazorpfield'),
(80, 47, 14, 'Mr. Poopy Butthole'),
(81, 48, 14, 'Krombopulus Michael'),
(82, 48, 14, 'Ants-in-my-Eyes Guy'),
(83, 18, 1, 'Baby Fark McGeezax'),
(84, 49, 1, 'Goober');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `title`) VALUES
(1, 'Final Fantasy XI'),
(2, 'EverQuest'),
(3, 'World of Warcraft'),
(4, 'Final Fantasy XIV'),
(5, 'RuneScape'),
(6, 'Star Wars: The Old Republic'),
(7, 'EverQuest Online Adventures'),
(8, 'EverQuest 2'),
(9, 'Eve Online'),
(10, 'Guild Wars'),
(11, 'Guild Wars 2'),
(12, 'The Lord of the Rings Online'),
(13, 'The Elder Scrolls Online');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(10) UNSIGNED NOT NULL,
  `sender_id` int(10) UNSIGNED NOT NULL,
  `receiver_id` int(10) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_id`, `receiver_id`, `content`, `timestamp`) VALUES
(74, 1, 2, 'Hey dude! Remember me? It\'s your ol\' pal Meatball!', '2017-08-08 23:52:18'),
(75, 2, 1, 'Yah totally dood! What have you been up to?', '2017-08-08 19:55:20'),
(76, 1, 2, ' Yo DOOD', '2017-08-13 19:31:29'),
(77, 1, 2, 'DUDE! ', '2017-08-13 19:31:39'),
(78, 1, 2, ' fdsfds', '2017-08-13 19:32:22'),
(79, 1, 2, 'fgffd', '2017-08-13 19:32:37'),
(80, 1, 2, ' fdsfds', '2017-08-13 19:32:46'),
(81, 1, 2, ' fdsds', '2017-08-13 19:33:00'),
(82, 1, 2, ' fdsfds', '2017-08-13 19:33:10'),
(83, 1, 1, 'fggdf', '2017-08-13 19:36:21'),
(84, 1, 1, ' ertr', '2017-08-13 19:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `server_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `game_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servers`
--

INSERT INTO `servers` (`server_id`, `name`, `game_id`) VALUES
(11, 'Asura', 1),
(12, 'Ragnarok', 1),
(13, 'Ifrit', 1),
(14, 'Remora', 1),
(15, 'Odin', 1),
(16, 'Drinal', 2),
(17, 'Agnarr', 2),
(18, 'Phinigel', 2),
(19, 'Tunare', 2),
(20, 'Cazic Thule', 2),
(21, 'Mug\'Thol', 3),
(22, 'Turalyon', 3),
(23, 'Thrall', 3),
(24, 'Doomhammer', 3),
(25, 'Hellscream', 3),
(26, 'Fenrir', 4),
(27, 'Behemoth', 4),
(28, 'Excalibur', 4),
(29, 'Moogle', 4),
(30, 'Aegis', 4),
(31, 'North America', 5),
(32, 'Europe', 5),
(33, 'The Bastion', 6),
(34, 'Jung Ma', 6),
(35, 'Jedi Covenant', 6),
(36, 'Darth Nihilus', 6),
(37, 'The Red Eclipse', 6),
(38, 'Hodstock', 7),
(39, 'CLW', 7),
(40, 'Fallen Gate', 8),
(41, 'Halls of Fate', 8),
(42, 'Isle of Refuge', 8),
(43, 'Maj\'Dul', 8),
(44, 'Tranquility', 9),
(45, 'Serenity', 9),
(46, 'Crest', 9),
(47, 'Borlis Pass', 10),
(48, 'Crystal Desert', 10),
(49, 'Darkhaven', 10),
(50, 'Devona\'s Rest', 10),
(51, 'Anvil Rock', 11),
(52, 'Blackgate', 11),
(53, 'Dragonbrand', 11),
(54, 'Kaineng', 11),
(55, 'Stormbluff Isle', 11),
(56, 'Arkenstone', 12),
(57, 'Brandywine', 12),
(58, 'Crickhollow', 12),
(59, 'Riddermark', 12),
(60, 'Dwarrowdelf', 12),
(61, 'NA', 13),
(62, 'EU', 13);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'TonyMacaroni', 'tonymacaroni@hotmail.com', 'poopoo'),
(2, 'JimmyMcBean', 'McBean_Jimmy@gmail.com', 'asdfghjkl;\''),
(3, 'DanielRomano', 'danny_r@gmail.com', 'dannyrules122'),
(4, 'MishaBower', 'bruce_peninsula@gmail.com', 'trilliums'),
(7, 'KeyboardCowboy', 'coxrkewl@gmail.com', 'jk'),
(8, 'Jimbo', 'jimbo@jimbosguns.com', 'mexicanstaringfrogofsouthernsrilanka'),
(11, 'MachoMan', 'randy@wwe.com', 'poopoo'),
(13, 'Gazorpazorpfield', 'shmoopy@doop.com', 'poopoo'),
(14, 'BirdPerson', 'bird@person.com', 'poopoo'),
(19, 'Meeseeks', 'Meeseeks@destroy.com', 'poopoo'),
(20, 'Clyde', 'clyde@frog.com', 'poopoo'),
(21, 'fdsd', 'sdfds', 'dfsfff');

-- --------------------------------------------------------

--
-- Structure for view `all_characters`
--
DROP TABLE IF EXISTS `all_characters`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `all_characters`  AS  select `characters`.`name` AS `character`,`users`.`username` AS `username`,`servers`.`name` AS `server`,`games`.`title` AS `game` from (((`characters` join `users` on((`users`.`user_id` = `characters`.`user_id`))) join `servers` on((`characters`.`server_id` = `servers`.`server_id`))) join `games` on((`games`.`game_id` = `servers`.`game_id`))) order by `games`.`title`,`servers`.`name`,`characters`.`name` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`character_id`),
  ADD KEY `server_id` (`server_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`server_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `character_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `server_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`server_id`) REFERENCES `servers` (`server_id`),
  ADD CONSTRAINT `characters_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
