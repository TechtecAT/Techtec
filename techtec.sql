-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2024 a las 19:45:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `techtec`
--
CREATE DATABASE IF NOT EXISTS `techtec` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `techtec`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agregados`
--

DROP TABLE IF EXISTS `agregados`;
CREATE TABLE `agregados` (
  `id_agregados` int(11) NOT NULL,
  `tipo_agregado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agregados`
--

INSERT INTO `agregados` (`id_agregados`, `tipo_agregado`) VALUES
(1, 'Cargador'),
(2, 'Funda'),
(3, 'Mochila'),
(5, 'estuche');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `celulares`
--

DROP TABLE IF EXISTS `celulares`;
CREATE TABLE `celulares` (
  `id_celular` int(11) NOT NULL,
  `celular` bigint(10) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `celulares`
--

INSERT INTO `celulares` (`id_celular`, `celular`, `id_cliente`) VALUES
(1, 1234567890, 1),
(2, 2345678901, 2),
(3, 3456789012, 3),
(4, 4567890123, 4),
(5, 5678901234, 5),
(9, 5987856585, 35),
(10, 2658595458, 35),
(11, 5551234567, 36),
(12, 5557654321, 36),
(13, 9516577535, 37),
(14, 9516577535, 38),
(15, 9516577535, 39),
(16, 9516577535, 40),
(18, 9516577535, 42),
(19, 9514577858, 43),
(20, 4585585695, 43),
(21, 9514577858, 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `apellido_paterno` varchar(20) DEFAULT NULL,
  `apellido_materno` varchar(20) DEFAULT NULL,
  `domicilio` varchar(200) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido_paterno`, `apellido_materno`, `domicilio`, `email`) VALUES
(1, 'Juan', 'Pérez', 'García', 'Av. Siempre Viva 123', 'juan.perez@example.c'),
(2, 'Ana', 'López', 'Martínez', 'Calle Falsa 456', 'ana.lopez@example.co'),
(3, 'Luis', 'Ramírez', 'Hernández', 'Boulevard 789', 'luis.ramirez@example'),
(4, 'Marta', 'Gómez', 'Castro', 'Plaza Mayor 101', 'marta.gomez@example.'),
(5, 'Pedro', 'Sánchez', 'Morales', 'Calle Principal 202', 'pedro.sanchez@exampl'),
(35, 'prueba', 'para', 'pdf', 'ejemplo', 'ejemplo@pdf'),
(36, 'Juan', 'Pérez', 'García', 'Calle Falsa 123', 'juan.perez@example.c'),
(37, 'jose', 'maslow', 'maslow', 'eee', 'e@jemplo.com'),
(38, 'jose', 'maslow', 'maslow', 'eee', 'e@jemplo.com'),
(39, 'jose', 'maslow', 'maslow', 'eee', 'e@jemplo.com'),
(40, 'jose', 'maslow', 'maslow', 'eee', 'e@jemplo.com'),
(42, 'jose', 'maslow', 'maslow', 'eee', 'e@jemplo.com'),
(43, 'prueba', 'delk', 'pdf', 'qweretewe', 'a@a'),
(44, 'prueba', 'delk', 'pdf', 'qweretewe', 'a@a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

DROP TABLE IF EXISTS `equipo`;
CREATE TABLE `equipo` (
  `id_equipo` int(11) NOT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `serie` varchar(20) DEFAULT NULL,
  `modelo` varchar(20) DEFAULT NULL,
  `descripcion` varchar(140) DEFAULT NULL,
  `estado` enum('BUENO','REGULAR','MALO') DEFAULT NULL,
  `descripcion_agregado` varchar(200) NOT NULL,
  `id_tipo_equipo` int(11) DEFAULT NULL,
  `id_agregados` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id_equipo`, `marca`, `serie`, `modelo`, `descripcion`, `estado`, `descripcion_agregado`, `id_tipo_equipo`, `id_agregados`) VALUES
(1, 'HP', '1234', 'EliteBook', 'Computadora portátil', 'BUENO', 'cargador negro', 1, 1),
(2, 'Samsung', '5678', 'Galaxy S21', 'Teléfono inteligente', 'REGULAR', 'funda negra', 2, 2),
(3, 'Epson', '9101', 'L210', 'Impresora multifuncional', 'BUENO', 'mochila rota', 3, 3),
(4, 'Apple', '1122', 'iPad Pro', 'Tableta con pantalla Retina', 'MALO', 'cargador roto', 4, 1),
(5, 'Dell', '3344', 'UltraSharp', 'Monitor 24 pulgadas', 'BUENO', 'funda sin cierre', 5, 2),
(6, 'hp', '3600', 'a2w3', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las', 'REGULAR', 'mochila roja', 3, 3),
(7, 'Apple', 'ABC12345XYZ', 'iPhone 13', 'Pantalla dañada', '', 'Con protector de pantalla', 1, 2),
(8, '3qr3qr', '33qrr3q', '3r3rqq3', '3qr3qr3qr', 'BUENO', 'eeer3r3', 2, 1),
(9, '3qr3qr', '33qrr3q', '3r3rqq3', '3qr3qr3qr', '', 'eeer3r3', 3, 2),
(10, '3qr3qr', '33qrr3q', '3r3rqq3', '3qr3qr3qr', '', 'eeer3r3', 4, 3),
(11, '3qr3qr', '33qrr3q', '3r3rqq3', '3qr3qr3qr', 'REGULAR', 'eeer3r3', 3, 5),
(13, '3qr3qr', '33qrr3q', '3r3rqq3', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las', 'BUENO', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las', 3, 2),
(14, 'ddd', 'ddd', 'www', 'fewbnewowe', 'REGULAR', 'cargador marca samsung', 2, 1),
(15, 'ddd', 'ddd', 'www', 'fewbnewowe', '', 'cargador marca samsung', 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `id_servicio` int(11) NOT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `tiempo_entrega` int(2) DEFAULT NULL,
  `medida_tiempo` enum('DIAS','HORAS') DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `id_tipo_servicio` int(11) DEFAULT NULL,
  `id_trabajador` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id_servicio`, `observaciones`, `tiempo_entrega`, `medida_tiempo`, `id_cliente`, `id_equipo`, `id_tipo_servicio`, `id_trabajador`, `fecha`) VALUES
(1, 'Servicio de revisión general', 2, 'DIAS', 1, 1, 1, 1, '2024-10-27 01:16:39'),
(2, 'Formateo completo', 1, 'DIAS', 2, 2, 2, 1, '2024-10-27 01:16:39'),
(3, 'Instalación de software', 3, 'HORAS', 3, 3, 3, 1, '2024-10-27 01:16:39'),
(4, 'Limpieza interna', 1, 'DIAS', 4, 4, 4, 1, '2024-10-27 01:16:39'),
(5, 'Reparación de pantalla', 5, 'DIAS', 5, 5, 5, 1, '2024-10-27 01:16:39'),
(6, 'ejemplo', 3, 'DIAS', 35, 6, 4, 1, '2024-10-27 01:33:20'),
(7, 'Se requiere cambio de pantalla y revisión de batería', 2, 'DIAS', 36, 7, 3, 1, '2024-10-27 04:54:38'),
(8, '3qr3qr3qr', 4, 'HORAS', 37, 8, 2, 1, '2024-10-27 04:57:57'),
(9, 'wertge4wy4wt34wt', 4, 'DIAS', 38, 9, 2, 1, '2024-10-27 05:05:05'),
(10, 'wetgwrgwergwrg', 4, 'HORAS', 39, 10, 2, 1, '2024-10-27 05:10:20'),
(11, 'eeeeee', 4, 'HORAS', 40, 11, 4, 1, '2024-10-27 05:16:36'),
(12, 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las', 4, '', 42, 13, 3, 1, '2024-10-27 05:24:12'),
(13, 'ewewewewew', 3, 'DIAS', 43, 14, 4, 1, '2024-10-27 06:00:56'),
(14, 'ewti7ou6ur64ue64', 3, 'HORAS', 44, 15, 3, 1, '2024-10-27 06:11:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_equipo`
--

DROP TABLE IF EXISTS `tipos_equipo`;
CREATE TABLE `tipos_equipo` (
  `id_tipo_equipo` int(11) NOT NULL,
  `equipo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_equipo`
--

INSERT INTO `tipos_equipo` (`id_tipo_equipo`, `equipo`) VALUES
(1, 'Computadora'),
(2, 'Celular'),
(3, 'Impresora'),
(4, 'Tableta'),
(5, 'Monitor'),
(6, 'servidor'),
(8, 'router');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_servicio`
--

DROP TABLE IF EXISTS `tipos_servicio`;
CREATE TABLE `tipos_servicio` (
  `id_tipo_servicio` int(11) NOT NULL,
  `servicio` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_servicio`
--

INSERT INTO `tipos_servicio` (`id_tipo_servicio`, `servicio`) VALUES
(1, 'Revisión'),
(2, 'Formateo'),
(3, 'Inst software'),
(4, 'Limpieza'),
(5, 'Refacción'),
(6, 'testeos'),
(7, 'cambios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

DROP TABLE IF EXISTS `trabajadores`;
CREATE TABLE `trabajadores` (
  `id_trabajador` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `apellido_paterno` varchar(20) DEFAULT NULL,
  `apellido_materno` varchar(20) DEFAULT NULL,
  `id_jefe` int(11) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`id_trabajador`, `nombre`, `apellido_paterno`, `apellido_materno`, `id_jefe`, `user`, `password`) VALUES
(1, 'Enrique', 'Castellanos', 'Rodriguez', NULL, 'enriqueCR', '$2b$10$YKC5RV0g7KlZDJcqM/Sv/uZV3xH5L48kTCKc2.GK/pgVRBh7kWcz.'),
(11, 'Carlos', 'López', 'García', 1, 'carlosLG', '$2b$10$cG8ENjvGTA0USIyoL5tmVO3mGtWeHH6T5hyK2g4ywFUS.k8HfuFC6');

--
-- Disparadores `trabajadores`
--
DROP TRIGGER IF EXISTS `after_insert_trabajadores`;
DELIMITER $$
CREATE TRIGGER `after_insert_trabajadores` BEFORE INSERT ON `trabajadores` FOR EACH ROW BEGIN
    SET NEW.user = CONCAT(
        LOWER(NEW.nombre), 
        UPPER(LEFT(NEW.apellido_paterno, 1)), 
        UPPER(LEFT(NEW.apellido_materno, 1))
    );
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agregados`
--
ALTER TABLE `agregados`
  ADD PRIMARY KEY (`id_agregados`);

--
-- Indices de la tabla `celulares`
--
ALTER TABLE `celulares`
  ADD PRIMARY KEY (`id_celular`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `id_tipo_equipo` (`id_tipo_equipo`),
  ADD KEY `id_agregados` (`id_agregados`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id_servicio`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_equipo` (`id_equipo`),
  ADD KEY `id_tipo_servicio` (`id_tipo_servicio`),
  ADD KEY `id_trabajador` (`id_trabajador`);

--
-- Indices de la tabla `tipos_equipo`
--
ALTER TABLE `tipos_equipo`
  ADD PRIMARY KEY (`id_tipo_equipo`);

--
-- Indices de la tabla `tipos_servicio`
--
ALTER TABLE `tipos_servicio`
  ADD PRIMARY KEY (`id_tipo_servicio`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id_trabajador`),
  ADD KEY `id_jefe` (`id_jefe`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agregados`
--
ALTER TABLE `agregados`
  MODIFY `id_agregados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `celulares`
--
ALTER TABLE `celulares`
  MODIFY `id_celular` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tipos_equipo`
--
ALTER TABLE `tipos_equipo`
  MODIFY `id_tipo_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tipos_servicio`
--
ALTER TABLE `tipos_servicio`
  MODIFY `id_tipo_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id_trabajador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `celulares`
--
ALTER TABLE `celulares`
  ADD CONSTRAINT `celulares_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipos_equipo` (`id_tipo_equipo`),
  ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`id_agregados`) REFERENCES `agregados` (`id_agregados`);

--
-- Filtros para la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`),
  ADD CONSTRAINT `servicio_ibfk_3` FOREIGN KEY (`id_tipo_servicio`) REFERENCES `tipos_servicio` (`id_tipo_servicio`),
  ADD CONSTRAINT `servicio_ibfk_4` FOREIGN KEY (`id_trabajador`) REFERENCES `trabajadores` (`id_trabajador`);

--
-- Filtros para la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD CONSTRAINT `trabajadores_ibfk_1` FOREIGN KEY (`id_jefe`) REFERENCES `trabajadores` (`id_trabajador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
