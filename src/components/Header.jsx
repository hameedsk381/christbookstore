import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Call, CreditCard, LocalShipping } from '@mui/icons-material';
const Header = () => {
  return (
    <div>
         <Stack direction={'row'} justifyContent={'space-around'} bgcolor={'#24292e'} color={'white'} py={{ xs: 1, md: 2 }} display={{xs:'none',md:'flex'}}>
       <Stack direction={'row'} spacing={1}>
       <LocalShipping/><Typography >  Free shipping</Typography>
       </Stack>
       <Stack direction={'row'} spacing={1}>
       <CreditCard/> <Typography >Payment Methods</Typography>
       </Stack>
       <Stack direction={'row'} spacing={1}>
       <Call/> <Typography >Call Us +909090909090</Typography>
       </Stack>
       </Stack>
    </div>
  )
}

export default Header