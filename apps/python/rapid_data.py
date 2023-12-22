# id_tiempo > 6205

import psycopg2
from psycopg2 import sql, extras

def rapid_insert(select_query, insert_query, cursor, conn ):
    cursor.execute(select_query)
    resultados = cursor.fetchall()
    data_to_insert = []
    for resultado in resultados:
        data_to_insert.append(resultado)

    print (select_query)
    
    query = sql.SQL(insert_query)
    extras.execute_values(cursor, query, data_to_insert)
    print("DATOS SUBIDOS")
    conn.commit()

create_sql = """
    CREATE TABLE IF NOT EXISTS rapid_facturas (
        id serial PRIMARY KEY,
        id_tiempo INTEGER REFERENCES tiempo (id),
        id_proveedor TEXT REFERENCES proveedores (id_proveedor),
        id_producto TEXT REFERENCES productos (identificador),
        cantidad INTEGER,
        precio_unitario FLOAT,
        precio_total FLOAT
    );

    CREATE TABLE IF NOT EXISTS rapid_boletas (
        id text PRIMARY KEY,
        id_tiempo INTEGER REFERENCES tiempo (id)
    );

    CREATE TABLE IF NOT EXISTS rapid_stock (
        id serial PRIMARY KEY,
        id_producto TEXT REFERENCES productos (identificador),
        id_tiempo INTEGER REFERENCES tiempo (id),
        cantidad INTEGER
    );

    CREATE TABLE IF NOT EXISTS rapid_boleta_productos (
        id serial PRIMARY KEY,
        id_boleta TEXT REFERENCES rapid_boletas (id),
        id_producto TEXT REFERENCES productos (identificador),
        precio_producto FLOAT
    );
"""

conexion = psycopg2.connect(
    host="localhost",
    user="postgres",
    password="anashe123",
    database="ingdatos"
)

# Crear un objeto cursor para ejecutar comandos SQL
cursor = conexion.cursor()
cursor.execute(create_sql)
conexion.commit()

consulta_sql = """
    select id_tiempo, id_proveedor, id_producto, cantidad, precio_unitario, precio_total from facturas WHERE id_tiempo > 6205
"""
sql_query = 'INSERT INTO rapid_facturas (id_tiempo, id_proveedor, id_producto, cantidad, precio_unitario, precio_total) VALUES %s'
rapid_insert(consulta_sql, sql_query, cursor, conexion)

consulta_sql = """
    select id, id_tiempo from boletas WHERE id_tiempo > 6205
"""
sql_query = 'INSERT INTO rapid_boletas (id, id_tiempo) VALUES %s'
rapid_insert(consulta_sql, sql_query, cursor, conexion)

consulta_sql = """
    select id_producto, id_tiempo, cantidad from stock WHERE id_tiempo > 6205
"""
sql_query = 'INSERT INTO rapid_stock (id_producto, id_tiempo, cantidad) VALUES %s'
rapid_insert(consulta_sql, sql_query, cursor, conexion)


consulta_sql = """
    select id_boleta, id_producto, precio_producto from boleta_producto WHERE id_boleta in (select id from boletas WHERE id_tiempo > 6205)
"""
sql_query = 'INSERT INTO rapid_boleta_productos (id_boleta, id_producto, precio_producto) VALUES %s'
rapid_insert(consulta_sql, sql_query, cursor, conexion)

# Cerrar la conexión y el cursor
cursor.close()
conexion.close()