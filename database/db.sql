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
    nombre VARCHAR(50) NOT NULL UNIQUE,
    precio_venta float(11,2) NOT NULL,
    stock INT NOT NULL,
    descripcion VARCHAR(256) NULL,
    FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria)
);
CREATE TABLE persona(
    idpersona INT AUTO_INCREMENT PRIMARY KEY,
    tipo_persona VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    email VARCHAR(20) NOT NULL
);
CREATE TABLE rol(
    idrol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(30) NULL
);
CREATE TABLE usuario(
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    idrol INT NOT NULL,
    idpersona INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password varchar(60) NOT NULL,
    FOREIGN KEY (idrol) REFERENCES rol(idrol),
    FOREIGN KEY (idpersona) REFERENCES persona(idpersona)
);
CREATE TABLE ingreso(
	idingreso INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    impuesto float(4,2),
    total float(11,2),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
CREATE TABLE detalle_ingreso(
	iddetalle_ingreso INT AUTO_INCREMENT PRIMARY KEY,
    idingreso INT NOT NULL,
    idproducto INT NOT NULL,
    cantidad INT NOT NULL,
    precio float(11,2),
    FOREIGN KEY (idingreso) REFERENCES ingreso (idingreso) ON DELETE CASCADE,
    FOREIGN KEY (idproducto) REFERENCES productos (idproducto)
);
CREATE TABLE venta(
	idventa INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    impuesto float(4,2),
    total float(11,2),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
CREATE TABLE detalle_venta(
	iddetalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    idventa INT NOT NULL,
    idproducto INT NOT NULL,
    cantidad INT NOT NULL,
    precio float(11,2),
    FOREIGN KEY (idventa) REFERENCES venta(idventa) ON DELETE CASCADE,
    FOREIGN KEY (idproducto) REFERENCES productos (idproducto)
);