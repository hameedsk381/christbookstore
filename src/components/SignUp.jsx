import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, CircularProgress, Snackbar, Alert, Avatar } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/registerActions';
import { validateCredentials } from '../utils/formValdation';
import { serverUrl } from '../apis/serverapi';
import logo from '../assets/logo2.jpeg'

function SignUp({handleSignup}) {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phoneNum: '' ,
        username:'',
     
    });
  
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateCredentials(userDetails);
        if (Object.keys(errors).length > 0) {
            setSnackbarMessage(Object.values(errors)[0]);
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }
setLoading(true);
        try {
            const { confirmPassword, ...userData } = userDetails;
            const response = await axios.post(`${serverUrl}/api/register`, userData);
            // Handle success
            handleSignup();
            console.log(response.data);
            
            setSnackbarMessage(response.data);
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setLoading(false);
        } catch (error) {
            // Handle error
            setSnackbarMessage(error.response ? error.response.data.message : 'Failed to register');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            setLoading(false);  // Stop loading
        }
    };
   
  
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar variant='square' src={logo} alt="Logo" sx={{ width: 56, height: 56 }} />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="username" // Added username field
                        label="Username" // Added username label
                        type="text" // Added username type
                        id="username" // Added username id
                        value={userDetails.username} // Added username value
                        onChange={handleChange} // Added username onChange
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={userDetails.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={userDetails.confirmPassword}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phoneNum" // Added phoneNum field
                        label="Phone Number" // Added phoneNum label
                        type="tel" // Added phoneNum type
                        id="phoneNum" // Added phoneNum id
                        value={userDetails.phoneNum} // Added phoneNum value
                        onChange={handleChange} // Added phoneNum onChange
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                    <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
