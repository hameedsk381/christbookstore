import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Container, Avatar, Stack, Button, Tabs, Tab, Divider, List, ListItem, ListItemText, Chip, Grid, Dialog, IconButton, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from './Navbar';
import { bibleMessages, famousMessages, popularTags } from '../data/bibleMessages';
import { Close } from '@mui/icons-material';




const BibleMessagesFeed = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleReadMore = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };
  const categories = [...new Set(bibleMessages.map(message => message.category))];


  return (
    <>
    <Navbar/>
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Left section with Tabs and Feed */}
        <Grid item xs={12} md={8}>
          <Tabs textColor='secondary' indicatorColor='secondary'
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Bible message categories" sx={{position:'sticky'}}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
          <Divider sx={{mb:2}}/>
          <Box sx={{ mt: 2 }}>
            {bibleMessages
              .filter(message => message.category === categories[selectedTab])
              .map(message => (
                <Card key={message.id} sx={{ mb: 4 }}>
                  {message.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={message.imageUrl}
                      alt={message.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {message.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar>{message.author.charAt(0)}</Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {message.author} - {message.date}
                      </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.primary" paragraph>
                      {message.content}
                    </Typography>
                    <Button variant="contained" color="primary"  onClick={() => handleReadMore(message)}>
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Grid>

        {/* Right section with famous messages and popular tags */}
        <Grid item xs={12} md={4}>
          <Container sx={{ position: 'sticky', top: 20 }}>
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                Famous Messages
              </Typography>
              <Stack spacing={1}>
                {famousMessages.map((message, index) => (
                  <Typography key={index} variant="body2" color="text.primary">
                    {message}
                  </Typography>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={'bold'}>
                Popular Tags
              </Typography>
              <Stack p={2} direction="row" spacing={1} flexWrap="wrap">
                {popularTags.map((tag, index) => (
                  <Chip label={tag} key={index} variant="outlined"  sx={{ mb: 1 }}/>
                ))}
              </Stack>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Dialog open={isModalOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedMessage?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMessage?.imageUrl && (
            <CardMedia
              component="img"
              height="200"
              image={selectedMessage.imageUrl}
              alt={selectedMessage.title}
              sx={{ mb: 2 }}
            />
          )}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Avatar>{selectedMessage?.author.charAt(0)}</Avatar>
            <Typography variant="body2" color="text.secondary">
              {selectedMessage?.author} - {selectedMessage?.date}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.primary" paragraph>
            {selectedMessage?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};

export default BibleMessagesFeed;
