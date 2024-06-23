import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, CircularProgress, Alert, Divider, Chip, Button, Stack, Snackbar, Drawer, Box, ListItem, List, ListItemText, ListItemIcon } from '@mui/material';
import { red } from '@mui/material/colors';
import Navbar from './Navbar';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi'; // Make sure this import is correct
import Footer from './Footer';
import { ArrowBack, ContentCopy, Facebook, Share, Twitter, Visibility, WhatsApp } from '@mui/icons-material';
import Loader from './Loader';

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleShareClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/songs/${id}`);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchSong = async () => {
    try {
      const response = await axios.get(`${serverUrl}/songs/${id}`);
      setSong(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching song:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSong();
  }, [id]);

  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const shareOptions = [
    {
      label: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/songs/${id}`,
      icon: <Facebook color='primary' />
    },
    {
      label: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${window.location.origin}/songs/${id}&text=${encodeURIComponent(song?.title || '')}`,
      icon: <Twitter color='info' />
    },
    {
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(song?.title || '')} ${window.location.origin}/songs/${id}`,
      icon: <WhatsApp color='success' />
    }
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ my: 3 }}>
        <Stack direction={'row'} justifyContent="space-between">
          <Button variant='contained' startIcon={<ArrowBack />} onClick={() => { navigate('/songs') }}>Go back</Button>
          <Button
            size='small'
            startIcon={<Share />}
            onClick={handleShareClick}
          >
            Share
          </Button>
        </Stack>
        {isLoading && <Loader loaderSvg="/path-to-your-loader.svg" />}
        {isError && <Alert severity="error">There is some error in fetching the song. Please try again.</Alert>}
        {!isLoading && !isError && !song && <Typography>Song not found</Typography>}
        {song && (
          <Card elevation={0} sx={{ mt: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                {song.title} <Chip size='small' label={song.category} color='secondary' sx={{ my: 1, fontFamily: 'Mandali' }} />
              </Typography>
              {song.fileUrl && (
                <CardMedia
                  component="iframe"
                  height="300"
                  src={getEmbedUrl(song.fileUrl)}
                  alt={song.title} sx={{ my: 2 }}
                />
              )}
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                రాగం: {song.ragaam}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                తాళం: {song.taalam}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                చాయ: {song.chaaya}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                రచయిత: {song.rachayitha}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Mandali', fontWeight: 'bold' }}>
                అనువాదం: {song.anuvaadam}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.primary" paragraph>
                <div dangerouslySetInnerHTML={{ __html: song.paata.replace(/\n/g, '<br />') }} style={{ fontFamily: 'Mandali', fontWeight: 'bold' }} />
              </Typography>
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
            </CardContent>
          </Card>
        )}
      </Container>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
      />
    </>
  );
};

export default SongDetails;
