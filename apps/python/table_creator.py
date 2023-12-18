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
sentencia_sql = """
    DROP TABLE IF EXISTS facturas CASCADE;
    DROP TABLE IF EXISTS proveedores CASCADE;
    DROP TABLE IF EXISTS productos CASCADE;

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

    CREATE TABLE IF NOT EXISTS facturas (
        id serial PRIMARY KEY,
        año INTEGER,
        mes TEXT,
        dia INTEGER,
        id_proveedor TEXT REFERENCES proveedores (id_proveedor),
        id_producto TEXT REFERENCES productos (identificador),
        cantidad INTEGER,
        precio_unitario FLOAT,
        precio_total FLOAT
    );
"""

# Ejecutar la sentencia SQL
cursor.execute(sentencia_sql)

# Confirmar los cambios en la base de datos
conexion.commit()

# Cerrar la conexión y el cursor
cursor.close()
conexion.close()