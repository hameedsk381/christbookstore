import React from 'react';
import { Box } from '@mui/material';
import '../css/Loader.css'
const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh', // Occupies the full height of the viewport
      }}
    >
    <Box className="loader"/>
    </Box>
  );
};



export default Loader;
