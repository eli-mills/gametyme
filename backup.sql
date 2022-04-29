-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_millse2
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Companies`
--

DROP TABLE IF EXISTS `Companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_id_UNIQUE` (`company_id`),
  KEY `fk_Companies_Locations1_idx` (`location_id`),
  CONSTRAINT `fk_Companies_Locations1` FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companies`
--

LOCK TABLES `Companies` WRITE;
/*!40000 ALTER TABLE `Companies` DISABLE KEYS */;
INSERT INTO `Companies` VALUES (1,'FromSoftware',1),(2,'Nintendo',2),(3,'Blizzard',3),(4,'Sony',1),(5,'Microsoft',4);
/*!40000 ALTER TABLE `Companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Games` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_title` varchar(100) NOT NULL,
  `game_summary` varchar(1000) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE KEY `game_id_UNIQUE` (`game_id`),
  KEY `fk_Games_Companies1_idx` (`company_id`),
  KEY `fk_Games_Genres1_idx` (`genre_id`),
  CONSTRAINT `fk_Games_Companies1` FOREIGN KEY (`company_id`) REFERENCES `Companies` (`company_id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Games_Genres1` FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES (1,'Elden Ring','This is an open world dark souls like game where you also die a lot','2022-02-25',1,1),(2,'The Legend of Zelda: Breath of the Wild','This is an open world zelda game where you hunt koroks','2017-03-03',2,2),(3,'Overwatch','This is a multiplayer shooting game where everyone needs healing too much','2016-05-24',3,3);
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GamesPlatforms`
--

DROP TABLE IF EXISTS `GamesPlatforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GamesPlatforms` (
  `games_platforms_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `platform_id` int(11) NOT NULL,
  PRIMARY KEY (`games_platforms_id`),
  UNIQUE KEY `games_platforms_id_UNIQUE` (`games_platforms_id`),
  KEY `fk_Games_has_Platforms_Platforms1_idx` (`platform_id`),
  KEY `fk_Games_has_Platforms_Games1_idx` (`game_id`),
  CONSTRAINT `fk_Games_has_Platforms_Games1` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_Games_has_Platforms_Platforms1` FOREIGN KEY (`platform_id`) REFERENCES `Platforms` (`platform_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GamesPlatforms`
--

LOCK TABLES `GamesPlatforms` WRITE;
/*!40000 ALTER TABLE `GamesPlatforms` DISABLE KEYS */;
/*!40000 ALTER TABLE `GamesPlatforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genres` (
  `genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(45) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `genre_id_UNIQUE` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES (1,'action'),(2,'adventure'),(3,'shooter');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Locations`
--

DROP TABLE IF EXISTS `Locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_id_UNIQUE` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Locations`
--

LOCK TABLES `Locations` WRITE;
/*!40000 ALTER TABLE `Locations` DISABLE KEYS */;
INSERT INTO `Locations` VALUES (1,'Tokyo',NULL,'Japan'),(2,'Kyoto',NULL,'Japan'),(3,'Irvine','California','United States'),(4,'Redmond','Washington','United States');
/*!40000 ALTER TABLE `Locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Platforms`
--

DROP TABLE IF EXISTS `Platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Platforms` (
  `platform_id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(45) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`platform_id`),
  UNIQUE KEY `platform_id_UNIQUE` (`platform_id`),
  KEY `fk_Platforms_Companies1_idx` (`company_id`),
  CONSTRAINT `fk_Platforms_Companies1` FOREIGN KEY (`company_id`) REFERENCES `Companies` (`company_id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Platforms`
--

LOCK TABLES `Platforms` WRITE;
/*!40000 ALTER TABLE `Platforms` DISABLE KEYS */;
INSERT INTO `Platforms` VALUES (1,'Switch',2),(2,'PC',5),(3,'Playstation 4',4),(4,'Playstation 5',4),(5,'Xbox One',5),(6,'Xbox Series X|S',5);
/*!40000 ALTER TABLE `Platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Playthroughs`
--

DROP TABLE IF EXISTS `Playthroughs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Playthroughs` (
  `playthrough_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `finish_timestamp` timestamp NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`playthrough_id`),
  UNIQUE KEY `playthrough_id_UNIQUE` (`playthrough_id`),
  KEY `fk_Playthroughs_Users_idx` (`user_id`),
  KEY `fk_Playthroughs_Games1_idx` (`game_id`),
  CONSTRAINT `fk_Playthroughs_Games1` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_Playthroughs_Users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Playthroughs`
--

LOCK TABLES `Playthroughs` WRITE;
/*!40000 ALTER TABLE `Playthroughs` DISABLE KEYS */;
INSERT INTO `Playthroughs` VALUES (1,'2022-01-04 10:15:01','2022-04-04 11:14:03',1,1),(2,'2021-11-01 08:30:40','2022-01-12 18:24:10',2,3),(3,'2020-05-20 11:20:32','2020-12-01 18:02:01',3,2);
/*!40000 ALTER TABLE `Playthroughs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_played` decimal(19,2) DEFAULT NULL,
  `session_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `playthrough_id` int(11) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_id_UNIQUE` (`session_id`),
  KEY `fk_Sessions_Playthroughs1_idx` (`playthrough_id`),
  CONSTRAINT `fk_Sessions_Playthroughs1` FOREIGN KEY (`playthrough_id`) REFERENCES `Playthroughs` (`playthrough_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (1,10.00,'2020-12-11 19:01:03',3),(2,1.00,'2022-02-01 10:02:13',2),(3,5.00,'2022-04-11 12:09:23',1);
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Eren','Yeager','Titan','fightme@gmail.com'),(2,'Mikasa','Ackerman','Erennn','ackerman@gmail.com'),(3,'Link','Zelda','Korok','zelda@gmail.com');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28 18:40:02
