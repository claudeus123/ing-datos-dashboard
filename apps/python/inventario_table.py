import os
import csv
import psycopg2
from psycopg2 import sql, extras
import time
import re
# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'asd123',
    'host': 'localhost', 
    'port': '5433' 
}

pattern = r'\d+'

directorio_inventario = 'C:/Users/sketch/Desktop/IngDeDatps/proyectoidatos2023II/Inventario'
tiempo_inicio = time.time()

insert_inventario = []
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

    for año_carpeta in os.listdir(directorio_inventario):
        ruta_año = os.path.join(directorio_inventario, año_carpeta)

        if os.path.isdir(ruta_año):
            año = int(año_carpeta)
            for mes_carpeta in os.listdir(ruta_año):
                ruta_mes = os.path.join(ruta_año, mes_carpeta)
                if os.path.isdir(ruta_mes):
                    mes = mes_carpeta.lower()
                    for archivo_csv in os.listdir(ruta_mes):
                        if archivo_csv.endswith('.csv'):
                            ruta_csv = os.path.join(ruta_mes, archivo_csv)
                            file_name = archivo_csv.split('-')[0]
                            numero_cadena1 = int(re.search(pattern, file_name).group())

                            
                            # print(numero_cadena1)
                            with open(ruta_csv, 'r', newline='', encoding='utf-8') as csv_file:
                                csv_reader = csv.reader(csv_file)
                                next(csv_reader)
                                for row in csv_reader:
                                    id_boleta = row[0]
                                    time_id = datos_tiempo[f"{año}{mes}{numero_cadena1}"]
                                    insert_inventario.append([row[0], time_id, row[1]])
                                    # print(id_boleta, time_id)

                    print(f"INVENTARIO DEL MES {mes} DEL AÑO {año} COMPLETADAS")
        

    query = sql.SQL("INSERT INTO stock (id_producto, id_tiempo, cantidad) VALUES %s")
    extras.execute_values(cursor, query, insert_inventario)
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
