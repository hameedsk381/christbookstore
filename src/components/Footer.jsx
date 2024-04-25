import React from 'react';
import { Box, Grid, Typography,  Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Learn more about our company and our mission to provide the best service.
                        </Typography>
                        <Link href="/about" color="primary">
                            Learn More
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Have any questions? Reach out to us at:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: contact@example.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link to="/terms" color="primary" display="block">
                            Terms of Service
                        </Link>
                        <br />
                        <Link to="/privacy" color="primary" display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
