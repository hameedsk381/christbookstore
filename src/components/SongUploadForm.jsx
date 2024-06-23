import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Snackbar, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';
import { songcategories } from '../data/categories';

const SongUploadForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      ragaam: '',
      taalam: '',
      chaaya: '',
      rachayitha: '',
      anuvaadam: '',
      paata: '',
      fileUrl: '',
      category: '',title:'',songNum:''
    },
    validationSchema: Yup.object({
      paata: Yup.string().required('పాట అవసరం'),
      category: Yup.string().required('కేటగిరీ అవసరం'),
      title:Yup.string().required('Please give the title'),songNum:Yup.string().required('Please give song Num')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${serverUrl}/uploadsong`, values);
        setSnackbarMessage('Song uploaded successfully');
        setOpenSnackbar(true);
        console.log(response.data);
      } catch (error) {
        setSnackbarMessage('Failed to upload song');
        setOpenSnackbar(true);
        console.error('Error uploading song:', error);
      }
    },
  });
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 2, p: 4, border: '1px solid #ddd', borderRadius: '8px' }}
      >
        <Typography mb={2} textTransform={'uppercase'} textAlign={'center'} variant="h4" component="h5" gutterBottom>
        Song Upload Form
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="songNum"
              name="songNum"
              label="Song Number"
              value={formik.values.songNum}
              onChange={formik.handleChange}
              variant="outlined"
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="ragaam"
              name="ragaam"
              label="రాగం"
              value={formik.values.ragaam}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="taalam"
              name="taalam"
              label="తాళం"
              value={formik.values.taalam}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="chaaya"
              name="chaaya"
              label="చాయ"
              value={formik.values.chaaya}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="rachayitha"
              name="rachayitha"
              label="రచయిత"
              value={formik.values.rachayitha}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="anuvaadam"
              name="anuvaadam"
              label="అనువాదం"
              value={formik.values.anuvaadam}
              onChange={formik.handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              id="paata"
              name="paata"
              value={formik.values.paata}
              onChange={(content) => formik.setFieldValue('paata', content)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.paata && formik.errors.paata && (
              <Typography color="error" variant="body2">
                {formik.errors.paata}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fileUrl"
              name="fileUrl"
              label="పాట URL"
              value={formik.values.fileUrl}
              onChange={formik.handleChange}
  
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              id="category"
              name="category"
              label="కేటగిరీ"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              variant="outlined"
            >
              {songcategories.map((option) => (
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
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SongUploadForm;
