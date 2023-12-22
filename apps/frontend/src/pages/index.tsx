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
import { getProvidersQuery } from 'src/queries/providersQuery'


interface ResponseData {
  labels: string[],
  amount: number[]
}

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

interface DepositWithdrawProps {
  ProvidersData: DataType[];
  ProductsData: DataType[];
}

interface DataType2 {
  title: string
  amount: string
}



const Home = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [salesAmount, setSalesAmount] = useState<number>(0);
  const [providersAmount, setProvidersAmount] = useState<number>(0);
  const [productsAmount, setProductsAmount] = useState<number>(0);
  const [facturesAmount, setFacturesAmount] = useState<number>(0);

  const [lowStock, setLowStock] = useState<{ amount: number; title: string; }[]>([]);
  const [bestProviders, setBestProviders] = useState<{ amount: number; title: string; }[]>([]);
  const [bestProducts, setBestProducts] = useState<{ amount: number; title: string; }[]>([]);



// mejores proveedores
useEffect(() => {
  const fetchData = async () => {
    try {
      const query: string = "SELECT     p.proveedor,     COUNT(f.id_producto) AS total_productos FROM     proveedores p JOIN     facturas f ON p.id_proveedor = f.id_proveedor GROUP BY     p.proveedor ORDER BY     total_productos DESC LIMIT 7;"
      const datos = await getProvidersQuery(query);
      if (datos) {
        let lista_nombres = [];
        let lista_cantidad = [];
        for (const object of datos) {
          lista_nombres.push(object.proveedor);
          lista_cantidad.push(object.total_productos);
        }

        let providersData: {
          amount: number;
          title: string;
        }[] = []
        for (let i = 0; i < lista_nombres.length; i++) {
          providersData.push({ amount: lista_cantidad[i], title: lista_nombres[i] });
        }

        setBestProviders(providersData);
        console.log(bestProviders)
      };
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  fetchData();
}, []);


//top 7 productos mas ganancias historico
useEffect(() => {
  const fetchData = async () => {
    try {
      const query: string = "SELECT      productos.nombre AS nombre_producto,     SUM(fact_ventas.precio_total) AS ganancia_total FROM     productos JOIN     fact_ventas ON productos.identificador = fact_ventas.id_producto GROUP BY     productos.identificador, productos.nombre ORDER BY     ganancia_total DESC LIMIT 7;"
      const datos = await getProvidersQuery(query);
      if (datos) {
        let lista_nombres = [];
        let lista_cantidad = [];
        for (const object of datos) {
          lista_nombres.push(object.nombre_producto);
          lista_cantidad.push(object.ganancia_total);
        }

        let providersData: {
          amount: number;
          title: string;
        }[] = []
        for (let i = 0; i < lista_nombres.length; i++) {
          providersData.push({ amount: lista_cantidad[i], title: lista_nombres[i] });
        }

        setBestProducts(providersData);
        console.log(bestProviders)
      };
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  fetchData();
}, []);

//top 7 productos menos stock
useEffect(() => {
  const fetchData = async () => {
    try {
      const query: string = "SELECT     p.nombre,     s.cantidad FROM     productos p JOIN     stock s ON p.identificador = s.id_producto JOIN     tiempo t ON s.id_tiempo = t.id WHERE     t.año = 2022 AND t.mes = 'diciembre' ORDER BY     s.cantidad ASC LIMIT 5;"
      const datos = await getProvidersQuery(query);
      if (datos) {
        let lista_nombres = [];
        let lista_cantidad = [];
        for (const object of datos) {
          lista_nombres.push(object.nombre);
          lista_cantidad.push(object.cantidad);
        }

        let providersData: {
          amount: number;
          title: string;
        }[] = []
        for (let i = 0; i < lista_nombres.length; i++) {
          providersData.push({ amount: lista_cantidad[i], title: lista_nombres[i] });
        }

        setLowStock(providersData);

      };
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  fetchData();
}, []);


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
      stats: facturesAmount,
      color: 'info',
      title: 'Facturas',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    }
  ]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT      SUM(fv.precio_total) AS total_ventas_diciembre_2022 FROM      fact_ventas fv     JOIN boletas b ON fv.id_boleta = b.id     JOIN tiempo t ON b.id_tiempo = t.id WHERE      t.año = 2022     AND t.mes = 'diciembre';";
        const datos = await getProvidersQuery(query);
        if (datos) {

          setTotalSales(datos[0].total_ventas_diciembre_2022);
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
        const query: string = "SELECT      count (*) as cantidad_ventas FROM      boletas";
        const datos = await getProvidersQuery(query);
        if (datos) {

          setSalesAmount(datos[0].cantidad_ventas);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT      count (*) as cantidad_proveedores FROM      proveedores";
        const datos = await getProvidersQuery(query);
        if (datos) {

          setProvidersAmount(datos[0].cantidad_proveedores);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT      count (*) as cantidad_productos FROM      productos";
        const datos = await getProvidersQuery(query);
        if (datos) {

          setProductsAmount(datos[0].cantidad_productos);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query: string = "SELECT      count (*) as cantidad_facturas FROM      facturas";
        const datos = await getProvidersQuery(query);
        if (datos) {

          setFacturesAmount(datos[0].cantidad_facturas);
        };
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    fetchData()
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
          <LowStocks stockData={lowStock} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw ProvidersData={bestProviders} ProductsData={bestProducts} />
        </Grid>
      </Grid>
      
    </ApexChartWrapper>
  )
}

export default Home