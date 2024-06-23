
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Stack, Divider, IconButton, Button, CircularProgress, Alert, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Snackbar } from '@mui/material';
import { red } from '@mui/material/colors';
import Navbar from './Navbar';
import { ContentCopy, Facebook, Share, Twitter, WhatsApp } from '@mui/icons-material';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';
import Loader from './Loader';
import logo1 from '../assets/logo1.jpeg'
import { useEffect, useState } from 'react';
const MessageComp = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleShareClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/message/${id}`);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const shareOptions = [
    {
      label: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/message/${id}`,
      icon: <Facebook color='primary' />
    },
    {
      label: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${window.location.origin}/message/${id}&text=${encodeURIComponent(message?.heading1 || '')}`,
      icon: <Twitter color='info' />
    },
    {
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(message?.heading1 || '')} - ${window.location.origin}/message/${id}`,
      icon: <WhatsApp color='success' />
    }
  ];
  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${serverUrl}/messages/${id}`);
      setMessage(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching message:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  return (
    <>
    <Box
          component="img"
          src={logo1}
          alt="Logo"
          sx={{
            ml: {xs:'5%',md:'30%'},
            maxHeight: { xs: 100, md: 120 },
            width: { xs: 320, md: 520 },
          }}
        />
      <Container maxWidth="lg">
        {isLoading &&<Loader/>}
        {isError && <Alert severity="error">There is some error in fetching the message</Alert>}
        {!isLoading && !isError && !message && <Typography>Message not found</Typography>}
        {message && (
          <Card elevation={0}  sx={{ mt: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
                  {message.writer.charAt(0)}
                </Avatar>
              }
              title={`${message.writer}`}
              titleTypographyProps={{ fontSize: 30, fontWeight: 'bolder' }}
              action={
                <Button startIcon={<Share />} onClick={handleShareClick}>
                  Share
                </Button>
              }
            />
            {message.imageUrl && (
              <CardMedia
                component="img"
                height="300"
                image={message.imageUrl}
                alt={message.heading2}
              />
            )}
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {message.heading1}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                {message.heading2}
              </Typography>
              <Typography variant="body1" color="text.primary" paragraph my={5}>
                {message.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography textAlign={'center'} variant='h4' mb={3}>
                About the Author
              </Typography>
              <Typography fontWeight={'bold'}>
                {message.aboutAuthor}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
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
    </>
  );
};

export default MessageComp;
