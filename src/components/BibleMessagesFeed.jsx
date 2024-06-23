import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Container, Avatar, Stack, Button, Tabs, Tab, Divider, Grid, Dialog, CircularProgress, Alert,Chip, DialogTitle, IconButton, DialogContent, DialogActions } from '@mui/material';
import Navbar from './Navbar';
import { famousMessages, popularTags } from '../data/bibleMessages';
import BibleMessage from './BibleMessage';
import { useQuery } from 'react-query';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi'; // Make sure this import is correct
import { Close } from '@mui/icons-material';

const BibleMessagesFeed = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const { isLoading, isError, data: bibleMessages } = useQuery('bibleMessages', async () => {
    const response = await axios.get(`${serverUrl}/messages`);
    return response.data;
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  let categories = [];
  if (bibleMessages && Array.isArray(bibleMessages)) {
    categories = [...new Set(bibleMessages.map(message => message.category))];
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Left section with Tabs and Feed */}
          <Grid item xs={12} md={8}>
            {categories.length > 0 && (
              <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Bible message categories"
                sx={{ position: 'sticky', top: 0, zIndex: 1 }}
              >
                {categories.map((category, index) => (
                  <Tab key={index} label={category} />
                ))}
              </Tabs>
            )}
            <Divider sx={{ mb: 2 }} />
            {isLoading && <CircularProgress />}
            {isError && <Alert severity="error">There is some error fetching data. Please try again.</Alert>}
            {bibleMessages && categories.length > 0 && (
              <Grid container spacing={2}>
                {bibleMessages
                  .filter(message => message.category === categories[selectedTab])
                  .map(message => (
                    <Grid item xs={12} md={6} key={message._id}>
                      <BibleMessage message={message} />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>

          {/* Right section with famous messages and popular tags */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Box sx={{ my: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
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
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Popular Tags
                </Typography>
                <Stack p={2} direction="row" spacing={1} flexWrap="wrap">
                  {popularTags.map((tag, index) => (
                    <Chip label={tag} key={index} variant="outlined" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={isModalOpen} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            {selectedMessage?.title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
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
