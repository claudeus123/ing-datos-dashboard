"""
select id_boleta, id_producto, sum(precio_producto) as total,
count(*) as ventas FROM boleta_producto 
group by id_boleta, id_producto
"""
# 1/2 optimization
import os
import csv
import psycopg2
from psycopg2 import sql, extras
import time

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'anashe123',
    'host': 'localhost', 
    'port': '5432' 
}
tiempo_inicio = time.time()

data_to_insert = []
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    consulta_sql = """
        select id_boleta, id_producto, sum(precio_producto) as total,
        count(*) as ventas FROM boleta_producto 
        group by id_boleta, id_producto
    """
    cursor.execute(consulta_sql)
    resultados = cursor.fetchall()
    data_to_insert = []
    for resultado in resultados:
        id_boleta, id_producto, total, ventas = resultado
        precio_unitario = total / ventas
        data_to_insert.append([id_boleta, id_producto, ventas, precio_unitario, total])

    print ("DATOS OBTENIDOS")
    
    query = sql.SQL("INSERT INTO fact_ventas (id_boleta, id_producto, cantidad, precio_unitario, precio_total) VALUES %s")
    extras.execute_values(cursor, query, data_to_insert)
    print("DATOS SUBIDOS")
    conn.commit()

except psycopg2.Error as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    if conn is not None:
        conn.close()
        print("Conexión cerrada.")
    tiempo_fin = time.time()

    tiempo_ejecucion = tiempo_fin - tiempo_inicio
    print(tiempo_ejecucion)
