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
  `company_name` VARCHAR(100) NULL,
  `location_id` INT NULL,
  PRIMARY KEY (`company_id`, `location_id`),
  UNIQUE INDEX `company_id_UNIQUE` (`company_id` ASC) VISIBLE,
  UNIQUE INDEX `company_name_UNIQUE` (`company_name` ASC) VISIBLE,
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
  PRIMARY KEY (`platform_id`, `company_id`),
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
  PRIMARY KEY (`game_id`, `company_id`, `genre_id`),
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
  PRIMARY KEY (`playthrough_id`, `user_id`, `game_id`),
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
  `time_played` DECIMAL(19,2) NULL,
  `session_timestamp` TIMESTAMP NOT NULL,
  `playthrough_id` INT NOT NULL,
  PRIMARY KEY (`session_id`, `playthrough_id`),
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
  `game_id` INT NOT NULL,
  `platform_id` INT NOT NULL,
  PRIMARY KEY (`game_id`, `platform_id`),
  INDEX `fk_Games_has_Platforms_Platforms1_idx` (`platform_id` ASC) VISIBLE,
  INDEX `fk_Games_has_Platforms_Games1_idx` (`game_id` ASC) VISIBLE,
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
