-- Base de datos: `mascotas`
CREATE DATABASE mascotas;
USE mascotas;
--
CREATE TABLE criaderos (
  codCriadero int(11) NOT NULL,
  nombreCriadero varchar(30) NOT NULL,
  localizacion varchar(30) DEFAULT NULL,
  PRIMARY KEY (codCriadero)
);

-- Volcado de datos para la tabla `criaderos`
INSERT INTO criaderos (codCriadero, nombreCriadero, localizacion) VALUES
(1, 'La Mascota', 'Bogota'),
(2, 'Kennel', 'Bogota'),
(3, 'Los Pinchos', 'Ibague'),
(4, 'Las Chivas', 'Espinal');

-- Estructura de tabla para la tabla `mascotas`
CREATE TABLE mascotas (
  codMascota int(11) NOT NULL,
  nombreMascota varchar(30) NOT NULL,
  codCriadero int(11) NOT NULL,
  propietario varchar(40),
  PRIMARY KEY (codMascota),
  FOREIGN KEY (codCriadero) REFERENCES criaderos(codCriadero)
);

-- Volcado de datos para la tabla `mascotas`
INSERT INTO mascotas (codMascota, nombreMascota, codCriadero, propietario) VALUES
(1, 'Pepito', 1, 'Antonio Ortiz'),
(2, 'Kike', 2, 'Gabriel Camargo'),
(3, 'Cuquita', 4, 'Juliana Díaz'),
(4, 'Asaka', 2, 'Juliana Díaz'),
(5, 'Sombra', 4, 'Antonio Ortiz'),
(6, 'Blacky', 2, 'Pepito Cardozo');
