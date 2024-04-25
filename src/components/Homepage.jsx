import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductGrid from './ProductGrid';
import Navbar from './Navbar';

function HomePage() {
    return (
        <>
       
         <Box mt={4} px={'5%'}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to our Bookstore
            </Typography>
            <Typography mb={4} variant="body1" align="center" gutterBottom>
                Discover a wide range of books for every reader.
            </Typography>
            <ProductGrid />
        </Box>
        </>
        
    );
}

export default HomePage;
