import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, CircularProgress, Alert, Divider, Chip } from '@mui/material';
import { red } from '@mui/material/colors';
import Navbar from './Navbar';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi'; // Make sure this import is correct
import Footer from './Footer';

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

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

  React.useEffect(() => {
    fetchSong();
  }, [id]);
  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <>
      <Navbar />
      
      <Container maxWidth="md" sx={{mb:3}} >
        {isLoading && <CircularProgress />}
        {isError && <Alert severity="error">There is some error in fetching the song. Please try again.</Alert>}
        {!isLoading && !isError && !song && <Typography>Song not found</Typography>}
        {song && (
          <Card elevation={0} variant="outlined" sx={{ mt: 2,p:2 }}>
           
          
            <CardContent >
              <Typography variant="h4" component="div" gutterBottom sx={{fontFamily:'Mandali',fontWeight:'bold'}}>
                {song.title}   <Chip size='small' label={song.category} color='secondary' sx={{my:1,fontFamily:'Mandali'}} />
              </Typography>
            
              {song.fileUrl && (
              <CardMedia
                component="iframe"
                height="300"
                src={getEmbedUrl(song.fileUrl)}
                alt={song.title} sx={{my:2}}
              />
            )}
            
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Mandali',fontWeight:'bold'}}>
                రాగం: {song.ragaam}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Mandali',fontWeight:'bold'}}>
                తాళం: {song.taalam}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Mandali',fontWeight:'bold'}}>
                చాయ: {song.chaaya}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Mandali',fontWeight:'bold'}}>
                రచయిత: {song.rachayitha}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Mandali',fontWeight:'bold'}} >
                అనువాదం: {song.anuvaadam}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.primary" paragraph >
                <div dangerouslySetInnerHTML={{ __html: song.paata.replace(/\n/g, '<br />') }} style={{fontFamily:'Mandali',fontWeight:'bold'}} />
              </Typography>
             
            </CardContent>
          </Card>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default SongDetails;
