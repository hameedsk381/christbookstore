import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Button, Avatar, Typography, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { ArrowForward, Share } from '@mui/icons-material';

export default function BibleMessage({ message }) {
  const navigate = useNavigate();

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
            <IconButton>
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
    </Card>
  );
}
