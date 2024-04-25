import React from 'react';
import { Typography, Button } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../apis/serverapi';
import axios from 'axios';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useQuery(['product', id], async () => {
        const response = await axios.get(`${serverUrl}/products/${id}`);
        return response.data;
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '300px', marginBottom: '20px' }} />
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>Author: {product.author}</Typography>
            <Typography variant="body1" gutterBottom>{product.description}</Typography>
            <Typography variant="h5" gutterBottom>Price: ${product.price}</Typography>
            <Button variant="contained" color="primary">Add to Cart</Button>
        </div>
    );
};

export default ProductDetailsPage;
