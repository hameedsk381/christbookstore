import React from 'react';
import { Typography, Box, Container, Paper, Grid, Link } from '@mui/material';

const AboutUs = () => {
    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={6} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to our Christian Bookstore, a treasure trove of exclusive Christian literature in the Telugu language. Our mission is to provide access to the rich spiritual heritage encapsulated in Christian writings to the Telugu-speaking community.
                </Typography>
                <Typography variant="body1" paragraph>
                    Founded in [Year], our bookstore has always been driven by a commitment to serve our community by making Christian teachings more accessible. We believe in the transformative power of these texts and their ability to inspire and guide.
                </Typography>
                <Typography variant="body1" paragraph>
                    We offer a wide range of products including bibles, spiritual commentaries, daily devotionals, and much more. Each book is selected to enrich, educate, and inspire our customers.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h3">
                            Our Vision
                        </Typography>
                        <Typography variant="body1">
                            To be the leading source of Christian literature in Telugu, fostering a deeper understanding and appreciation of the Christian faith among the Telugu-speaking population.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="h3">
                            Our Values
                        </Typography>
                        <Typography variant="body1">
                            Integrity, Respect, and Faith. We operate with integrity, respect our customers' needs, and uphold the Christian faith in all our dealings.
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    If you have questions or need guidance on what might best suit your spiritual journey, please <Link href="/contact">contact us</Link>. We are here to help.
                </Typography>
            </Paper>
        </Container>
    );
};

export default AboutUs;
