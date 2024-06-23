import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Snackbar, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';

const categories = ['Sunday School', 'Ideas', 'Narrative Sermons', 'Textual Sermons', 'Expository','Topical Sermons','Summaries','Biographies','Jokes','Column'];

const MessageForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      heading1: '',
      heading2: '',
      writer: '',
      imageUrl: '',
      description: '',
      aboutAuthor: '',
      category: '',
    },
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
        const response = await axios.post(`${serverUrl}/messages`, values);
        setSnackbarMessage('Message created successfully');
        setOpenSnackbar(true);
        console.log(response.data);
      } catch (error) {
        setSnackbarMessage('Failed to create message');
        setOpenSnackbar(true);
        console.error('Error creating message:', error);
      }
    },
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Typography mb={2} variant="h4" textAlign={'center'} component="h1" gutterBottom>
        Create Message
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
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
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default MessageForm;
