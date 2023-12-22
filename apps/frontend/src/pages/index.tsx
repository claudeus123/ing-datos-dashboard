// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import TotalSales from 'src/views/dashboard/TotalSales'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/LowStocks'
import { ReactElement, useEffect, useState } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import LowStocks from 'src/views/dashboard/LowStocks'

const Home = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [salesAmount, setSalesAmount] = useState<number>(0);
  const [providersAmount, setProvidersAmount] = useState<number>(0);
  const [productsAmount, setProductsAmount] = useState<number>(0);
  const [totalGain, setTotalGain] = useState<number>(0);


  interface DataType {
    stats: number
    title: string
    color: ThemeColor
    icon: ReactElement
  }

  interface StockDataType {
    title: string
    stock: string
  }

  const providersData = [
    {
      amount: '+$4,650',
      title: 'Gumroad Account'
    },
    {
      amount: '+$92,705',
      title: 'Mastercard'
    },
    {
      amount: '+$957',
      title: 'Stripe Account'
    },
    {
      amount: '+$6,837',
      title: 'American Bank'
    },
    {
      amount: '+$446',
      title: 'Bank Account'
    }
  ]
  
  const productsData = [
    {
      amount: '-$145',
      title: 'Google Adsense'
    },
    {
      amount: '-$1870',
      title: 'Github Enterprise'
    },
    {
      amount: '-$450',
      title: 'Upgrade Slack Plan'
    },
    {
      amount: '-$540',
      title: 'Digital Ocean'
    },
    {
      amount: '-$21',
      title: 'AWS Account'
    }
  ]
  const stockData: StockDataType[] = [
    {
      stock: '894k',
      title: '$8,656k',
    },
    {
      stock: '645k',
      title: '$2,415k',
    },
    {
      stock: '148k',
      title: '$865k',
    },
    {
      stock: '86k',
      title: '$745k',
    },
    {
      stock: '42k',
      title: '$45k',
    }
  ]
  
  const salesData: DataType[] = [
    {
      stats: salesAmount,
      title: 'Ventas',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: providersAmount,
      title: 'Proveedores',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: productsAmount,
      color: 'warning',
      title: 'Productos',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: totalGain,
      color: 'info',
      title: 'Ganancia Total',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    }
  ]

  useEffect(() => {
    // PRIMER QUERY
    const fetchTotalSales = () => {

    }
    fetchTotalSales()
  }, [])
  
  useEffect(() => {
    // SEGUNDO QUERY
    const fetchStats = () => {

    }
    fetchStats()
  }, [totalSales])
  
  useEffect(() => {
    // TERCER QUERY
    const fetchStats = () => {

    }
    fetchStats()
  },[totalSales])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <TotalSales totalSales={totalSales} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard salesData={salesData}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LowStocks stockData={stockData} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw ProvidersData={providersData} ProductsData={productsData} />
        </Grid>
      </Grid>
      
    </ApexChartWrapper>
  )
}

export default Home