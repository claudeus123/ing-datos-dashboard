CREATE TABLE proveedores (
    id VARCHAR(200) PRIMARY KEY,
    proveedor VARCHAR(MAX),
    contacto_comercial VARCHAR(MAX),
    email VARCHAR(MAX),
    telefono VARCHAR(MAX)
);

CREATE TABLE productos (
    identificador VARCHAR(200) PRIMARY KEY,
    categoria VARCHAR(MAX),
    subcategoria VARCHAR(MAX),
    nombre VARCHAR(MAX)
);

CREATE TABLE tiempo (
    id INT PRIMARY KEY IDENTITY(1,1),
    año INT,
    mes VARCHAR(MAX),
    dia INT
);

CREATE TABLE facturas (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_tiempo INT FOREIGN KEY REFERENCES tiempo(id),
    id_proveedor VARCHAR(200) FOREIGN KEY REFERENCES proveedores(id),
    id_producto VARCHAR(200) FOREIGN KEY REFERENCES productos(identificador),
    cantidad INT,
    precio_unitario FLOAT,
    precio_total FLOAT
);

CREATE TABLE boletas (
    id VARCHAR(200) PRIMARY KEY,
    id_tiempo INT FOREIGN KEY REFERENCES tiempo(id)
);

CREATE TABLE fact_ventas (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_boleta VARCHAR(200) FOREIGN KEY REFERENCES boletas(id),
    id_producto VARCHAR(200) FOREIGN KEY REFERENCES productos(identificador),
    cantidad INT,
    precio_unitario FLOAT,
    precio_total FLOAT
);