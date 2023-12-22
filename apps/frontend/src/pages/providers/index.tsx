// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/TotalSales'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import BarChart from 'src/views/dashboard/BarChart'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import LineChart from 'src/views/dashboard/LineChart'
import { useEffect, useState } from 'react'
import { obtenerProveedoresMasCaros } from 'src/queries/proveedores'

interface Reponse {
  labels: string[],
  amount: number[]
}

const ProvidersPage = () => {
  const [lista, setLista] = useState<Reponse>({labels:[],amount:[]});

  // series de ejemplo
  const seriesData = [37, 57, 45, 75, 57, 40, 100];
  const categoriesData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // cargar data aqui
  useEffect(() => {
    console.log("alooo")
    const fetchData = async () => {
      try {
        const datos = await obtenerProveedoresMasCaros("SELECT proveedores.proveedor, SUM(facturas.precio_total) AS total_facturado FROM facturas JOIN tiempo ON facturas.id_tiempo = tiempo.id JOIN proveedores ON facturas.id_proveedor = proveedores.id_proveedor WHERE tiempo.año = 2022 GROUP BY proveedores.proveedor ORDER BY total_facturado DESC LIMIT 10;");
        
        if (datos){
          console.log("Aqui deberia haber datos: ", datos)
          let lista_nombres = [];
          let lista_cantidad = [];
          
          for (const object of datos) {
            lista_nombres.push(object.proveedor);
            lista_cantidad.push(object.total_facturado);
          }
  
          
          const lista: Reponse = {labels: lista_nombres, amount: lista_cantidad}
          setLista(lista);

        };

        
        
        // Aquí puedes hacer algo con los datos, como establecerlos en un estado con setData
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
          <BarChart title="Top 10 proveedores con mas facturas en el 2022" seriesData={lista.amount} categoriesData={lista.labels} /> {/* ACA */}
        </Grid>
        <Grid item xs={12} md={6} lg={16}>
          <LineChart seriesData={lista.amount} categoriesData={lista.labels} />
        </Grid>
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