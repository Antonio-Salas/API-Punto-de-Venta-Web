DROP DATABASE bddatos_apipuntow;
CREATE DATABASE bddatos_apipuntow;

USE bddatos_apipuntow;
CREATE TABLE categoria (
    idcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(256) NOT NULL UNIQUE,
    descripcion VARCHAR(256) NULL  
);
INSERT INTO categoria (nombre, descripcion) VALUES ('Cereal','');
SELECT * FROM categoria;

CREATE TABLE productos(
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria INT NOT NULL,
    codigo VARCHAR(50) NULL,
    nombre VARCHAR(50)  NULL,
    precio_venta float(11,2) NULL,
    stock INT NULL,
    descripcion VARCHAR(256) NULL,
    FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria)
);
CREATE TABLE persona(
    idpersona INT AUTO_INCREMENT PRIMARY KEY,
    genero_persona ENUM('Hombre','Mujer','Otro') NULL,
    nombre VARCHAR(50) NULL,
    direccion VARCHAR(100) NULL,
    telefono VARCHAR(10) NULL
);

CREATE TABLE usuario(
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    idpersona INT NULL UNIQUE,
    rol ENUM('Cliente', 'Administrador'),
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password varchar(60) NOT NULL,
    FOREIGN KEY (idpersona) REFERENCES persona(idpersona) ON DELETE CASCADE
);
CREATE TABLE venta(
	idventa INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    impuesto float(4,2),
    total float(11,2),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
CREATE TABLE detalle_venta(
	iddetalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    idventa INT NULL,
    idproducto INT NULL,
    cantidad INT NOT NULL,
    precio float(11,2),
    FOREIGN KEY (idventa) REFERENCES venta(idventa) ON DELETE CASCADE,
    FOREIGN KEY (idproducto) REFERENCES productos (idproducto)
);