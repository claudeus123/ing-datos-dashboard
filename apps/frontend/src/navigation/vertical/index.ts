// ** Icon imports
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Inicio',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Páginas'
    },
    {
      title: 'Proveedores',
      icon: FormatLetterCase,
      path: '/providers'
    },
    {
      title: 'Productos',
      icon: Table,
      path: '/products'
    },
    {
      title: 'Ventas',
      path: '/sales',
      icon: GoogleCirclesExtended
    }
  ]
}

export default navigation
