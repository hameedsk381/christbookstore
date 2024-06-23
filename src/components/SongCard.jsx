import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PersonIcon from '@mui/icons-material/Person';
import TranslateIcon from '@mui/icons-material/Translate';



const StyledCardMedia = styled(CardMedia)({
  height: 230
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
  return (
    <Card elevation={4} sx={{flexDirection:{xs:'column',md:'row'},height:{xs:420,md:230},  display: 'flex',
    width:'100%'}}>
      <StyledCardMedia sx={{width:{xs:'100%',md:'50%'}}}
        component="img"
        alt={song.anuvaadam}
        image={'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800'} // assuming fileUrl is the thumbnail of the song
        title={song.anuvaadam}
      />
      <StyledCardContent>
      
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
      </StyledCardContent>
    </Card>
  );
};

export default SongCard;
