import os
import csv
import psycopg2
from psycopg2 import sql
import openpyxl

# Configuración de la base de datos PostgreSQL
db_config = {
    'dbname': 'ingdatos',
    'user': 'postgres',
    'password': 'asd123',
    'host': 'localhost',  # Puedes cambiarlo si tu base de datos está en un servidor remoto
    'port': '5432'  # Cambia el puerto si es necesario
}
archivo_xlsx = 'proyectoidatos2023II/Proveedores/Proveedores.xlsx'

# Conexión a la base de datos PostgreSQL
try:
    conn = psycopg2.connect(**db_config)
    cursor = conn.cursor()

    # Leer datos desde el archivo Excel (.xlsx)
    workbook = openpyxl.load_workbook(archivo_xlsx)
    sheet = workbook.active

    # Recorrer filas en el archivo Excel
    for row in sheet.iter_rows(min_row=2, values_only=True):  # Se asume que la primera fila es el encabezado
        # Obtener datos de las columnas
        id_proveedor, proveedor, contacto_comercial, email, telefono = row

        # Insertar datos en la base de datos
        query = sql.SQL("INSERT INTO proveedores (id_proveedor, proveedor, contacto_comercial, email, telefono) VALUES (%s, %s, %s, %s, %s)")
        cursor.execute(query, (id_proveedor, proveedor, contacto_comercial, email, telefono))

    # Confirmar cambios y cerrar conexión
    conn.commit()

except psycopg2.Error as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    if conn is not None:
        conn.close()
        print("Conexión cerrada.")