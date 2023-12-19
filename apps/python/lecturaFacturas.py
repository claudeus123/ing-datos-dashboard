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

    consulta_sql = "SELECT id, año, mes, dia FROM tiempo"
    cursor.execute(consulta_sql)
    resultados = cursor.fetchall()
    datos_tiempo = {}

    for resultado in resultados:
        id_tiempo, año, mes, dia = resultado
        format = f"{año}{mes}{dia}"
        datos_tiempo[format] = id_tiempo

    for año_carpeta in os.listdir(directorio_facturas):
        ruta_año = os.path.join(directorio_facturas, año_carpeta)


        if os.path.isdir(ruta_año):
            año = int(año_carpeta)
            for mes_carpeta in os.listdir(ruta_año):
                ruta_mes = os.path.join(ruta_año, mes_carpeta)
                if os.path.isdir(ruta_mes):
                    mes = mes_carpeta.lower()

                    for archivo_csv in os.listdir(ruta_mes):
                        if archivo_csv.endswith('.csv'):
                            ruta_csv = os.path.join(ruta_mes, archivo_csv)
                            dia = archivo_csv[8:].split('-')[0]
                            with open(ruta_csv, 'r', newline='', encoding='utf-8') as csv_file:
                                csv_reader = csv.reader(csv_file)
                                next(csv_reader)
                                for row in csv_reader:
                                    proveedor, producto, cantidad, precio_unitario, precio_total = row
                                    time_id = datos_tiempo[f"{año}{mes}{dia}"]
                                    # print(time_id, archivo_csv)
                                    data_to_insert.append([time_id, proveedor, producto, cantidad, precio_unitario, precio_total])


    query = sql.SQL("INSERT INTO facturas (id_tiempo, id_proveedor, id_producto, cantidad, precio_unitario, precio_total) VALUES %s")
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
