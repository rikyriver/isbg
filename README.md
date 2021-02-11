Maven build

Tomcat version 9

For connect to server

com.kaliman.dashboard.DbConnection +> getConnectionAdmin

			AcURL="";
			AcUser="";
			AcPassword="";
			driverJdb="";
      
Script to create database:      
      

CREATE DATABASE IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `dashboard`;

CREATE TABLE IF NOT EXISTS `T_ADDRESSES` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `T_PEOPLE_ID` int(10) unsigned NOT NULL,
  `ADDR_TYPE` varchar(10) NOT NULL,
  `ADDR_INFO` varchar(300) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
 

CREATE TABLE IF NOT EXISTS `T_MAILS` (

  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  
  `T_PEOPLE_ID` int(10) unsigned NOT NULL,
  
  `EMAIL_TYPE` varchar(5) NOT NULL,
  
  `EMAIL` varchar(40) DEFAULT NULL,
  
  KEY `id` (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
 

CREATE TABLE IF NOT EXISTS `T_PEOPLE` (

  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  
  `name` varchar(90) NOT NULL,
  
  `pin` varchar(10) DEFAULT NULL,
  
  KEY `id` (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
 
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('1', '1', 'abv', 'edb@abv.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('2', '2', 'mail', 'fdf@mail.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('3', '3', 'vss', 'ttr@vss.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('4', '4', 'tss', 'mmr@tss.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('5', '5', 'mss', 'kky@mss.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('6', '6', 'jss', 'ssf@jss.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('7', '7', 'ht8', '8@ht8.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('8', '8', 'ht9', '9@ht9.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('9', '9', 'ht10', '10@ht10.com');
INSERT INTO `dashboard`.`T_MAILS` (`id`, `T_PEOPLE_ID`, `EMAIL_TYPE`, `EMAIL`) VALUES ('10','10', 'h11','10@h11.com');

INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('1', 'Stefan Stefanov', '111');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('2', 'Gergina Trendafilova', '222');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('3', 'Stoika Parskeva', '333');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('4', 'Boiko Grigorov', '444');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('5', 'Aleksandur Kovachev', '555');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('6', 'Kalina Kostova', '666');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('7', 'Penka Panaiotova', '777');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('8', 'Genadi Kostadinov', '888');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('9', 'Melani Veselinova', '999');
INSERT INTO `dashboard`.`T_PEOPLE` (`id`, `name`, `pin`) VALUES ('10', 'Lora Avramova', '101');

INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('1', '1', 'test1', 'Bulgaria Sofia');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('2', '2', 'test2', 'Bulgaria Plovdiv');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('3', '3', 'test3', 'Bulgaria Varna');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('4', '4', 'test4', 'Bulgaria Vidin');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('5', '5', 'test5', 'Bulgaria Turnovo');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('6', '6', 'test6', 'Bulgaria Pernik');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('7', '7', 'test7', 'Bulgaria Pleven');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('8', '8', 'test8', 'Bulgaria Sandanski');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('9', '9', 'test9', 'Bulgaria Burgas');
INSERT INTO `dashboard`.`T_ADDRESSES` (`id`, `T_PEOPLE_ID`, `ADDR_TYPE`, `ADDR_INFO`) VALUES ('10','10','test10','Bulgaria Sliven



