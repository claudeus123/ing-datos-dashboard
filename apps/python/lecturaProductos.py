import os
import csv
import psycopg2
from psycopg2 import sql, extras
import openpyxl
import time

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'anashe123',
    'host': 'localhost',  
    'port': '5432'  
}
directorio_productos = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Productos'

nombres_carpetas = []
data_to_insert = []
tiempo_inicio = time.time()
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    for archivo_xlsx in os.listdir(directorio_productos):
        if archivo_xlsx.endswith('.xlsx'):
            ruta_xlsx = os.path.join(directorio_productos, archivo_xlsx)
            workbook = openpyxl.load_workbook(ruta_xlsx)
            sheet = workbook.active

            for row in sheet.iter_rows(min_row=2, values_only=True):  
                data_to_insert.append(row)

    query = sql.SQL("INSERT INTO productos (identificador, categoria, subcategoria, nombre) VALUES %s")
    extras.execute_values(cursor, query, data_to_insert)
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
