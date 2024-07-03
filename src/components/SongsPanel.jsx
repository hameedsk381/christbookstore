import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  MenuItem,
  Grid,
  Stack,
  CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { serverUrl } from '../apis/serverapi';
import { songcategories } from '../data/categories';
import Loader from './Loader';

const SongPanel = () => {
  const [songs, setSongs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingSong, setEditingSong] = useState(null);
  const [loading, setLoading] = useState(false); // Added state for loader

  const fetchSongs = async () => {
    setLoading(true); // Start loader
    try {
      const response = await axios.get(`${serverUrl}/songs`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleEdit = (song) => {
    setEditingSong(song);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loader
    try {
      await axios.delete(`${serverUrl}/songs/${id}`);
      setSnackbarMessage('Song deleted successfully');
      setOpenSnackbar(true);
      fetchSongs(); // Fetch songs again to update the list
    } catch (error) {
      setSnackbarMessage('Failed to delete song');
      setOpenSnackbar(true);
      console.error('Error deleting song:', error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingSong(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      ragaam: '',
      taalam: '',
      chaaya: '',
      rachayitha: '',
      anuvaadam: '',
      paata: '',
      fileUrl: '',
      category: '',
      title: '',
      songNum: ''
    },
    validationSchema: Yup.object({
      paata: Yup.string().required('పాట అవసరం'),
      category: Yup.string().required('కేటగిరీ అవసరం'),
      title: Yup.string().required('Please give the title'),
      songNum: Yup.string().required('Please give song Num')
    }),
    onSubmit: async (values) => {
      setLoading(true); // Start loader
      try {
        if (editingSong) {
          await axios.put(`${serverUrl}/songs/${editingSong._id}`, values);
          setSnackbarMessage('Song updated successfully');
        } else {
          await axios.post(`${serverUrl}/uploadsong`, values);
          setSnackbarMessage('Song uploaded successfully');
        }
        setOpenSnackbar(true);
        fetchSongs(); // Fetch songs again to update the list
        handleDialogClose();
      } catch (error) {
        setSnackbarMessage(editingSong ? 'Failed to update song' : 'Failed to upload song');
        setOpenSnackbar(true);
        console.error('Error uploading song:', error);
      } finally {
        setLoading(false); // Stop loader
      }
    },
  });

  useEffect(() => {
    if (editingSong) {
      formik.setValues({
        ragaam: editingSong.ragaam,
        taalam: editingSong.taalam,
        chaaya: editingSong.chaaya,
        rachayitha: editingSong.rachayitha,
        anuvaadam: editingSong.anuvaadam,
        paata: editingSong.paata,
        fileUrl: editingSong.fileUrl,
        category: editingSong.category,
        title: editingSong.title,
        songNum: editingSong.songNum
      });
    } else {
      formik.resetForm();
    }
  }, [editingSong]);

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'songNum', headerName: 'Song Number', width: 120 },
    { field: 'ragaam', headerName: 'Ragaam', width: 150 },
    { field: 'taalam', headerName: 'Taalam', width: 150 },
    { field: 'chaaya', headerName: 'Chaaya', width: 150 },
    { field: 'rachayitha', headerName: 'Rachayitha', width: 150 },
    { field: 'anuvaadam', headerName: 'Anuvaadam', width: 150 },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Stack direction={'row'} spacing={2}>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
        </Stack>
      )
    }
  ];

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Songs Management
      </Typography>
     
    {!loading && 
    
    <>
     <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add New Song
      </Button>
      <Box mt={2}>
        <DataGrid
          rows={songs}
          columns={columns}
          pageSize={10}
          autoHeight
          getRowId={(row) => row._id} // Specify a custom id for each row
        />
      </Box>
    </>}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingSong ? 'Edit Song' : 'Add New Song'}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
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
                  type="number"
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
                <TextField
                  fullWidth
                  id="paata"
                  name="paata"
                  label="పాట"
                  value={formik.values.paata}
                  onChange={formik.handleChange}
                  variant="outlined"
                  multiline
                  rows={6}
                  error={formik.touched.paata && Boolean(formik.errors.paata)}
                  helperText={formik.touched.paata && formik.errors.paata}
                />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Loader/>
        </Box>
      )}
    </Container>
  );
};

export default SongPanel;
