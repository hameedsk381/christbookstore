import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsOfService = () => {
    return (
        <>
        <Navbar/>
        <Container component="main" maxWidth="md">
            <Paper elevation={0} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Terms of Service
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to our bookstore. By accessing our website and using our services, you agree to be bound by the following terms and conditions:
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Usage:</strong> All content provided on this site is for personal, non-commercial use. Users are prohibited from copying, reproducing, or modifying any content without explicit permission.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Account Registration:</strong> Users might be required to register an account to access certain features. You are responsible for maintaining the confidentiality of your account details.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Intellectual Property:</strong> The content published on this website, including texts, graphics, logos, and images, is owned by us or our partners and is protected by international copyright laws.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Termination:</strong> We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
                </Typography>
                <Typography variant="body1" paragraph>
                    These terms are effective unless and until terminated by either you or us. If you have any questions about these Terms, please contact us.
                </Typography>
            </Paper>
        </Container>
        <Footer/>
        </>
    );
};

export default TermsOfService;
