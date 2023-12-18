import os
import csv
import psycopg2
from psycopg2 import sql, extras
import uuid  # Agregar importación para uuid
import time

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'anashe123',
    'host': 'localhost',  # Puedes cambiarlo si tu base de datos está en un servidor remoto
    'port': '5432'  # Cambia el puerto si es necesario
}

# Directorio que contiene las carpetas de facturas
directorio_facturas = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Facturas'
tiempo_inicio = time.time()
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    

    # Recorrer carpetas de años en el directorio de facturas
    for año_carpeta in os.listdir(directorio_facturas):
        ruta_año = os.path.join(directorio_facturas, año_carpeta)

        # Verificar si el elemento es un directorio
        if os.path.isdir(ruta_año):
            año = int(año_carpeta)

            # Recorrer carpetas de meses en el año
            for mes_carpeta in os.listdir(ruta_año):
                ruta_mes = os.path.join(ruta_año, mes_carpeta)

                # Verificar si el elemento es un directorio
                if os.path.isdir(ruta_mes):
                    mes = mes_carpeta.lower()  # Convertir a minúsculas para manejar meses con diferentes casos

                    # Contador para el día
                    dia_contador = 1

                    # Recorrer archivos CSV en el mes
                    for archivo_csv in os.listdir(ruta_mes):
                        if archivo_csv.endswith('.csv'):
                            ruta_csv = os.path.join(ruta_mes, archivo_csv)
                            with open(ruta_csv, 'r', newline='', encoding='utf-8') as csv_file:
                                csv_reader = csv.reader(csv_file)
                                next(csv_reader)
                                for row in csv_reader:
                                    proveedor, producto, cantidad, precio_unitario, precio_total = row
                                    if int(cantidad) * int(precio_unitario) != int(precio_total):
                                        
                                        print("error detected in:" + ruta_csv )


                                    # Insertar datos en la base de datos
                                    # insertar_datos_en_base_de_datos(año, mes, dia_contador, proveedor, producto, cantidad, precio_unitario, precio_total)

                                    # Incrementar el contador del día
                                    dia_contador += 1

    # Confirmar cambios y cerrar conexión
    # query = sql.SQL("INSERT INTO facturas (año, mes, dia, id_proveedor, id_producto, cantidad, precio_unitario, precio_total) VALUES %s")
    # extras.execute_values(cursor, query, data_to_insert)                                
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
