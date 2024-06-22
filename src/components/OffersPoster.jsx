import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Container } from '@mui/material';
import { MusicNoteOutlined } from '@mui/icons-material';
import MediaCover from './MediaCover';



const OffersPoster = ({offers}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* <Typography variant="h4" component="div" gutterBottom>
        Special  Offers for you
      </Typography> */}
      <Grid container spacing={4}>
        {offers.map((offer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
             <MediaCover 
              imageUrl={offer.imageUrl}
              navigateTo={offer.navigateUrl}
             
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OffersPoster;
