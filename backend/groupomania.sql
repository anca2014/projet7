-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 03 mars 2021 à 16:44
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `date_heure` datetime NOT NULL,
  `comContent` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_commentaires_posts` (`postId`),
  KEY `fk_commenatires_users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `date_heure` datetime NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posts_users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `IsAdmin` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `lastName`, `firstName`, `email`, `password`, `pseudo`, `avatar`, `IsAdmin`) VALUES
(2, 'prevaud', 'aurelie', 'aureliemichel@orange.fr', '$2b$10$m6Eg14FvdBy68gQtgLZn4OzTG0fa15mMG0NGTR.WxnyU/1rmm6HnO', 'lili', NULL, 0),
(3, 'allegrini', 'michel', 'michelallegrini19@orange.fr', '$2b$10$JTl44TpChZUdKdU57.zXFeBSnZdXBp7fCGmUoZEEBIpNwyRYl6GGa', 'michou', NULL, 0),
(4, 'allegrini', 'ange', 'ange@orange.fr', '$2b$10$jSjLBAYZdhORrQ9iYl3AAu3ZlMSQt4wnVDq056nGm2Nl6s/EnenWe', 'ange', NULL, 0),
(5, 'allegrini', 'Catalina', 'catalina@orange.fr', '$2b$10$WYRF5mTPPiIm5gdPM5tXh.ERmPD3XOPAU632VqAEashx79WdwSxlu', 'tchoupi', NULL, 0),
(6, 'allegrini', 'mamou', 'mamou@orange.fr', '$2b$10$quEdXxgoyBhijEKtTzrwYOmnaTpY2b/ZaipWXSvlAbgjr3mj3RRvW', 'mamou', NULL, 0),
(7, 'prevaud', 'corentin', 'corentin@orange.fr', '$2b$10$UYCE2xC1cRltjO2HLSzp5OfJylf8AksEUJmBqrhqMK1xf6I5TEp2K', 'corentin', NULL, 0),
(8, 'prevaud', 'christianne', 'christianne@orange.fr', '$2b$10$M.giOOEXgkOECH/x7i8ike0.WdKwurcz5JKkg.myT4LwkQrTbyHgG', 'cri', NULL, 0),
(9, 'prevaud', 'marie', 'marie@orange.fr', '$2b$10$v/6jDp/4mPF3qgZEkP9LEOWriaO.yqqQYfGo4/9XQjjtuHYAocDQu', 'cri', NULL, 0),
(10, 'nana', 'nana', 'nana@orange.fr', '$2b$10$MaFTk9vFesAdtQLKiSGjBOfXqJYk4CpCz587cwffaa0M3tDtNXXNa', 'nana', NULL, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_commenatires_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_commentaires_posts` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
