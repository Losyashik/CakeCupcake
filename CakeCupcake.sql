-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 10 2024 г., 19:40
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cake_capcake`
--
CREATE DATABASE IF NOT EXISTS `cake_capcake` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cake_capcake`;

-- --------------------------------------------------------

--
-- Структура таблицы `application`
--

CREATE TABLE `application` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_product` bigint(20) UNSIGNED DEFAULT NULL,
  `id_filling` bigint(20) UNSIGNED NOT NULL,
  `number` varchar(14) NOT NULL,
  `addres` text NOT NULL,
  `date` date NOT NULL,
  `shipping_method` tinyint(1) NOT NULL,
  `description_design` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `id_status` bigint(20) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Бенто-торт на День Рождение'),
(2, 'Бенто-торт с приколом'),
(3, 'Бенто-торт для второй половинки'),
(4, 'Бенто-торт маме/папе'),
(5, 'Бенто-торт с рисунком'),
(6, 'Бенто-торт с надписью'),
(7, 'Бенто-торт другу/подруге'),
(8, 'Бенто-торт детский'),
(9, 'Бенто-торт в виде сердца'),
(10, 'Бенто-торт на Новый Год'),
(11, 'Бенто-торт на 8 марта'),
(13, 'Бенто-торт на 23 февраля');

-- --------------------------------------------------------

--
-- Структура таблицы `fillings`
--

CREATE TABLE `fillings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `fillings`
--

INSERT INTO `fillings` (`id`, `name`, `image`, `description`) VALUES
(1, 'Шоколадная вишня', './assets/images/fillings/SHokoladnaya_vishnya.png', 'Шоколадный бисквит, крем-чиз с добавлением молочного шоколада и прослой из вишневого конфи'),
(2, 'Фундучная груша', './assets/images/fillings/Funduchnaya_grusha.png', 'Шифоновые бисквиты с добавлением большого количества дробленного фундука, в сочетании крем-чиза и грушевого мусса'),
(3, 'Малиновый чизкейк', './assets/images/fillings/Malinovyi_chizkeik.png', 'Ванильные бисквиты пропитанные молочной пропиткой, прослойка из чизкейка с добавлением свежей малины'),
(4, 'Шоколадно-ванильная клубника', './assets/images/fillings/SHokoladno-vanilnaya_klubnika.png', 'Шоколадные и ванильные бисквиты пропитанные малиновым сиропом, прослойка из шоколадно-сливочного крема и крем-чиза с добавлением клубники'),
(5, 'Фруктовый микс', './assets/images/fillings/Fruktovyi_miks.png', 'Ванильные бисквиты пропитанные клубничным сиропом, прослойкой из сливочно-бананового крема и прослойкой из клубничного конфи'),
(7, 'Красный бархат', './assets/images/fillings/Krasnyi_barkhat.png', 'Невероятно влажные бисквиты в сочетании с сырным кремом');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `image` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `id_category` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `id_category`) VALUES
(1, 'Бенто-торт на Новый Год', './assets/images/catalog/2.png', 1300.00, 10),
(2, 'Бенто-торт с приколом', './assets/images/products/Bento-tort_s_prikolom.png', 1500.00, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Новый'),
(2, 'Принят'),
(3, 'Готовится'),
(4, 'Завершен'),
(5, 'Отказано');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `number` varchar(14) NOT NULL,
  `password_hash` text NOT NULL,
  `password_text` text NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `number`, `password_hash`, `password_text`, `admin`) VALUES
(1, 'admin', '88008008080', '$2y$10$U3/cCFZPwrsZrPFvelXVtuxSR0BQB8uhTibc6O3qLaNf7C9He8Z4S', 'admin', 1),
(2, 'Футболки', '88001238008', '$2y$10$uZrNRdsCgUaPLS3piHxRmubK0Na6B8RdKt8o9eOhlwynfsYQX4gQ.', '123123', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `application`
--
ALTER TABLE `application`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_filling` (`id_filling`),
  ADD KEY `id_status` (`id_status`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `fillings`
--
ALTER TABLE `fillings`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Индексы таблицы `status`
--
ALTER TABLE `status`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `application`
--
ALTER TABLE `application`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `fillings`
--
ALTER TABLE `fillings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `application_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `application_ibfk_3` FOREIGN KEY (`id_filling`) REFERENCES `fillings` (`id`),
  ADD CONSTRAINT `application_ibfk_4` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
