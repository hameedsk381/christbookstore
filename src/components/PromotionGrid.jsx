import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import MediaCover from './MediaCover';

const PromotionGrid = () => {
  return (
    <Container>
      <Grid container spacing={3} sx={{ height: { xs: 'auto', md: 260 } }}>
        <Grid item xs={12} md={8} sx={{ height: { xs: 'auto', md: 260 } }}>
         <Box sx={{height:220}}>
         <BlinkingComponentSwitcher
            components={[
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
                width="100%"
                
              />,
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
                width="100%"
                
              />,
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
                width="100%"
                
              />,
            ]}
          />
         </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: { xs: 'auto', md: 240 } }}>
          <MediaCover
            imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
            width="100%"
            cardheight="100%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PromotionGrid;
