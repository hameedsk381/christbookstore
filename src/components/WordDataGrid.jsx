import React, { useState, useEffect } from 'react';
import { Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from './Loader';
import { DataGrid } from '@mui/x-data-grid';

const WordDataGrid = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchWords = async () => {
    try {
      const response = await axios.get(`${serverUrl}/words`);
      setWords(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching words:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/words/${id}`);
      setWords(words.filter(word => word._id !== id));
      setSnackbarMessage('Word deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting word:', error);
      setSnackbarMessage('Failed to delete word');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDialogOpen = (word = null) => {
    setCurrentWord(word);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentWord(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      heading: '',
      content: '',
      date: '',
      imageUrl: '',
    },
    validationSchema: Yup.object({
      heading: Yup.string().required('Required'),
      content: Yup.string().required('Required'),
      date: Yup.date().required('Required'),
      imageUrl: Yup.string().url('Invalid URL'),
    }),
    onSubmit: async (values) => {
      try {
        if (currentWord) {
          await axios.put(`${serverUrl}/words/${currentWord._id}`, values);
          setWords(words.map(word => (word._id === currentWord._id ? { ...word, ...values } : word)));
          setSnackbarMessage('Word updated successfully');
        } else {
          const response = await axios.post(`${serverUrl}/words`, values);
          setWords([...words, response.data]);
          setSnackbarMessage('Word created successfully');
        }
        setSnackbarOpen(true);
        handleDialogClose();
      } catch (error) {
        console.error('Error saving word:', error);
        setSnackbarMessage('Failed to save word');
        setSnackbarOpen(true);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (currentWord) {
      formik.setValues(currentWord);
    } else {
      formik.resetForm();
    }
  }, [currentWord]);

  const columns = [
    { field: 'heading', headerName: 'Heading', width: 200 },
    { field: 'content', headerName: 'Content', width: 400 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDialogOpen(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  if (isLoading) return <Loader />;
  if (isError) return <Alert severity="error">Error fetching data</Alert>;

  return (
    <Container>
      <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => handleDialogOpen(null)} sx={{ mb: 2 }}>
        Add Word
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={words} columns={columns} getRowId={(row) => row._id} />
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{currentWord ? 'Edit Word' : 'Add Word'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              id="heading"
              name="heading"
              label="Heading"
              value={formik.values.heading}
              onChange={formik.handleChange}
              error={formik.touched.heading && Boolean(formik.errors.heading)}
              helperText={formik.touched.heading && formik.errors.heading}
            />
            <TextField
              fullWidth
              margin="dense"
              id="content"
              name="content"
              label="Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <TextField
              fullWidth
              margin="dense"
              id="date"
              name="date"
              label="Date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="dense"
              id="imageUrl"
              name="imageUrl"
              label="Image URL"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {currentWord ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default WordDataGrid;
