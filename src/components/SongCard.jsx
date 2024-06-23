import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton, Stack, Drawer, List, ListItem, ListItemText, ListItemIcon, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import { useNavigate } from 'react-router-dom';
import { Visibility, Share, Facebook, Twitter, WhatsApp, ContentCopy } from '@mui/icons-material';

const StyledCardMedia = styled(CardMedia)({
  height: 260
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const InfoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const IconBox = styled(Box)({
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
});

const SongCard = ({ song }) => {
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
    navigator.clipboard.writeText(`${window.location.origin}/songs/${song._id}`);
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const shareOptions = [
    {
      label: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/songs/${song._id}`,
      icon:<Facebook color='primary'/>
    },
    {
      label: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${window.location.origin}/songs/${song._id}&text=${encodeURIComponent(song.title)}`,
      icon:<Twitter color='info'/>
    },
    {
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(song.title)} ${window.location.origin}/songs/${song._id}`,
      icon:<WhatsApp color='success'/>
    }
  ];

  return (
    <Card elevation={4} sx={{ flexDirection: { xs: 'column', md: 'row' }, height: { xs: 480, md: 260 }, display: 'flex', width: '100%' }}>
      <StyledCardMedia sx={{ width: {xs:'100%',md:'60%'} }}
        component="img"
        alt={song.anuvaadam}
        image={'https://c4.wallpaperflare.com/wallpaper/86/419/788/random-green-hd-wallpaper-preview.jpg'} // assuming fileUrl is the thumbnail of the song
        title={song.anuvaadam}
      />
      <StyledCardContent sx={{ cursor: 'pointer' }}>
        <Typography fontFamily={'Mandali'} mb={1} variant="body2" color="text.primary" fontWeight={'bold'}>
          {song.title}
        </Typography>
        <InfoBox>
          <IconBox>
            <AlbumIcon />
          </IconBox>
          <Typography fontFamily={'Mandali'} variant="body2" color="text.secondary">
            రాగం: {song.ragaam}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <MusicNoteIcon />
          </IconBox>
          <Typography fontFamily={'Mandali'} variant="body2" color="text.secondary">
            తాళం: {song.taalam}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <MusicNoteIcon />
          </IconBox>
          <Typography fontFamily={'Mandali'} variant="body2" color="text.secondary">
            చాయ: {song.chaaya}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <PersonIcon />
          </IconBox>
          <Typography fontFamily={'Mandali'} variant="body2" color="text.secondary">
            రచయిత: {song.rachayitha}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <TranslateIcon />
          </IconBox>
          <Typography fontFamily={'Mandali'} variant="body2" color="text.secondary">
            అనువాదం: {song.anuvaadam}
          </Typography>
        </InfoBox>
        <Stack direction={'row'} spacing={3} justifyContent={'flex-start'}>
          <Button startIcon={<Visibility />} size='small' onClick={() => { navigate(`/songs/${song._id}`) }}>
            View
          </Button>
          <Button
            size='small'
            startIcon={<Share />}
            onClick={handleShareClick}
          >
            Share
          </Button>
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
        </Stack>
      </StyledCardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
      />
    </Card>
  );
};

export default SongCard;
