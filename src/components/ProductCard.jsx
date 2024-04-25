import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Add, Remove, ShoppingBag } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
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

    // Check if the product is already in the cart
    const isInCart = cartItems.some(item => item._id === product._id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={product.imageUrl}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {product.price}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                            Stock: {product.stock}
                        </Typography> */}
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
                  {!isInCart &&   <div>
                        <IconButton disabled={quantity === 1} size="small" variant="outlined" color="primary" onClick={handleDecreaseQuantity} sx={{ marginRight: '8px' }}><Remove /></IconButton>
                        <Typography variant="body1" sx={{ display: 'inline', fontWeight: 'bold' }}>{quantity}</Typography>
                        <IconButton disabled={quantity >= product.stock} size="small" variant="outlined" color="primary" onClick={handleIncreaseQuantity} sx={{ marginLeft: '8px' }}><Add /></IconButton>
                    </div>}
                    <Button
    size="small"
    color="primary"
    sx={{ fontWeight: 'bold' }}
    onClick={handleAddToCart}
    disabled={isInCart} // Disable the button if the product is already in the cart
    startIcon={<ShoppingBag/>}
>
    {isInCart ? 'Added to Cart' : 'Add to Cart'}
</Button>

                </CardActions>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
