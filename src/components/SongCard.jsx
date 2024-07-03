import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton, Stack, Drawer, List, ListItem, ListItemText, ListItemIcon, Snackbar, Chip } from '@mui/material';
import { styled } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';
import { useNavigate } from 'react-router-dom';
import { ArrowOutward } from '@mui/icons-material';

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

  const handleNavigate = (id) => {
    navigate(`/songs/${id}`);
  };

  return (
    <Card   variant='outlined' sx={{ flexDirection: { xs: 'column', md: 'row' }, height: 240, display: 'flex', width: '100%' ,px:1}} className='songcard'>
      <StyledCardContent   sx={{ cursor: 'pointer' }} onClick={() => handleNavigate(song._id)}>
       <Stack direction={'row'}>
       <Typography fontFamily={'Mandali'} mb={1} variant="body2" color="text.primary" fontWeight={'bold'}>
          {song.title} 
        </Typography>
      <Chip label={song.songNum} variant='outlined'/>
       </Stack>
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
      </StyledCardContent>
    </Card>
  );
};

export default SongCard;
