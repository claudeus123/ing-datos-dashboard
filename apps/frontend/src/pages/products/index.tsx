import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import BarChart from 'src/views/dashboard/BarChart'
import { useEffect, useState } from 'react'
import { getProductQuery } from 'src/queries/productQuery'
import LineChart from 'src/views/dashboard/LineChart'

interface ResponseData {
  labels: string[],
  amount: number[]
}

const ProductsPage = () => {
  const [monthlyStock, setMonthlyStock] = useState<ResponseData>({ labels: [], amount: [] }); // + facturas
  const [mostProfit, setMostProfit] = useState<ResponseData>({ labels: [], amount: [] }); // + rentable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT tiempo.mes, COALESCE(SUM(stock.cantidad), 0) AS cantidad_stock FROM tiempo CROSS JOIN productos LEFT JOIN stock ON tiempo.id = stock.id_tiempo AND productos.identificador = stock.id_producto WHERE tiempo.año = 2022 AND productos.subcategoria = 'Alimento' AND productos.nombre LIKE 'G%' GROUP BY tiempo.año, tiempo.mes ORDER BY tiempo.año, tiempo.mes;"
        const datos = await getProductQuery(query);
        if (datos) {
          console.log(datos);
          let lista_nombres: string[] = [];
          let lista_cantidad: number[] = [];
        
          const mesesOrdenados = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
          ];
        
          for (const object of datos) {
            lista_nombres.push(object.mes);
            lista_cantidad.push(object.cantidad_stock);
          }
        
          const arrayOrdenado = lista_nombres.map((nombre, index) => ({ nombre, cantidad: lista_cantidad[index] }));
          arrayOrdenado.sort((a, b) => {
            return mesesOrdenados.indexOf(a.nombre) - mesesOrdenados.indexOf(b.nombre);
          });
          const lista_nombres_ordenada = arrayOrdenado.map(item => item.nombre);
          const lista_cantidad_ordenada = arrayOrdenado.map(item => item.cantidad);
        
          const lista: ResponseData = { labels: lista_nombres_ordenada, amount: lista_cantidad_ordenada };
          setMonthlyStock(lista);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT productos.identificador, COALESCE(SUM(facturas.precio_total), 0) AS dinero_generado FROM productos LEFT JOIN facturas ON productos.identificador = facturas.id_producto LEFT JOIN tiempo ON facturas.id_tiempo = tiempo.id WHERE tiempo.año = 2022 AND tiempo.mes = 'diciembre' GROUP BY productos.identificador ORDER BY dinero_generado DESC LIMIT 20;"
        const datos = await getProductQuery(query);
        if (datos) {
          console.log(datos)
          let lista_nombres = [];
          let lista_cantidad = [];
          for (const object of datos) {
            lista_nombres.push(object.identificador);
            lista_cantidad.push(object.dinero_generado);
          }
          const lista: ResponseData = { labels: lista_nombres, amount: lista_cantidad }
          setMostProfit(lista);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={16}>
          <LineChart title='Cantidad de Stock del producto "G" por mes en el año 2022' seriesData={monthlyStock.amount} categoriesData={monthlyStock.labels} /> {/* ACA */}
        </Grid>
        <Grid item xs={12} md={6} lg={16}>
          <BarChart title="Top 20 productos que generan más ganancia en el último mes" seriesData={mostProfit.amount} categoriesData={mostProfit.labels} /> {/* ACA */}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ProductsPage