import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PromotionalBanner = () => {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        color: 'black',
        py: { xs: 4, md: 8 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box 
          component="img" 
          src="logo1.jpeg" 
          alt="Logo" 
          sx={{ 
            m: 'auto', 
            maxHeight: { xs: 100, md: 180 }, 
            width: { xs: 320, md: 720 }
          }} 
        />
        
        <Typography 
          variant="h4" 
          component="div" 
          gutterBottom 
          sx={{ mt: { xs: 2, md: 4 } }}
        >
          Your one-stop destination for all Telugu Christian resources!
        </Typography>
        <Typography 
          variant="body1" 
          component="div" 
          sx={{ mt: { xs: 1, md: 2 }, px: { xs: 2, md: 0 } }}
        >
          Discover a rich collection of songs, inter-denominational worship orders, daily inspirational words,
          and an extensive online store for all your spiritual needs.
        </Typography>
        <Typography 
          variant="body1" 
          component="div" 
          sx={{ mt: { xs: 1, md: 1 }, px: { xs: 2, md: 0 } }}
        >
          Unite with a global community and deepen your faith with resources designed to uplift and inspire.
        </Typography>
        <Grid 
          container 
          spacing={2} 
          justifyContent="center" 
          sx={{ my: { xs: 2, md: 4 } }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small" sx={{p:1}} 
              fullWidth
            >
              Discover Songs
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Button 
              variant="contained" 
              color="secondary" 
              size="small" sx={{p:1}} 
              fullWidth onClick={()=>{
                navigate('/store')
              }}
            >
              Visit Online Store
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="success" 
              size="small" sx={{p:1}} 
              fullWidth
            >
              Read Bible Messages
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="warning" 
              size="small" sx={{p:1}} 
              fullWidth
            >
              Get Word for the Day
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PromotionalBanner;
