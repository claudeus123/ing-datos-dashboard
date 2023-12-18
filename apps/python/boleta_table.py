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

file_names = {
    "Ele": "preciosElectro.csv",
    "Far": "preciosFarmacia.csv",
    "Hog": "preciosHogar.csv",
    "Jug": "preciosJugueteria.csv",
    "Lib": "preciosLibreria.csv",
    "Lic": "preciosLicores.csv",
    "Pan": "preciosPanaderia.csv",
    "Pes": "preciosPescaderia.csv",
    "Que": "preciosQuesos.csv",
    "Beb": "preciosBebes.csv",
    "Bel": "preciosBelleza.csv",
    "Con": "preciosCongelados.csv",
    "Dep": "preciosDeportes.csv",
    "Des": "preciosDesayuno.csv"
}

directorio_boletas = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Boletas'
directorio_precios = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Precios'
tiempo_inicio = time.time()

insert_boletas = []
insert_productos = []
time_id = 1
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    for año_carpeta in os.listdir(directorio_boletas):
        ruta_año = os.path.join(directorio_boletas, año_carpeta)


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

                            with open(ruta_csv, 'r', newline='', encoding='utf-8') as csv_file:
                                csv_reader = csv.reader(csv_file)
                                next(csv_reader)
                                for row in csv_reader:
                                    id_boleta = row[0]
                                    for i in range(1, len(row) - 1):
                                        file_name = file_names[row[i].split('-')[0]]
                                        csv_prices = os.path.join(f'{directorio_precios}/{año_carpeta}/{mes_carpeta}/{file_name}')
                                        with open(csv_prices, 'r', newline='', encoding='utf-8') as csv_price_file:
                                            csv_price_reader = csv.reader(csv_price_file)
                                            next(csv_price_reader)
                                            for price_row in csv_price_reader:
                                                if price_row[0] == row[i]:
                                                    insert_productos.append([row[0], row[i], price_row[1]])
                                                    print(row[0], row[i], price_row[1])
                                                    break
                                        # print(row[i])
                                    insert_boletas.append([id_boleta, time_id])
                                    print(id_boleta, time_id)
                        time_id += 1
                        dia_contador += 1

    query = sql.SQL("INSERT INTO boletas (id, id_tiempo) VALUES %s")
    extras.execute_values(cursor, query, insert_boletas)
    print("BOLETAS SUBIDAS")
    conn.commit()

    query = sql.SQL("INSERT INTO boleta_producto (id_boleta, id_producto, precio_producto) VALUES %s")
    extras.execute_values(cursor, query, insert_productos)                                
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
