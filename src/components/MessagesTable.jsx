import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, MenuItem, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { serverUrl } from '../apis/serverapi';

const categories = ['Sunday School', 'Ideas', 'Narrative Sermons', 'Textual Sermons', 'Expository','Topical Sermons','Summaries','Biographies','Jokes','Column'];

const MessageTable = () => {
  const [messages, setMessages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${serverUrl}/messages`);
      const dataWithIds = response.data.map((message, index) => ({ ...message, id: message._id || index }));
      setMessages(dataWithIds);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenDialog = (message) => {
    setCurrentMessage(message);
    setEditMode(!!message);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMessage(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/messages/${id}`);
      setSnackbarMessage('Message deleted successfully');
      setOpenSnackbar(true);
      fetchMessages();
    } catch (error) {
      setSnackbarMessage('Failed to delete message');
      setOpenSnackbar(true);
      console.error('Error deleting message:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      heading1: currentMessage?.heading1 || '',
      heading2: currentMessage?.heading2 || '',
      writer: currentMessage?.writer || '',
      imageUrl: currentMessage?.imageUrl || '',
      description: currentMessage?.description || '',
      aboutAuthor: currentMessage?.aboutAuthor || '',
      category: currentMessage?.category || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      heading1: Yup.string().required('Heading 1 is required'),
      heading2: Yup.string().required('Heading 2 is required'),
      writer: Yup.string().required('Writer name is required'),
      imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
      description: Yup.string().required('Description is required'),
      aboutAuthor: Yup.string().required('About Author is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (editMode) {
          await axios.put(`${serverUrl}/messages/${currentMessage.id}`, values);
          setSnackbarMessage('Message updated successfully');
        } else {
          await axios.post(`${serverUrl}/messages`, values);
          setSnackbarMessage('Message created successfully');
        }
        setOpenSnackbar(true);
        fetchMessages();
        handleCloseDialog();
      } catch (error) {
        setSnackbarMessage('Failed to save message');
        setOpenSnackbar(true);
        console.error('Error saving message:', error);
      }
    },
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'heading1', headerName: 'Heading 1', width: 150 },
    { field: 'heading2', headerName: 'Heading 2', width: 150 },
    { field: 'writer', headerName: 'Writer', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
        Add Message
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 16 }}>
        <DataGrid 
          rows={messages} 
          columns={columns} 
          pageSize={5} 
          getRowId={(row) => row.id}
        />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Message' : 'Add Message'}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="heading1"
                  name="heading1"
                  label="Heading 1"
                  value={formik.values.heading1}
                  onChange={formik.handleChange}
                  error={formik.touched.heading1 && Boolean(formik.errors.heading1)}
                  helperText={formik.touched.heading1 && formik.errors.heading1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="heading2"
                  name="heading2"
                  label="Heading 2"
                  value={formik.values.heading2}
                  onChange={formik.handleChange}
                  error={formik.touched.heading2 && Boolean(formik.errors.heading2)}
                  helperText={formik.touched.heading2 && formik.errors.heading2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="writer"
                  name="writer"
                  label="Writer"
                  value={formik.values.writer}
                  onChange={formik.handleChange}
                  error={formik.touched.writer && Boolean(formik.errors.writer)}
                  helperText={formik.touched.writer && formik.errors.writer}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="imageUrl"
                  name="imageUrl"
                  label="Image URL"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                  helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="aboutAuthor"
                  name="aboutAuthor"
                  label="About Author"
                  multiline
                  rows={4}
                  value={formik.values.aboutAuthor}
                  onChange={formik.handleChange}
                  error={formik.touched.aboutAuthor && Boolean(formik.errors.aboutAuthor)}
                  helperText={formik.touched.aboutAuthor && formik.errors.aboutAuthor}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default MessageTable;
