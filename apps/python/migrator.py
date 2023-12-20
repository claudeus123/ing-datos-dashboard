import pyodbc
import psycopg2
from psycopg2 import sql
import time

def migrate(pg_connection, sql_server_connection, select_query, insert_query):
    cursor = pg_connection.cursor()
    cursor.execute(select_query)
    resultados = cursor.fetchall()
    data_to_insert = []
    for resultado in resultados:
        data_to_insert.append(resultado)
    print (select_query)

    cursor_sql = sql_server_connection.cursor()
    cursor_sql.executemany(insert_query, data_to_insert)

    sql_server_connection.commit()
    conn.commit()
    print("DATOS SUBIDOS")


# Configuración de la base de datos PostgreSQL
pg_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'anashe123',
    'host': 'localhost', 
    'port': '5432' 
}

# connection_string = f'DRIVER={{SQL Server}};SERVER=ASUS-FX517ZM\SQLEXPRES";DATABASE=ing_datos;UID=sa;PWD=deus'
connection_string = f'DRIVER={{SQL Server}};SERVER=ASUS-FX517ZM\\SQLEXPRESS;DATABASE=ing_datos;UID=sa;PWD=deus'

tiempo_inicio = time.time()

try:
    conn = psycopg2.connect(**pg_config)
    sql_server_connection = pyodbc.connect(connection_string)

    # consulta_sql = """
    #     select * from proveedores
    # """
    # sql_query = 'INSERT INTO proveedores (id, proveedor, contacto_comercial, email, telefono) VALUES (?, ?, ?, ?, ?)'
    # migrate(conn, sql_server_connection, consulta_sql, sql_query)

    # consulta_sql = """
    #     select * from productos
    # """
    # sql_query = 'INSERT INTO productos (identificador, categoria, subcategoria, nombre) VALUES (?, ?, ?, ?)'
    # migrate(conn, sql_server_connection, consulta_sql, sql_query)

    # consulta_sql = """
    #     select año, mes, dia from tiempo
    # """
    # sql_query = 'INSERT INTO tiempo (año, mes, dia) VALUES (?, ?, ?)'
    # migrate(conn, sql_server_connection, consulta_sql, sql_query)

    # consulta_sql = """
    #     select id_tiempo, id_proveedor, id_producto, cantidad, precio_unitario, precio_total from facturas
    # """
    # sql_query = 'INSERT INTO facturas (id_tiempo, id_proveedor, id_producto, cantidad, precio_unitario, precio_total) VALUES (?, ?, ?, ?, ?, ?)'
    # migrate(conn, sql_server_connection, consulta_sql, sql_query)

    # consulta_sql = """
    #     select id, id_tiempo from boletas
    # """
    # sql_query = 'INSERT INTO boletas (id, id_tiempo) VALUES (?, ?)'
    # migrate(conn, sql_server_connection, consulta_sql, sql_query)

    consulta_sql = """
        select id_boleta, id_producto, cantidad, precio_unitario, precio_total from fact_ventas
    """
    sql_query = 'INSERT INTO fact_ventas (id_boleta, id_producto, cantidad, precio_unitario, precio_total) VALUES (?, ?, ?, ?, ?)'
    migrate(conn, sql_server_connection, consulta_sql, sql_query)

except psycopg2.Error as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    if conn is not None:
        conn.close()
        print("Conexión cerrada.")
    tiempo_fin = time.time()

    tiempo_ejecucion = tiempo_fin - tiempo_inicio
    print(tiempo_ejecucion)
