import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Stack, Divider, IconButton, Button, CircularProgress, Alert } from '@mui/material';
import { red } from '@mui/material/colors';
import Navbar from './Navbar';
import { Share } from '@mui/icons-material';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';

const MessageComp = () => {
  const { id } = useParams();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

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

  React.useEffect(() => {
    fetchMessage();
  }, [id]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {isLoading && <CircularProgress />}
        {isError && <Alert severity="error">There is some error in fetching the message</Alert>}
        {!isLoading && !isError && !message && <Typography>Message not found</Typography>}
        {message && (
          <Card elevation={0} variant="outlined" sx={{ mt: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="author">
                  {message.writer.charAt(0)}
                </Avatar>
              }
              title={`${message.writer}`}
              titleTypographyProps={{ fontSize: 30, fontWeight: 'bolder' }}
              action={
                <Button startIcon={<Share />}>
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
    </>
  );
};

export default MessageComp;
