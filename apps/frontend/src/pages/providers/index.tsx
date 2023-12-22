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
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import BarChart from 'src/views/dashboard/BarChart'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import LineChart from 'src/views/dashboard/LineChart'
import { useEffect, useState } from 'react'

interface Reponse {
  labels: string[],
  amount: number[]
}

const ProvidersPage = () => {
  const [data1, setData1] = useState<Response>();

  // series de ejemplo
  const seriesData = [37, 57, 45, 75, 57, 40, 100];
  const categoriesData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // cargar data aqui
  useEffect(() => {
    //setData(response.json)
  }, [])
  
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={16}>
          <BarChart seriesData={seriesData} categoriesData={categoriesData} /> {/* ACA */}
        </Grid>
        <Grid item xs={12} md={6} lg={16}>
          <LineChart seriesData={seriesData} categoriesData={categoriesData} />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <DepositWithdraw />
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