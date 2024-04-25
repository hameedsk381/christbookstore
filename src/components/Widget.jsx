import React from 'react';
import { Card, CardContent, Typography, Grid, Icon } from '@mui/material';

const Widget = ({ title, value, icon }) => {
  return (
    <Card sx={{ minWidth: 100, boxShadow: 3 }}>
      <CardContent>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Typography color="text.secondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Icon sx={{ fontSize: 40 }}>
              {icon}
            </Icon>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Widget;
