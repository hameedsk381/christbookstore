
import { Card, CardHeader, CardMedia, CardContent, Button, Avatar, Typography, Stack, IconButton,Drawer, List, ListItem, ListItemIcon, ListItemText, Snackbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { ArrowForward, ContentCopy, Facebook, Share, Twitter, WhatsApp } from '@mui/icons-material';
import { useState } from 'react';

export default function BibleMessage({ message }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleShareClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/messages/${message._id}`);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const shareOptions = [
    {
      label: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/messages/${message._id}`,
      icon: <Facebook color='primary' />
    },
    {
      label: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${window.location.origin}/songs/${message._id}&text=${encodeURIComponent(message?.title || '')}`,
      icon: <Twitter color='info' />
    },
    {
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(message?.title || '')} ${window.location.origin}/message/${message._id}`,
      icon: <WhatsApp color='success' />
    }
  ];
  const handleReadMore = () => {
    navigate(`/message/${message._id}`);
    console.log(message._id)
  };

  return (
    <Card key={message.id} sx={{ maxWidth: 345, mb: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
            A
          </Avatar>
        }
        title={`${message.writer} `}
        titleTypographyProps={{fontWeight:'bold',fontSize:20}}
        action={
            <IconButton onClick={handleShareClick}>
                <Share/>
            </IconButton>
        }
       
      />
      {message.imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={message.imageUrl}
          alt={message.heading2}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {message.heading1}
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {message.heading2}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {message.description}
        </Typography>
        <Button sx={{mt:2}} variant='contained' size="small" color="primary" onClick={handleReadMore} endIcon={<ArrowForward/>}>
          Read More
        </Button>
      </CardContent>
      <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={handleClose}
              >
                <Box sx={{ width: 'auto', p: 2 }}>
                  <Typography fontFamily={'Mandali'} variant="h6" gutterBottom>
                    Share this song
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
           
     
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
      />
    </Card>
  );
}
