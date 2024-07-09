import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import MediaCover from './MediaCover';
import { serverUrl } from '../apis/serverapi';
import Loader from './Loader';

const PromotionGrid = () => {
  const [promotions, setPromotions] = useState([]);
  const [wordImage, setWordImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${serverUrl}/promotions`); // Replace with your backend URL
        setPromotions(response.data);
       console.log(response.data)
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch promotion data');
        setLoading(false);
      }
    };
    const fetchWord = async () => {
        try {
          const response = await axios.get(`${serverUrl}/words`); // Replace with your backend URL
          
          setWordImage(response.data[0]);
          console.log(response.data)
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch promotion data');
          setLoading(false);
        }
      };
      fetchWord();
    fetchPromotions();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Grid container spacing={3} sx={{ height: { xs: 'auto', md: 260 } }}>
        <Grid item xs={12} md={8} sx={{ height: { xs: 'auto', md: 260 } }}>
          <Box sx={{ height: 220 }}>
         
                <MediaCover
             mobileUrl={promotions[0].mobileImageUrl}
                  imageUrl={promotions[0].desktopImageUrl}
                  width="100%"
                  navigateTo={'/'}
                />
   
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: { xs: 'auto', md: 240 } }}>
          {wordImage && (
            <MediaCover
              imageUrl={wordImage}
              width="100%"
              cardheight="100%"
           
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PromotionGrid;
