import React from 'react';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TypewriterText from './TypeWriterText';

const DailyQuote = () => {
  const quote = "This is a sample daily quote to inspire you!"; // Replace with actual quote source
  const author = "Author Name"; // Replace with actual author

  return (
    <Paper 
      elevation={0} 
      sx={{ 
mt:2,
        mb: 4, 
        textAlign: 'center', 

        color: 'black',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',bgcolor:'transparent'
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'secondary.main',
          width: 50,
          height: 50,
          position: 'absolute',
          
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <FormatQuoteIcon sx={{ fontSize: 36, color: 'white' }} />
      </Avatar>
      <Box sx={{ mt: 8 }}>
       
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        <TypewriterText text={`"${quote}"`} />
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          - {author}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DailyQuote;
