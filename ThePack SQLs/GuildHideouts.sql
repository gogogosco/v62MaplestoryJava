ALTER TABLE `guilds` ADD `hideout` int(11) NOT NULL DEFAULT '-1';

DROP TABLE IF EXISTS `savedlocations`;
CREATE TABLE `savedlocations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL,
  `locationtype` enum('FREE_MARKET','WORLDTOUR','FLORINA','HIDEOUT') DEFAULT NULL,
  `map` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `savedlocations_ibfk_1` (`characterid`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=108560 ;