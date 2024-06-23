import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';

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
    },
    validationSchema: Yup.object({
      paata: Yup.string().required('పాట అవసరం')
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
        sx={{ mt: 4, p: 4, border: '1px solid #ddd', borderRadius: '8px' }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          పాటను అప్లోడ్ చేయండి
        </Typography>
        <Grid container spacing={2}>
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
            <Button color="primary" variant="contained" fullWidth type="submit">
              సమర్పించు
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
