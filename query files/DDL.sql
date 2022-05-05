-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_millse2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_millse2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cs340_millse2` DEFAULT CHARACTER SET utf8 ;
USE `cs340_millse2` ;

-- -----------------------------------------------------
-- Table `cs340_millse2`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Genres` (
  `genre_id` INT NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE INDEX `genre_id_UNIQUE` (`genre_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Locations` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE INDEX `location_id_UNIQUE` (`location_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Companies` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NOT NULL,
  `location_id` INT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE INDEX `company_id_UNIQUE` (`company_id` ASC) VISIBLE,
  INDEX `fk_Companies_Locations1_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `fk_Companies_Locations1`
    FOREIGN KEY (`location_id`)
    REFERENCES `cs340_millse2`.`Locations` (`location_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Platforms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Platforms` (
  `platform_id` INT NOT NULL AUTO_INCREMENT,
  `platform_name` VARCHAR(45) NOT NULL,
  `company_id` INT NULL,
  PRIMARY KEY (`platform_id`),
  UNIQUE INDEX `platform_id_UNIQUE` (`platform_id` ASC) VISIBLE,
  INDEX `fk_Platforms_Companies1_idx` (`company_id` ASC) VISIBLE,
  CONSTRAINT `fk_Platforms_Companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `cs340_millse2`.`Companies` (`company_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Games` (
  `game_id` INT NOT NULL AUTO_INCREMENT,
  `game_title` VARCHAR(100) NOT NULL,
  `game_summary` VARCHAR(1000) NULL,
  `release_date` DATE NULL,
  `company_id` INT NULL,
  `genre_id` INT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE INDEX `game_id_UNIQUE` (`game_id` ASC) VISIBLE,
  INDEX `fk_Games_Companies1_idx` (`company_id` ASC) VISIBLE,
  INDEX `fk_Games_Genres1_idx` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `fk_Games_Companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `cs340_millse2`.`Companies` (`company_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Games_Genres1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `cs340_millse2`.`Genres` (`genre_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Playthroughs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Playthroughs` (
  `playthrough_id` INT NOT NULL AUTO_INCREMENT,
  `start_timestamp` TIMESTAMP NOT NULL,
  `finish_timestamp` TIMESTAMP NULL,
  `user_id` INT NOT NULL,
  `game_id` INT NULL,
  PRIMARY KEY (`playthrough_id`),
  UNIQUE INDEX `playthrough_id_UNIQUE` (`playthrough_id` ASC) VISIBLE,
  INDEX `fk_Playthroughs_Users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Playthroughs_Games1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_Playthroughs_Users`
    FOREIGN KEY (`user_id`)
    REFERENCES `cs340_millse2`.`Users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Playthroughs_Games1`
    FOREIGN KEY (`game_id`)
    REFERENCES `cs340_millse2`.`Games` (`game_id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`Sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`Sessions` (
  `session_id` INT NOT NULL AUTO_INCREMENT,
  `session_start` TIMESTAMP NOT NULL,
  `session_end` TIMESTAMP NULL,
  `playthrough_id` INT NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE INDEX `session_id_UNIQUE` (`session_id` ASC) VISIBLE,
  INDEX `fk_Sessions_Playthroughs1_idx` (`playthrough_id` ASC) VISIBLE,
  CONSTRAINT `fk_Sessions_Playthroughs1`
    FOREIGN KEY (`playthrough_id`)
    REFERENCES `cs340_millse2`.`Playthroughs` (`playthrough_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_millse2`.`GamesPlatforms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_millse2`.`GamesPlatforms` (
  `games_platforms_id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NOT NULL,
  `platform_id` INT NOT NULL,
  PRIMARY KEY (`games_platforms_id`),
  INDEX `fk_Games_has_Platforms_Platforms1_idx` (`platform_id` ASC) VISIBLE,
  INDEX `fk_Games_has_Platforms_Games1_idx` (`game_id` ASC) VISIBLE,
  UNIQUE INDEX `games_platforms_id_UNIQUE` (`games_platforms_id` ASC) VISIBLE,
  CONSTRAINT `fk_Games_has_Platforms_Games1`
    FOREIGN KEY (`game_id`)
    REFERENCES `cs340_millse2`.`Games` (`game_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Games_has_Platforms_Platforms1`
    FOREIGN KEY (`platform_id`)
    REFERENCES `cs340_millse2`.`Platforms` (`platform_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- SAMPLE DATA
INSERT INTO Locations (city, state, country)
VALUES ('Tokyo', NULL, 'Japan'),
('Kyoto', NULL, 'Japan'),
('Irvine', 'California', 'United States'),
('Redmond', 'Washington', 'United States');

INSERT INTO Companies (company_name, location_id)
VALUES ('FromSoftware', (SELECT location_id FROM Locations WHERE city='Tokyo' AND country='Japan') ),
('Nintendo', (SELECT location_id FROM Locations WHERE city='Kyoto' AND country='Japan') ),
('Blizzard', (SELECT location_id FROM Locations WHERE city='Irvine' AND country='United States' AND state='California') ),
('Sony', (SELECT location_id FROM Locations WHERE city='Tokyo' AND country='Japan') ),
('Microsoft', (SELECT location_id FROM Locations WHERE city='Redmond' AND country='United States' AND state='Washington'));

INSERT INTO Genres (genre_name)
VALUES ('action'),
('adventure'),
('shooter');

INSERT INTO Platforms (platform_name, company_id)
VALUES ('Switch', (SELECT company_id FROM Companies WHERE company_name='Nintendo') ),
('PC', (SELECT company_id FROM Companies WHERE company_name='Microsoft') ),
('Playstation 4', (SELECT company_id FROM Companies WHERE company_name='Sony') ),
('Playstation 5', (SELECT company_id FROM Companies WHERE company_name='Sony') ),
('Xbox One', (SELECT company_id FROM Companies WHERE company_name='Microsoft') ),
('Xbox Series X|S', (SELECT company_id FROM Companies WHERE company_name='Microsoft') );

INSERT INTO Users (first_name, last_name, username, email)
VALUES ('Eren', 'Yeager', 'Titan','fightme@gmail.com'),
('Mikasa', 'Ackerman', 'Erennn', 'ackerman@gmail.com'),
('Link', 'Zelda', 'Korok', 'zelda@gmail.com');

INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
VALUES ('Elden Ring', 'This is an open world dark souls like game where you also die a lot', '2022-02-25',
(SELECT company_id FROM Companies WHERE company_name = 'FromSoftware'), (SELECT genre_id FROM Genres WHERE genre_name = 'action' )),
('The Legend of Zelda: Breath of the Wild', 'This is an open world zelda game where you hunt koroks', '2017-03-03',
(SELECT company_id FROM Companies WHERE company_name = 'Nintendo'), (SELECT genre_id FROM Genres WHERE genre_name = 'adventure' )),
('Overwatch', 'This is a multiplayer shooting game where everyone needs healing too much', '2016-05-24',
(SELECT company_id FROM Companies WHERE company_name = 'Blizzard'), (SELECT genre_id FROM Genres WHERE genre_name = 'shooter' ));

INSERT INTO Playthroughs (start_timestamp, finish_timestamp, user_id, game_id)
VALUES ('2022-01-04 02:15:01', NULL, (SELECT user_id FROM Users WHERE username = 'Titan'),  (SELECT game_id FROM Games WHERE game_title = 'Elden Ring')),
('2021-11-01 01:30:40', '2022-01-12 10:24:10',(SELECT user_id FROM Users WHERE username = 'Erennn'), (SELECT game_id FROM Games WHERE game_title = 'Overwatch')),
('2020-05-20 04:20:32', '2020-12-01 10:02:01',(SELECT user_id FROM Users WHERE username = 'Korok'), (SELECT game_id FROM Games WHERE game_title = 'The Legend of Zelda: Breath of the Wild'));

INSERT INTO Sessions (session_start, session_end, playthrough_id)
VALUES ('2020-12-11 11:01:03', '2020-12-11 21:01:03',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Korok')),
('2022-02-01 02:02:13', '2022-02-01 03:02:13',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Erennn')),
('2022-04-11 05:09:23', '2022-04-11 10:09:23',(SELECT Playthroughs.playthrough_id FROM Playthroughs INNER JOIN Users ON Playthroughs.user_id = Users.user_id WHERE Users.username='Titan'));

INSERT INTO GamesPlatforms (game_id, platform_id)
VALUES
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='PC') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 4') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 5') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox One') ),
( (SELECT game_id FROM Games WHERE game_title='Elden Ring'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox Series X|S') ),
( (SELECT game_id FROM Games WHERE game_title='The Legend of Zelda: Breath of the Wild'), (SELECT platform_id FROM Platforms WHERE platform_name='Switch') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Switch') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='PC') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Playstation 4') ),
( (SELECT game_id FROM Games WHERE game_title='Overwatch'), (SELECT platform_id FROM Platforms WHERE platform_name='Xbox One') );
