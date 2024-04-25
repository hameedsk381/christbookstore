import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={6} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Information Collection and Use:</strong> We collect information only insofar as is necessary or appropriate to fulfill the purpose of the visitor’s interaction with us. We do not share personally identifying information publicly or with third-parties, except when required to by law.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Security:</strong> The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Cookies:</strong> We use "cookies" to collect information about visitors and visits to our websites. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </Typography>
                <Typography variant="body1" paragraph>
                    Our Privacy Policy is effective as of (date), and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions about our Privacy Practices or this Policy, please contact us.
                </Typography>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy;
