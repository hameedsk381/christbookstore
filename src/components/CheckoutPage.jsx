import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Container, Box, Snackbar, Alert, CircularProgress } from '@mui/material';

import ShippingForm from './ShippingForm';
import Navbar from './Navbar';
import { placeOrder } from '../redux/actions/orderActions.js';
import { validateForm } from '../utils/formValdation.js';
import EmptyCart from './EmptyCart.jsx';



const initialState = {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'cash',
    phoneNum: ''
};

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const [shippingDetails, setShippingDetails] = useState(initialState);
    const { loading } = useSelector(state => state.order);
    const {userId} = useSelector(state=>state.auth.user);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationResult = validateForm(shippingDetails);
        if (!validationResult.formIsValid) {
            setNotification({
                open: true,
                message: Object.values(validationResult.errors).join(' '),
                severity: 'error'
            });
            return;
        }
        
        dispatch(placeOrder(shippingDetails, cartItems, total,userId))
            .then(() => {
                setNotification({
                    open: true,
                    message: 'Order placed successfully!',
                    severity: 'success'
                });
                // Reset form or other state adjustments
            })
            .catch(error => {
                setNotification({
                    open: true,
                    message: error.message || 'Failed to place the order.',
                    severity: 'error'
                });
            });
    };

    const handleCloseSnackbar = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <>
            <Navbar />
            {cartItems.length === 0 ? <EmptyCart/> :  <Container sx={{ my: 5 }}>
                {loading && (
                    <Box display="flex" justifyContent="center" my={5}>
                        <CircularProgress />
                    </Box>
                )}
              
                <Typography variant="h4" my={3} gutterBottom>Checkout</Typography>
                <ShippingForm formData={shippingDetails} handleChange={handleChange} />
                <Container maxWidth='sm'>
                    <Box mt={3}>
                        <Button variant="contained" fullWidth onClick={handleSubmit}>
                            Place Order
                        </Button>
                    </Box>
                    <Box mt={2} textAlign="center">
                        <Typography variant="caption" display="block" gutterBottom>
                            By placing an order, you accept our Terms and Conditions of Use, our Terms and Conditions of Sale, and our Data Protection Policy.
                        </Typography>
                    </Box>
                </Container>
            </Container>}
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleCloseSnackbar} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
        </>
    );
};

export default CheckoutPage;
