import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, IconButton, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Add, Remove, ShoppingBag } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SongCard from './SongCard';

const Bookcard = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const cartItems = useSelector(state => state.cart.items);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const isInCart = cartItems.some(item => item._id === product._id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ width: {xs:'100%',md:'50%'} }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={product.imageUrl}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" noWrap>
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {product.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {product.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between', padding: '8px' }}>
                    {!isInCart && (
                        <div>
                            <IconButton disabled={quantity === 1} size="small" variant="outlined" color="primary" onClick={handleDecreaseQuantity} sx={{ marginRight: '8px' }}>
                                <Remove />
                            </IconButton>
                            <Typography variant="body1" sx={{ display: 'inline', fontWeight: 'bold' }}>
                                {quantity}
                            </Typography>
                            <IconButton disabled={quantity >= product.stock} size="small" variant="outlined" color="primary" onClick={handleIncreaseQuantity} sx={{ marginLeft: '8px' }}>
                                <Add />
                            </IconButton>
                        </div>
                    )}
                    <Button
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                        onClick={handleAddToCart}
                        disabled={isInCart}
                        startIcon={<ShoppingBag />}
                    >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                </CardActions>
            </Card>
           
        </motion.div>
    );
};

export default Bookcard;
