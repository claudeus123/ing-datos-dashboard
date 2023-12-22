import psycopg2
from psycopg2 import sql

# Configuración de la conexión a la base de datos
conexion = psycopg2.connect(
    host="localhost",
    user="postgres",
    password="anashe123",
    database="ingdatos"
)

# Crear un objeto cursor para ejecutar comandos SQL
cursor = conexion.cursor()

# Definir la sentencia SQL para crear la tabla (sustituye con tus propios campos y tipos de datos)
    # DROP TABLE IF EXISTS facturas CASCADE;
    # DROP TABLE IF EXISTS proveedores CASCADE;
    # DROP TABLE IF EXISTS productos CASCADE;
    # DROP TABLE IF EXISTS tiempo CASCADE;
    # DROP TABLE IF EXISTS boletas CASCADE;
sentencia_sql = """
    DROP TABLE IF EXISTS stock CASCADE;
    CREATE TABLE IF NOT EXISTS proveedores (
        id_proveedor TEXT PRIMARY KEY,
        proveedor TEXT,
        contacto_comercial TEXT,
        email TEXT,
        telefono TEXT
    );

    CREATE TABLE IF NOT EXISTS productos (
        identificador TEXT PRIMARY KEY,
        categoria TEXT,
        subcategoria TEXT,
        nombre TEXT
    );

    CREATE TABLE IF NOT EXISTS tiempo (
        id serial PRIMARY KEY,
        año INTEGER,
        mes TEXT,
        dia INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS facturas (
        id serial PRIMARY KEY,
        id_tiempo INTEGER REFERENCES tiempo (id),
        id_proveedor TEXT REFERENCES proveedores (id_proveedor),
        id_producto TEXT REFERENCES productos (identificador),
        cantidad INTEGER,
        precio_unitario FLOAT,
        precio_total FLOAT
    );

    CREATE TABLE IF NOT EXISTS boletas (
        id text PRIMARY KEY,
        id_tiempo INTEGER REFERENCES tiempo (id)
    );

    CREATE TABLE IF NOT EXISTS boleta_producto (
        id serial PRIMARY KEY,
        id_boleta TEXT REFERENCES boletas (id),
        id_producto TEXT REFERENCES productos (identificador),
        precio_producto FLOAT
    );

    CREATE TABLE IF NOT EXISTS fact_ventas (
        id serial PRIMARY KEY,
        id_boleta TEXT REFERENCES boletas (id),
        id_producto TEXT REFERENCES productos (identificador),
        cantidad INTEGER,
        precio_unitario FLOAT,
        precio_total FLOAT
    );

    CREATE TABLE IF NOT EXISTS stock (
        id serial PRIMARY KEY,
        id_producto TEXT REFERENCES productos (identificador),
        id_tiempo INTEGER REFERENCES tiempo (id),
        cantidad INTEGER
    );
    

"""
    # CREATE INDEX ON facturas (año);

# Ejecutar la sentencia SQL
cursor.execute(sentencia_sql)

# Confirmar los cambios en la base de datos
conexion.commit()

# Cerrar la conexión y el cursor
cursor.close()
conexion.close()