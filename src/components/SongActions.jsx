import React, { useState } from 'react';
import { Stack, Button, Drawer, Box, Typography, TextField, Container, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';

const SongActions = () => {
  const [isRequestDrawerOpen, setRequestDrawerOpen] = useState(false);
  const [isPostDrawerOpen, setPostDrawerOpen] = useState(false);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const toggleRequestDrawer = (open) => () => {
    setRequestDrawerOpen(open);
  };

  const togglePostDrawer = (open) => () => {
    setPostDrawerOpen(open);
  };

  const toggleRequestModal = (open) => () => {
    setRequestModalOpen(open);
  };

  const togglePostModal = (open) => () => {
    setPostModalOpen(open);
  };

  const handleClose = () => {
    setRequestDrawerOpen(false);
    setPostDrawerOpen(false);
    setRequestModalOpen(false);
    setPostModalOpen(false);
  };

  const renderForm = (title, isRequest) => (
    <Box mt={{xs:8,md:0}}>
     
      <TextField
        fullWidth
        label="Your Name"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Song Title"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Artist Name"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      {isRequest ? (
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      ) : (
        <TextField
          fullWidth
          label="Upload Song File"
          type="file"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}
      <Button fullWidth variant="contained" color={isRequest ? "primary" : "secondary"} >
        {isRequest ? "Submit Request" : "Submit Song"}
      </Button>
    </Box>
  );

  return (
    <Container maxWidth='lg' >
      <Stack direction="row" spacing={2}  >
        <Button size={isMobile ? 'small': 'large'} fullWidth variant="contained" color="primary" onClick={isMobile ? toggleRequestDrawer(true) : toggleRequestModal(true)}>
          Request a Song
        </Button>
        <Button size={isMobile ? 'small': 'large'} fullWidth variant="contained" color="secondary" onClick={isMobile ? togglePostDrawer(true) : togglePostModal(true)}>
          Post a Song
        </Button>
      </Stack>

      {/* Drawer for small screens */}
      <Drawer anchor="right" open={isRequestDrawerOpen} onClose={toggleRequestDrawer(false)}>
        <Box sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
          <Button variant='contained' onClick={handleClose} sx={{ position: 'absolute', top: 16, right: 16 }} startIcon={<Close/>}>
            Close
          </Button>
          {renderForm('Request a Song', true)}
        </Box>
      </Drawer>
      <Drawer anchor="right" open={isPostDrawerOpen} onClose={togglePostDrawer(false)}>
        <Box sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
        <Button variant='contained' onClick={handleClose} sx={{ position: 'absolute', top: 16, right: 16 }} startIcon={<Close/>}>
            Close
          </Button>
          {renderForm('Post a Song', false)}
        </Box>
      </Drawer>

      {/* Modal for large screens */}
      <Dialog open={isRequestModalOpen} onClose={toggleRequestModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Request a Song
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {renderForm('Request a Song', true)}
        </DialogContent>
      </Dialog>
      <Dialog open={isPostModalOpen} onClose={togglePostModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Post a Song
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {renderForm('Post a Song', false)}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SongActions;
