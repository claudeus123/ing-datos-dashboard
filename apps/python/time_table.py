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

directorio_facturas = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Facturas'
tiempo_inicio = time.time()

data_to_insert = []
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    for año_carpeta in os.listdir(directorio_facturas):
        ruta_año = os.path.join(directorio_facturas, año_carpeta)


        if os.path.isdir(ruta_año):
            año = int(año_carpeta)
            for mes_carpeta in os.listdir(ruta_año):
                ruta_mes = os.path.join(ruta_año, mes_carpeta)
                if os.path.isdir(ruta_mes):
                    mes = mes_carpeta.lower()
                    dia_contador = 1
                    for archivo_csv in os.listdir(ruta_mes):
                        if archivo_csv.endswith('.csv'):
                            ruta_csv = os.path.join(ruta_mes, archivo_csv)

                        data_to_insert.append([año, mes, dia_contador])
                        dia_contador += 1

    query = sql.SQL("INSERT INTO tiempo (año, mes, dia) VALUES %s")
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
