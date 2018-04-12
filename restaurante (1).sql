-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2018 a las 16:48:00
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(19, 'Aqui va numFactura', '2018-04-11 08:41:37', 57000, 10830, 2, 37, ''),
(20, 'Aqui va numFactura', '2018-04-11 08:41:42', 84500, 16055, 2, 38, ''),
(21, 'Aqui va numFactura', '2018-04-11 08:41:46', 78500, 14915, 2, 39, ''),
(22, 'Aqui va numFactura', '2018-04-11 08:44:55', 43000, 8170, 2, 40, '');

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
(37, '2018-04-11 08:38:59', 1, 8, 6),
(38, '2018-04-11 08:39:33', 2, 1, 6),
(39, '2018-04-11 08:40:05', 3, 6, 6),
(40, '2018-04-11 08:44:15', 1, 6, 6);

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
(37, 1, 3, 30000, 6, 41),
(37, 3, 3, 6000, 6, 42),
(37, 5, 3, 6000, 6, 43),
(37, 6, 5, 15000, 6, 44),
(38, 2, 6, 18000, 6, 45),
(38, 7, 5, 22500, 6, 46),
(38, 8, 6, 24000, 6, 47),
(38, 9, 5, 20000, 6, 48),
(39, 4, 6, 48000, 6, 49),
(39, 10, 6, 18000, 6, 50),
(39, 11, 5, 12500, 6, 51),
(40, 1, 3, 30000, 6, 52),
(40, 6, 1, 3000, 6, 53),
(40, 1, 1, 10000, 6, 54);

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
  `nombre` varchar(50) NOT NULL,
  `contrasenia` varchar(50) NOT NULL,
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
(8, 'juan', 'juan2', 5),
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
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
  MODIFY `idFactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;