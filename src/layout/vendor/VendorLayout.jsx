import { Box} from '@mui/material'
import { Outlet } from 'react-router'
import Input from '../../components/UI/Input'
import { Icons } from '../../assets/icons'
import Button from '../../components/UI/buttons/Button'
import { Tooltip,} from '@mui/material';


const VendorLayout = () => {
   return (
      <Box>
         <Box>
            <Box>
               <img src={Icons.eBook} alt="logo" />
            <Input  placeholder='hello' />
            <Button></Button>
            </Box>
            <Box>
               
               <Button variant='outlined'>Создать промокод</Button>
                <Tooltip title="Промокод применится ко всем вашим книгам" arrow>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: '#f44336',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {Icons.excl}
      </Box>
    </Tooltip>
            <Button variant='add' icon>Добавить книгу</Button>
            </Box>
         </Box>
      </Box>
   )
}

export default VendorLayout
