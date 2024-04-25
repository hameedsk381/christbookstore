import React from 'react';
import { Box, Grid, Typography,  Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'secondary.main', py: 6 }}>
            <Container maxWidth="lg" sx={{color:'whitesmoke'}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" >
                            Learn more about our company and our mission to provide the best service.
                        </Typography>
                        <Link style={{color:'indigo'}} to="/about" >
                            Learn More
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" >
                            Have any questions? Reach out to us at:
                        </Typography>
                        <Typography variant="body2" >
                            Email: contact@example.com
                        </Typography>
                        <Typography variant="body2" >
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link style={{color:'indigo'}} to="/terms"  display="block">
                            Terms of Service
                        </Link>
                        <br />
                        <Link style={{color:'indigo'}} to="/privacy"  display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
