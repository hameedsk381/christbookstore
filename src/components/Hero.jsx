import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';

const Hero = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography 
        variant={isSmallScreen ? "h5" : "h4"} 
        component="div" 
        gutterBottom 
        sx={{ mt: { xs: 2, md: 4 } }}
      >
        Your one-stop destination for all Telugu Christian resources!
      </Typography>
      <Typography 
        variant={isSmallScreen ? "body2" : "body1"} 
        component="div" 
        sx={{ mt: { xs: 1, md: 2 }, px: { xs: 2, md: 0 } }}
      >
        Discover a rich collection of songs, inter-denominational worship orders, daily inspirational words,
        and an extensive online store for all your spiritual needs.
      </Typography>
      <Typography 
        variant={isSmallScreen ? "body2" : "body1"} 
        component="div" 
        sx={{ mt: { xs: 1, md: 4 }, px: { xs: 2, md: 0 } }}
      >
        Unite with a global community and deepen your faith with resources designed to uplift and inspire.
      </Typography>
    </Box>
  );
};

export default Hero;
