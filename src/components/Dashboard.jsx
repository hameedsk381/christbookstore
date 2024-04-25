import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Widget from './Widget';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Widget title="Total Sales" value="$20,000" icon={<AttachMoneyIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Widget title="Number of Orders" value="198" icon={<BookIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Widget title="New Customers" value="50" icon={<PeopleIcon />} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
