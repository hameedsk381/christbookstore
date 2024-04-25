import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const EmptyCart = () => {
    const navigate = useNavigate();  // Hook for navigation

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              You have no items in the cart
            </Typography>
            <Typography variant="body1" gutterBottom>
                You can continue shopping or check out your cart.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={() => navigate('/')}  // Navigate to home page
            >
                Continue Shopping
            </Button>
        </Container>
    );
};

export default EmptyCart;
