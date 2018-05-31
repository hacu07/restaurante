-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2018 a las 13:50:38
-- Versión del servidor: 10.1.22-MariaDB
-- Versión de PHP: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizarEstados` (IN `idePedido` INT, IN `ideEstado` INT, IN `numeroProd` INT)  BEGIN
	UPDATE productopedido SET idEstado = ideEstado WHERE numero = numeroProd;
	UPDATE pedidos SET idEstado = (SELECT MIN(idEstado) AS estadoMinimo FROM productopedido WHERE idPedido = idePedido) WHERE idPedido = idePedido;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_nombresCategorias` (IN `nombreABuscar` VARCHAR(30))  BEGIN 
	
	SELECT @existe := COUNT(nombre) AS existen FROM categoria WHERE nombre LIKE nombreABuscar;
    
    IF @existe = 0 THEN 
    
    INSERT INTO categoria(nombre) values (nombreABuscar);
    
   END IF;
    
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrarFactura` (IN `idePedido` INT, IN `ideCajero` INT, IN `valFac` INT, IN `ivaFac` INT, IN `cc` VARCHAR(30))  BEGIN
	INSERT INTO factura(numFactura,fechaFactura,valorFactura,ivaFactura,idCajero,idPedido,ccCliente) VALUES('Aqui va numFactura',NOW(),valFac,ivaFac,ideCajero,	idePedido, cc);
    UPDATE pedidos SET idEstado = 6 WHERE idPedido = idePedido;
    update mesa set idEstado = 1 where numMesa like (select numMesa from pedidos WHERE idPedido = idePedido);
    update productopedido set idEstado = 6 where idPedido = idePedido;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registrarNuevoPedido` (IN `numeroMesa` INT, IN `ideMesero` INT)  begin 
	INSERT INTO pedidos(numMesa,fechaPedido,idMesero,idEstado) VALUES (numeromesa,NOW(),ideMesero,1);
    UPDATE mesa SET idEstado = 2 WHERE numMesa = numeroMesa;
    SELECT MAX(idPedido) AS idPedido FROM pedidos WHERE idMesero = ideMesero AND idEstado = 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`) VALUES
(1, 'Platos'),
(2, 'Bebidas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadomesa`
--

CREATE TABLE `estadomesa` (
  `idEstado` int(11) NOT NULL,
  `estado` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadomesa`
--

INSERT INTO `estadomesa` (`idEstado`, `estado`) VALUES
(1, 'disponible'),
(2, 'no disponible'),
(3, 'reservada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadopedido`
--

CREATE TABLE `estadopedido` (
  `idEstado` int(11) NOT NULL,
  `estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadopedido`
--

INSERT INTO `estadopedido` (`idEstado`, `estado`) VALUES
(1, 'Ordenando'),
(2, 'En Espera'),
(3, 'Preparando'),
(4, 'Preparado'),
(5, 'Entregado'),
(6, 'Facturado'),
(7, 'Recibido'),
(8, 'Recibido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(11) NOT NULL,
  `numFactura` varchar(30) NOT NULL,
  `fechaFactura` datetime NOT NULL,
  `valorFactura` double NOT NULL,
  `ivaFactura` double NOT NULL,
  `idCajero` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `ccCliente` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `numFactura`, `fechaFactura`, `valorFactura`, `ivaFactura`, `idCajero`, `idPedido`, `ccCliente`) VALUES
(4, 'Aqui va numFactura', '2018-03-11 14:45:27', 110000, 20900, 2, 1, '34534534'),
(5, 'Aqui va numFactura', '2018-03-11 14:48:14', 110000, 20900, 2, 1, ''),
(6, 'Aqui va numFactura', '2018-03-28 16:52:19', 15000, 2850, 2, 31, '67576465'),
(7, 'Aqui va numFactura', '2018-04-18 06:16:50', 10000, 1900, 2, 30, '3285694'),
(8, 'Aqui va numFactura', '2018-04-18 06:17:20', 74000, 14060, 2, 2, ''),
(9, 'Aqui va numFactura', '2018-05-02 10:25:18', 20000, 3800, 2, 32, '23856793485'),
(10, 'Aqui va numFactura', '2018-05-11 10:34:57', 33000, 6270, 2, 33, '389534'),
(11, 'Aqui va numFactura', '2018-05-11 10:35:41', 12000, 2280, 2, 34, '3853794'),
(12, 'Aqui va numFactura', '2018-05-12 07:35:47', 53000, 10070, 2, 29, '1234567'),
(13, 'Aqui va numFactura', '2018-05-12 07:37:53', 10000, 1900, 2, 39, '123456789'),
(14, 'Aqui va numFactura', '2018-05-12 07:39:52', 28000, 5320, 2, 4, '4567'),
(15, 'Aqui va numFactura', '2018-05-12 07:39:57', 2000, 380, 2, 35, ''),
(16, 'Aqui va numFactura', '2018-05-12 07:40:03', 10000, 1900, 2, 36, ''),
(17, 'Aqui va numFactura', '2018-05-12 07:40:09', 6000, 1140, 2, 37, ''),
(18, 'Aqui va numFactura', '2018-05-12 07:40:15', 51500, 9785, 2, 38, ''),
(19, 'Aqui va numFactura', '2018-05-12 07:40:51', 57000, 10830, 2, 7, ''),
(20, 'Aqui va numFactura', '2018-05-12 08:06:39', 36000, 6840, 2, 41, '12345'),
(21, 'Aqui va numFactura', '2018-05-12 08:31:21', 1385000, 263150, 2, 6, '123456'),
(22, 'Aqui va numFactura', '2018-05-12 08:31:50', 13000, 2470, 2, 40, '123456'),
(23, 'Aqui va numFactura', '2018-05-12 08:33:11', 64000, 12160, 2, 42, '1234567'),
(24, 'Aqui va numFactura', '2018-05-12 08:33:18', 5000, 950, 2, 44, ''),
(25, 'Aqui va numFactura', '2018-05-12 08:33:30', 340000, 64600, 2, 46, ''),
(26, 'Aqui va numFactura', '2018-05-12 08:33:34', 2000, 380, 2, 47, ''),
(27, 'Aqui va numFactura', '2018-05-12 08:38:31', 28000, 5320, 2, 49, '123456'),
(28, 'Aqui va numFactura', '2018-05-21 06:46:34', 3000, 570, 2, 51, ''),
(29, 'Aqui va numFactura', '2018-05-21 06:48:19', 22000, 4180, 2, 43, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `numMesa` int(11) NOT NULL,
  `idEstado` int(11) DEFAULT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mesa`
--

INSERT INTO `mesa` (`numMesa`, `idEstado`, `capacidad`) VALUES
(1, 1, 4),
(2, 1, 8),
(3, 1, 10),
(4, 1, 4),
(5, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `fechaPedido` datetime NOT NULL,
  `numMesa` int(11) NOT NULL,
  `idMesero` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `fechaPedido`, `numMesa`, `idMesero`, `idEstado`) VALUES
(1, '2018-02-05 08:43:51', 1, 1, 6),
(2, '2018-02-15 10:29:09', 4, 6, 6),
(3, '2018-02-15 10:29:09', 3, 7, 5),
(4, '2018-02-15 10:29:09', 2, 8, 6),
(5, '2018-02-15 10:29:09', 1, 9, 2),
(6, '2018-02-15 10:29:09', 5, 6, 6),
(7, '2018-02-15 10:29:09', 4, 8, 6),
(29, '2018-03-04 17:08:52', 1, 6, 6),
(30, '2018-03-11 14:23:50', 2, 6, 6),
(31, '2018-03-28 16:50:41', 1, 6, 6),
(32, '2018-05-02 10:23:51', 2, 6, 6),
(33, '2018-05-11 10:13:33', 2, 6, 6),
(34, '2018-05-11 10:31:33', 4, 6, 6),
(35, '2018-05-11 10:35:57', 2, 8, 6),
(36, '2018-05-11 10:36:10', 1, 8, 6),
(37, '2018-05-11 11:08:17', 3, 8, 6),
(38, '2018-05-11 11:08:27', 5, 8, 6),
(39, '2018-05-12 07:37:00', 1, 6, 6),
(40, '2018-05-12 07:49:18', 1, 8, 6),
(41, '2018-05-12 08:04:03', 2, 6, 6),
(42, '2018-05-12 08:22:25', 3, 6, 6),
(43, '2018-05-12 08:22:26', 2, 6, 6),
(44, '2018-05-12 08:22:43', 5, 6, 6),
(45, '2018-05-12 08:22:44', 4, 6, 5),
(46, '2018-05-12 08:31:25', 5, 8, 5),
(47, '2018-05-12 08:32:04', 1, 6, 6),
(48, '2018-05-12 08:33:30', 3, 6, 1),
(49, '2018-05-12 08:34:16', 5, 8, 6),
(50, '2018-05-12 08:34:31', 1, 6, 1),
(51, '2018-05-12 08:38:37', 5, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `Precio` double DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `Precio`, `nombre`, `idCategoria`) VALUES
(1, 10000, 'carne asada', 1),
(2, 3000, 'sopa de verduras', 1),
(3, 2000, 'jugos naturales', 2),
(4, 8000, 'bandeja paisa', 1),
(5, 2000, 'cerveza', 2),
(6, 3000, 'limonada Natural', 2),
(7, 4500, 'limonada de coco', 2),
(8, 4000, 'Cerezada', 2),
(9, 4000, 'Gaseosa', 2),
(10, 3000, 'Jugo del valle', 2),
(11, 2500, 'jugo hit', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productopedido`
--

CREATE TABLE `productopedido` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `valor` double NOT NULL,
  `idEstado` int(11) NOT NULL,
  `numero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productopedido`
--

INSERT INTO `productopedido` (`idPedido`, `idProducto`, `cantidad`, `valor`, `idEstado`, `numero`) VALUES
(1, 1, 4, 40000, 5, 1),
(1, 1, 6, 60000, 5, 2),
(1, 3, 5, 10000, 5, 3),
(3, 4, 2, 16000, 5, 4),
(3, 1, 2, 20000, 5, 5),
(3, 3, 2, 4000, 5, 6),
(3, 2, 2, 6000, 5, 7),
(2, 1, 4, 40000, 6, 8),
(2, 5, 2, 10000, 6, 9),
(2, 3, 4, 8000, 6, 10),
(2, 2, 1, 4000, 6, 11),
(4, 4, 1, 8000, 6, 12),
(4, 2, 2, 6000, 6, 13),
(4, 3, 2, 4000, 6, 14),
(4, 5, 5, 10000, 6, 15),
(2, 5, 2, 4000, 6, 16),
(29, 1, 3, 30000, 6, 17),
(29, 4, 1, 8000, 6, 18),
(29, 6, 4, 12000, 6, 19),
(29, 2, 1, 3000, 6, 20),
(2, 9, 2, 8000, 6, 21),
(6, 7, 2, 9000, 6, 22),
(30, 1, 1, 10000, 6, 23),
(31, 2, 5, 15000, 6, 24),
(32, 1, 2, 20000, 6, 25),
(33, 1, 3, 30000, 6, 26),
(33, 6, 1, 3000, 6, 27),
(7, 1, 2, 20000, 6, 28),
(7, 7, 1, 4500, 6, 29),
(34, 6, 2, 6000, 6, 30),
(7, 3, 1, 2000, 6, 31),
(7, 7, 1, 4500, 6, 32),
(7, 6, 1, 3000, 6, 33),
(7, 2, 1, 3000, 6, 34),
(7, 1, 1, 10000, 6, 35),
(7, 3, 1, 2000, 6, 36),
(7, 4, 1, 8000, 6, 37),
(34, 6, 2, 6000, 6, 38),
(35, 3, 1, 2000, 6, 39),
(36, 1, 1, 10000, 6, 40),
(37, 2, 1, 3000, 6, 41),
(37, 6, 1, 3000, 6, 42),
(38, 6, 1, 3000, 6, 43),
(38, 1, 1, 10000, 6, 44),
(38, 1, 1, 10000, 6, 45),
(38, 4, 1, 8000, 6, 46),
(38, 7, 1, 4500, 6, 47),
(38, 5, 1, 2000, 6, 48),
(38, 8, 1, 4000, 6, 49),
(38, 1, 1, 10000, 6, 50),
(6, 1, 1, 10000, 6, 51),
(6, 3, 1, 2000, 6, 52),
(39, 1, 1, 10000, 6, 53),
(40, 1, 1, 10000, 6, 54),
(41, 1, 3, 30000, 6, 55),
(41, 5, 3, 6000, 6, 56),
(42, 4, 4, 32000, 6, 57),
(42, 4, 4, 32000, 6, 58),
(44, 5, 1, 2000, 6, 59),
(45, 3, 2, 4000, 5, 60),
(6, 3, 108, 216000, 6, 61),
(40, 2, 1, 3000, 6, 62),
(6, 5, 1, 2000, 6, 63),
(6, 5, 500, 1000000, 6, 64),
(6, 5, 30, 60000, 6, 65),
(6, 1, 1, 10000, 6, 66),
(6, 2, 10, 30000, 6, 67),
(6, 2, 10, 30000, 6, 68),
(6, 2, 2, 6000, 6, 69),
(6, 2, 2, 6000, 6, 70),
(6, 8, 1, 4000, 6, 71),
(44, 2, 1, 3000, 6, 72),
(43, 8, 1, 4000, 6, 73),
(43, 8, 1, 4000, 6, 74),
(43, 8, 1, 4000, 6, 75),
(6, 10, 1, 3000, 6, 76),
(46, 1, 34, 340000, 6, 77),
(47, 5, 1, 2000, 6, 78),
(43, 1, 1, 10000, 6, 79),
(46, 7, 2, 9000, 5, 80),
(46, 7, 2, 9000, 5, 81),
(46, 7, 2, 9000, 5, 82),
(49, 4, 3, 24000, 6, 83),
(49, 5, 2, 4000, 6, 84),
(46, 5, 3, 6000, 5, 85),
(51, 2, 1, 3000, 6, 86);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombre`) VALUES
(1, 'super administrador'),
(2, 'administrador '),
(3, 'jefe de cocina '),
(4, 'cajero'),
(5, 'mesero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `contrasenia` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `contrasenia`, `idRol`) VALUES
(1, 'Fabio', 'fabio12', 5),
(2, 'lucia', 'lucia15', 4),
(3, 'oscar', 'oscar23', 3),
(4, 'harold', 'hacu12', 1),
(5, 'eduardo', 'eduardo9', 2),
(6, 'Paula', 'paula12', 5),
(7, 'lucia', 'lucia1', 5),
(8, 'juan', 'juan001', 5),
(9, 'lina', 'lina3', 5),
(10, 'luis', 'luis2', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `estadomesa`
--
ALTER TABLE `estadomesa`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `estadopedido`
--
ALTER TABLE `estadopedido`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD KEY `idCajero` (`idCajero`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`numMesa`),
  ADD KEY `idEstado` (`idEstado`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `numMesa` (`numMesa`),
  ADD KEY `idMesero` (`idMesero`),
  ADD KEY `idEstado` (`idEstado`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idEstado` (`idEstado`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `estadomesa`
--
ALTER TABLE `estadomesa`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `estadopedido`
--
ALTER TABLE `estadopedido`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`idCajero`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`);

--
-- Filtros para la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD CONSTRAINT `mesa_ibfk_1` FOREIGN KEY (`idEstado`) REFERENCES `estadomesa` (`idEstado`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`numMesa`) REFERENCES `mesa` (`numMesa`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`idMesero`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`idEstado`) REFERENCES `estadopedido` (`idEstado`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD CONSTRAINT `productopedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`),
  ADD CONSTRAINT `productopedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`),
  ADD CONSTRAINT `productopedido_ibfk_3` FOREIGN KEY (`idEstado`) REFERENCES `estadopedido` (`idEstado`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
