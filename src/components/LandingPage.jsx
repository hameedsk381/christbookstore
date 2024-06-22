import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Grid, Container, IconButton, Paper, Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowDownward, BookOutlined, LocalLibraryOutlined, MusicNoteOutlined, StoreOutlined } from '@mui/icons-material';
import MediaCover from './MediaCover';
import DailyQuote from './DailyQuote';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import Hero from './Hero';

const LandingPage = () => {
  const [showFab, setShowFab] = useState(true);
  const fabRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowFab(false);
    } else {
      setShowFab(true);
    }
  };

  const handleFabClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        color: 'black',
        pb: { xs: 4, md: 6 },
        pt: { xs: 2, md: 4 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          component="img"
          src="logo1.jpeg"
          alt="Logo"
          sx={{
            m: 'auto',
            maxHeight: { xs: 100, md: 180 },
            width: { xs: 320, md: 720 },
          }}
        />
        <DailyQuote />
        <Box sx={{ pb: 4, height: 240 }}>
          <BlinkingComponentSwitcher
            components={[
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
              />,
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
              />,
              <MediaCover
                imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
              />,
            ]}
          />
        </Box>
        <Hero />

        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ my: { xs: 4, md: 6 } }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <MediaCover
              imageUrl="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
              navigateTo="songs"
              icon={<MusicNoteOutlined sx={{ fontSize: 50, color: 'white' }} />}
              title="Discover Songs"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCover
              imageUrl="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800"
              navigateTo="store"
              icon={<StoreOutlined sx={{ fontSize: 50, color: 'white' }} />}
              title="Visit Online Store"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCover
              imageUrl="https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=800"
              navigateTo="feed"
              icon={<BookOutlined sx={{ fontSize: 50, color: 'white' }} />}
              title="Read Bible Messages"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MediaCover
              imageUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800"
              navigateTo="word-for-the-day"
              icon={<LocalLibraryOutlined sx={{ fontSize: 50, color: 'white' }} />}
              title="Get Word for the Day"
            />
          </Grid>
        </Grid>

        {showFab && (
          <Fab size='medium'
            color="primary"
            aria-label="scroll down"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={handleFabClick}
          >
            <ArrowDownward />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default LandingPage;
