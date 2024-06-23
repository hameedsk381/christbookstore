import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MediaCover({ imageUrl, navigateTo, icon, title ,width ,cardheight }) {
  const navigate = useNavigate();
  return (
    <Card 
      variant='elevation' 
      sx={{ 
        py: 3, width:`${width}`,
        position: 'relative', 
        overflow: 'hidden', 
        '&:hover': {
          boxShadow: 'none'
        },minHeight:220
      }} 
      elevation={4}
    >
      <CardMedia
              component="img"
              image={imageUrl}
              alt={title}
              sx={{ 
                position: 'absolute', objectFit:'cover',
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 0, 
                transition: 'transform 0.2s ease',
                transform: 'scale(1.0)',
              
                '&:hover': {
                  transform: 'scale(1.05)'
                },cursor:'pointer'
              }}
            />
    <CardActionArea 
        onClick={() => navigate(`/${navigateTo}`)} 
        disableRipple 
      
      >
        <CardContent 
          sx={{ 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 1, 
            color: 'white',
            backgroundColor: 'transparent', 
          }}
        >
          {icon}
          <Typography variant="h6" component="div" sx={{ mt: 1 }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
