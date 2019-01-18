-- MySQL Script generated by MySQL Workbench
-- Fri Jan 18 15:38:22 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
-- -----------------------------------------------------
-- Schema cats
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cats
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cats` DEFAULT CHARACTER SET latin1 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`cat` ;

CREATE TABLE IF NOT EXISTS `mydb`.`cat` (
  `id` INT NOT NULL COMMENT '',
  `addedAt` DATETIME NOT NULL COMMENT '',
  `breed` VARCHAR(45) NULL COMMENT '',
  `birthdate` VARCHAR(45) NULL COMMENT '',
  `imageUrl` VARCHAR(45) NULL COMMENT '',
  `lastSeenAt` DATETIME NOT NULL COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `password` VARCHAR(45) NOT NULL COMMENT '',
  `username` VARCHAR(45) NOT NULL COMMENT '',
  `weight` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`id`, `username`)  COMMENT '',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  COMMENT '',
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)  COMMENT '')
ENGINE = InnoDB;

USE `cats` ;

-- -----------------------------------------------------
-- Table `cats`.`cat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cats`.`cat` ;

CREATE TABLE IF NOT EXISTS `cats`.`cat` (
  `addedAt` DATETIME NOT NULL COMMENT '',
  `breed` VARCHAR(45) NULL DEFAULT NULL COMMENT '',
  `birthdate` DATETIME NULL DEFAULT NULL COMMENT '',
  `id` INT(11) NOT NULL COMMENT '',
  `imageUrl` VARCHAR(45) NULL DEFAULT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;