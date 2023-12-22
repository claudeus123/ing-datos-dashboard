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

const SalesPage = () => {
  const [sellsByCategory, setSellsByCategory] = useState<ResponseData>({ labels: [], amount: [] }); // + facturas
  const [monthlyIncome, setMonthlyIncome] = useState<ResponseData>({ labels: [], amount: [] }); // + rentable

  // Cargar total de productos vendidos por categoría en el año 2022
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT productos.categoria, SUM(fact_ventas.cantidad) AS total_ventas FROM fact_ventas JOIN productos ON fact_ventas.id_producto = productos.identificador JOIN boletas ON fact_ventas.id_boleta = boletas.id JOIN tiempo ON boletas.id_tiempo = tiempo.id WHERE tiempo.año = 2022 GROUP BY productos.categoria ORDER BY total_ventas DESC;"
        const datos = await getProductQuery(query);
        if (datos) {
          console.log("AQUI CATEGORIAS",datos);
          let lista_nombres: string[] = [];
          let lista_cantidad: number[] = [];
        
          for (const object of datos) {
            lista_nombres.push(object.mes);
            lista_cantidad.push(object.cantidad_stock);
          }
        
          const lista: ResponseData = { labels: lista_nombres, amount: lista_cantidad };
          setSellsByCategory(lista);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  // Cargar ingresos totales por mes en el año 2022
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT tiempo.mes, SUM(fact_ventas.precio_total) AS ingresos_totales FROM tiempo JOIN boletas ON tiempo.id = boletas.id_tiempo JOIN fact_ventas ON boletas.id = fact_ventas.id_boleta WHERE tiempo.año = 2022 GROUP BY tiempo.mes ORDER BY tiempo.mes;"
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
          setMonthlyIncome(lista);
        }
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
          <BarChart title='Total de productos vendidos por categoría en el año 2022' seriesData={sellsByCategory.amount} categoriesData={sellsByCategory.labels} /> {/* ACA */}
        </Grid>
        <Grid item xs={12} md={6} lg={16}>
          <LineChart title="Top 20 productos que generan más ganancia en el último mes" seriesData={monthlyIncome.amount} categoriesData={monthlyIncome.labels} /> {/* ACA */}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default SalesPage