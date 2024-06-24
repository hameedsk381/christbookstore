import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, CircularProgress, Alert, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoginError, loginUser } from '../redux/actions/authActions';
import logo from '../assets/logo2.jpeg'
function Login({handleLogin}) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { loading, error, isLoggedIn } = useSelector(state => ({
        loading: state.auth.loading,
        error: state.auth.loginError,
        isLoggedIn: state.auth.isLoggedIn
    }));
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (isLoggedIn) {
            handleLogin(); // Close dialog on successful login
        }
    }, [isLoggedIn, handleLogin]);
    useEffect(() => {
        return () => {
            dispatch(clearLoginError());
        };
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(credentials));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar variant='square' src={logo} alt="Logo" sx={{ width: 56, height: 56 }} />
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
