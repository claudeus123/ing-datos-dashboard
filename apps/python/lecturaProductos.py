import os
import csv
import psycopg2
from psycopg2 import sql
import openpyxl

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'anashe123',
    'host': 'localhost',  # Puedes cambiarlo si tu base de datos está en un servidor remoto
    'port': '5432'  # Cambia el puerto si es necesario
}
directorio_productos = 'C:/Users/Asus/Downloads/proyecto-ig-datos/proyectoidatos2023II/Productos'

# Lista para almacenar los nombres de las carpetas
nombres_carpetas = []

try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    # Recorrer archivos .xlsx en la carpeta de productos
    for archivo_xlsx in os.listdir(directorio_productos):
        if archivo_xlsx.endswith('.xlsx'):
            ruta_xlsx = os.path.join(directorio_productos, archivo_xlsx)

            # Leer datos desde el archivo Excel (.xlsx)
            workbook = openpyxl.load_workbook(ruta_xlsx)
            sheet = workbook.active

            # Recorrer filas en el archivo Excel
            for row in sheet.iter_rows(min_row=2, values_only=True):  # Se asume que la primera fila es el encabezado
                # Obtener datos de las columnas
                identificador, categoria, subcategoria, nombre = row

                # Insertar datos en la base de datos
                query = sql.SQL("INSERT INTO productos (identificador, categoria, subcategoria, nombre) VALUES (%s, %s, %s, %s)")
                cursor.execute(query, (identificador, categoria, subcategoria, nombre))

    # Confirmar cambios y cerrar conexión
    conn.commit()

except psycopg2.Error as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    if conn is not None:
        conn.close()
        print("Conexión cerrada.")
