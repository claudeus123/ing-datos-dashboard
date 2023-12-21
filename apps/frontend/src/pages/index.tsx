// ** MUI Imports
import Typography from '@mui/material/Typography'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import FooterIllustrationsV1 from 'src/views/pages/misc/FooterIllustrations'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

const DemoGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))


const Home = () => {
  return (
    <Box className='content-center' sx={{
      width: "100%",
      height: "100%",
      borderRadius: 5
    }}>
      <Grid container spacing={2}>
        <DemoGrid item xs={12} sx={{ marginLeft: 15, marginTop: 20}} sm={10}>
          <Typography variant='h1'>
            Bienvenida Juanita!
          </Typography>
          <Typography variant='body1'>Selecciona una página en el menú izquierdo para comenzar a visualizar tus datos.</Typography>
        </DemoGrid>
      </Grid>
      <Box className='content-center' sx={{
        marginTop: 99,
      }}>
        <FooterIllustrationsV1 />
      </Box>
    </Box>
  )
}

export default Home;