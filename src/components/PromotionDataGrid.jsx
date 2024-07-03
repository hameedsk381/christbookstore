import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';

const PromotionDataGrid = () => {
  const [promotions, setPromotions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState({ mobileImageUrl: '', desktopImageUrl: '', navigateUrl: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${serverUrl}/promotions`);
      setPromotions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch promotion data');
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentPromotion({ mobileImageUrl: '', desktopImageUrl: '', navigateUrl: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(`${serverUrl}/promotions/${currentPromotion._id}`, currentPromotion);
        setSnackbarMessage('Promotion updated successfully');
      } else {
        await axios.post(`${serverUrl}/addpromotion`, currentPromotion);
        setSnackbarMessage('Promotion added successfully');
      }
      fetchPromotions();
      handleClose();
      setSnackbarOpen(true);
    } catch (error) {
      setError('Failed to save promotion');
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (id) => {
    const promotion = promotions.find((p) => p._id === id);
    setCurrentPromotion(promotion);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverUrl}/promotions/${id}`);
      setSnackbarMessage('Promotion deleted successfully');
      fetchPromotions();
      setSnackbarOpen(true);
    } catch (error) {
      setError('Failed to delete promotion');
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'mobileImageUrl', headerName: 'Mobile Image URL', flex: 1 },
    { field: 'desktopImageUrl', headerName: 'Desktop Image URL', flex: 1 },
    { field: 'navigateUrl', headerName: 'Navigate URL', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row._id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 400, width: '100%', mt: 4 }}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen} sx={{ mb: 2 }}>
          Add Promotion
        </Button>
        <DataGrid
          rows={promotions || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
          loading={loading}
          error={error}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Promotion' : 'Add Promotion'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="mobileImageUrl"
            label="Mobile Image URL"
            type="text"
            fullWidth
            value={currentPromotion.mobileImageUrl}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="desktopImageUrl"
            label="Desktop Image URL"
            type="text"
            fullWidth
            value={currentPromotion.desktopImageUrl}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="navigateUrl"
            label="Navigate URL"
            type="text"
            fullWidth
            value={currentPromotion.navigateUrl}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={error ? 'error' : 'success'}>
          {error || snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PromotionDataGrid;
