"""
select id_boleta, id_producto, sum(precio_producto) FROM 
boleta_producto group by id_boleta, id_producto
"""
# 1/2 optimization