import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Avatar, IconButton, Input, Link, Grid, Container } from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Face from '@mui/icons-material/Face';
import Navbar from './Navbar';

export default function WordForTheDay() {
  return (
 <>
 <Navbar/>
 <Container maxWidth='xs' sx={{my:8}}>
 <Card variant="outlined" sx={{ minWidth: 300, borderRadius: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src="logo2.jpeg" sx={{ p: 0.5, border: '2px solid', borderColor: 'background.paper' }} />
        <Typography fontWeight="bold">MUI</Typography>
        <IconButton sx={{ marginLeft: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
        alt="Yosemite"
      />
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small">
            <FavoriteBorder />
          </IconButton>
          <IconButton size="small">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton size="small">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: '50%',
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? 'primary.main' : 'grey.300',
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link component="button" underline="none" variant="body2" fontWeight="bold">
          8.1M Likes
        </Link>
        <Typography variant="body2">
          <Link component="button" underline="none" fontWeight="bold">
            MUI
          </Link>{' '}
          The React component library you always wanted
        </Typography>
        <Link component="button" underline="none" variant="body2" sx={{ color: 'grey.600' }}>
          more
        </Link>
        <Typography variant="caption" sx={{ color: 'grey.600', mt: 0.5 }}>
          2 DAYS AGO
        </Typography>
      </CardContent>
    
    </Card>
   </Container>
 </>
  );
}
