import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Button, Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Share, ContentCopy, Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import { format } from 'date-fns';
import logo from '../assets/logo2.jpeg';

const WordCard = ({ word }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: word.heading,
          text: word.content,
          url: word.imageUrl,
        });
        console.log('Image shared successfully');
      } catch (error) {
        console.error('Error sharing the image:', error);
      }
    } else {
      setDrawerOpen(true);
    }
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${word.heading} - ${word.content} ${word.imageUrl}`);
    handleClose();
  };

  const shareOptions = [
    {
      label: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${word.imageUrl}`,
      icon: <Facebook color="primary" />
    },
    {
      label: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${word.imageUrl}&text=${encodeURIComponent(word.heading || '')}`,
      icon: <Twitter color="info" />
    },
    {
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(word.heading || '')} ${word.imageUrl}`,
      icon: <WhatsApp color="success" />
    }
  ];

  return (
    <>
      <Card
        elevation={0}
        variant="outlined"
        sx={{ borderRadius: 2, my: 3, bgcolor: 'transparent', maxWidth: 450, m: 'auto', width: '100%' }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={logo} sx={{ border: '2px solid', borderColor: 'background.paper' }} />
          <Typography fontWeight="bold" variant="h6" textTransform="uppercase">
            {word.heading}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Share />}
            sx={{ marginLeft: 'auto' }}
            onClick={handleShare}
          >
            Share
          </Button>
        </CardContent>
        {word.imageUrl && (
          <CardMedia component="img" height="400" image={word.imageUrl} alt={word.heading} />
        )}
        <CardContent>
          <Typography variant="body2" color="text.primary" fontWeight="medium" sx={{ wordWrap: 'break-word' }}>
            {word.content}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 1 }}>
            {format(new Date(word.date), 'MMMM dd, yyyy')}
          </Typography>
        </CardContent>
      </Card>
      <Drawer anchor="bottom" open={drawerOpen} onClose={handleClose}>
        <Box sx={{ width: 'auto', p: 2 }}>
          <Typography fontFamily="Mandali" variant="h6" gutterBottom>
            Share this content
          </Typography>
          <List>
            <ListItem button onClick={handleCopyToClipboard}>
              <ContentCopy sx={{ mr: 1 }} />
              <ListItemText primary="Copy to Clipboard" />
            </ListItem>
            {shareOptions.map((option, index) => (
              <ListItem button key={index} onClick={() => { window.open(option.url, '_blank'); handleClose(); }}>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default WordCard;
