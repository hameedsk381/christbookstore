// ShippingForm.js
import React from 'react';
import { Typography, TextField, Grid, Container, Stack } from '@mui/material';
import OrderSummary from './OrderSummary';

const ShippingForm = ({ formData, handleChange }) => {
 

    return (
         <Container sx={{my:10}}>
               <Grid container spacing={4} direction={'column'}>
      
             
      <Grid item xs={12} md={6}>
      <Container component={'form'} maxWidth='sm'>
        <Typography variant='h4' textAlign={'center'} my={2}>Shipping Details</Typography>
      <TextField size='small' sx={{mb:1}}
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
          />
     
      
          <TextField size='small' sx={{my:1}}
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
          />
          <TextField size='small' sx={{my:1}}
              fullWidth
              label="Phone Number"
              name="phoneNum"
              type="text"
              value={formData.phoneNum}
              onChange={handleChange}
              required
          />
      
          <TextField
              size='small'
              sx={{my:1}}
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={4}
          />
     
      
          <TextField size='small' sx={{my:1}}
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
          />
     
      
          <TextField size='small' sx={{my:1}}
              fullWidth
              label="ZIP Code"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
          />
     
      </Container>
      </Grid>
          
      <Grid item xs={12} md={6}>
        <OrderSummary/>
      </Grid>


</Grid>
         </Container>
    );
};

export default ShippingForm;

