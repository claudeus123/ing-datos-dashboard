import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import BarChart from 'src/views/dashboard/BarChart'
import { useEffect, useState } from 'react'
import { getProvidersQuery } from 'src/queries/providersQuery'

interface ResponseData {
  labels: string[],
  amount: number[]
}

const ProvidersPage = () => {
  const [mostBills, setMostBills] = useState<ResponseData>({ labels: [], amount: [] }); // + facturas
  const [mostProfit, setMostProfit] = useState<ResponseData>({ labels: [], amount: [] }); // + rentable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT proveedores.proveedor, SUM(facturas.precio_total) AS total_facturado FROM facturas JOIN tiempo ON facturas.id_tiempo = tiempo.id JOIN proveedores ON facturas.id_proveedor = proveedores.id_proveedor WHERE tiempo.año = 2022 GROUP BY proveedores.proveedor ORDER BY total_facturado DESC LIMIT 10;"
        const datos = await getProvidersQuery(query);
        if (datos) {
          let lista_nombres = [];
          let lista_cantidad = [];
          for (const object of datos) {
            lista_nombres.push(object.proveedor);
            lista_cantidad.push(object.total_facturado);
          }
          const lista: ResponseData = { labels: lista_nombres, amount: lista_cantidad }
          setMostBills(lista);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT proveedores.proveedor, COALESCE(SUM(facturas.precio_total), 0) AS ganancias_totales FROM proveedores LEFT JOIN facturas ON proveedores.id_proveedor = facturas.id_proveedor LEFT JOIN tiempo ON facturas.id_tiempo = tiempo.id WHERE tiempo.año = 2022 GROUP BY proveedores.proveedor ORDER BY ganancias_totales DESC LIMIT 10;"
        const datos = await getProvidersQuery(query);
        if (datos) {
          console.log(datos)
          let lista_nombres = [];
          let lista_cantidad = [];
          for (const object of datos) {
            lista_nombres.push(object.proveedor);
            lista_cantidad.push(object.ganancias_totales);
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
          <BarChart title="Top 10 proveedores con más facturas en el 2022" seriesData={mostBills.amount} categoriesData={mostBills.labels} /> {/* ACA */}
        </Grid>
        <Grid item xs={12} md={6} lg={16}>
          <BarChart title="Top 10 proveedores más rentables en el 2022" seriesData={mostProfit.amount} categoriesData={mostProfit.labels} /> {/* ACA */}
        </Grid>
        {/* <Grid item xs={12} md={6} lg={16}>
          <LineChart seriesData={lista.amount} categoriesData={lista.labels} />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default ProvidersPage

/* REEMPLAZAR POR ESTO PARA POWER BI 
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

import { models } from 'powerbi-client';
import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';

class ProvidersPage extends React.Component {
  private report: models.IReport | undefined;

  render() {
    return (
      <ApexChartWrapper>
        <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: '<Report Id>',
          embedUrl: '<Embed Url>',
          accessToken: '<Access Token>',
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers = {
          new Map([
            ['loaded', function () {console.log('Report loaded');}],
            ['rendered', function () {console.log('Report rendered');}],
            ['error', function (event) {console.log(event!.detail);}],
            ['visualClicked', () => console.log('visual clicked')],
            ['pageChanged', (event) => console.log(event)],
          ])
        }
        cssClassName="reportClass"
        getEmbeddedComponent={(embeddedReport) => {
          this.setState({ report: embeddedReport });
        }}
      />
      </ApexChartWrapper>
    )
  }
}

export default ProductsPage;
*/