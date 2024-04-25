import React from 'react';
import initiatePaytmTransaction from './PaytmPayment';
import { Button, Typography } from '@mui/material';
import OrderSummary from './OrderSummary';

const PaymentForm = () => {
    const handlePayment = () => {
        initiatePaytmTransaction('ORDERID_12345', '100', 'https://example.com/paytm_callback')
            .then(response => {
                console.log('Transaction response:', response);
                // Handle the response
            })
            .catch(error => {
                console.error('Error initiating transaction:', error);
                // Handle the error
            });
    };

    return (
        <div>
           <Typography>We are onl accepting cash payments for now </Typography>
           <Button>Place the order</Button>
        </div>
    );
};

export default PaymentForm;

