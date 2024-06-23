import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Share, Visibility } from '@mui/icons-material';



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
  return (
    <Card elevation={4} sx={{flexDirection:{xs:'column',md:'row'},height:{xs:480,md:260},  display: 'flex',
    width:'100%'}}  >
      <StyledCardMedia sx={{width:'100%'}}
        component="img"
        alt={song.anuvaadam}
        image={'https://c4.wallpaperflare.com/wallpaper/86/419/788/random-green-hd-wallpaper-preview.jpg'} // assuming fileUrl is the thumbnail of the song
        title={song.anuvaadam}
      />
      <StyledCardContent sx={{cursor:'pointer'}} >
      <Typography mb={1} variant="body2" color="text.primary">
            {song.title}
          </Typography>
        <InfoBox>
          <IconBox>
            <AlbumIcon />
          </IconBox>
          <Typography variant="body2" color="text.secondary">
            రాగం: {song.ragaam}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <MusicNoteIcon />
          </IconBox>
          <Typography variant="body2" color="text.secondary">
            తాళం: {song.taalam}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <MusicNoteIcon />
          </IconBox>
          <Typography variant="body2" color="text.secondary">
            చాయ: {song.chaaya}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <PersonIcon />
          </IconBox>
          <Typography variant="body2" color="text.secondary">
            రచయిత: {song.rachayitha}
          </Typography>
        </InfoBox>
        <InfoBox>
          <IconBox>
            <TranslateIcon />
          </IconBox>
          <Typography variant="body2" color="text.secondary">
            అనువాదం: {song.anuvaadam}
          </Typography>
        </InfoBox>
        {/* <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" component="div">
            <div dangerouslySetInnerHTML={{ __html: song.paata }} />
          </Typography>
        </Box> */}
        <Stack direction={'row'} justifyContent={'space-around'}>
        <Button startIcon={<Visibility/>} size='small' onClick={()=>{navigate(`/songs/${song._id}`)}}>
            view
        </Button>
        <Button size='small' startIcon={<Share/>} onClick={()=>{navigate(`/songs/${song._id}`)}}>
            share
        </Button>
        </Stack>
      </StyledCardContent>
      
    </Card>
  );
};

export default SongCard;
