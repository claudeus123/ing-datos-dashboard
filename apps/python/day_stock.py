import os
import csv
import psycopg2
from psycopg2 import sql, extras
import time

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'asd123',
    'host': 'localhost', 
    'port': '5433' 
}
tiempo_inicio = time.time()

data_to_insert = []
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    consulta_sql = "select id_tiempo, id_producto, sum(precio_total) as total, sum(cantidad) as unidades from facturas group by id_tiempo, id_producto"

    cursor.execute(consulta_sql)
    resultados = cursor.fetchall()
    datos_tiempo = []
    for resultado in resultados:
        id_tiempo, id_producto, total, unidades = resultado
        datos_tiempo.append(resultado)

    print(datos_tiempo)
    

except psycopg2.Error as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    if conn is not None:
        conn.close()
        print("Conexión cerrada.")
    tiempo_fin = time.time()

    tiempo_ejecucion = tiempo_fin - tiempo_inicio
    print(tiempo_ejecucion)
