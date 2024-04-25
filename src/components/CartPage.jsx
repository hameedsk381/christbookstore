import React from 'react';
import { Typography, Button, Grid, Card, CardMedia, CardContent, Box, Stack, Alert, IconButton } from '@mui/material';
import { removeFromCart } from '../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Delete, Remove } from '@mui/icons-material';
import CartItem from './CartItem';


function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
   
  
    return (
        <div>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
       { cartItems.length === 0 &&
   <Alert severity='info'>No items in the cart</Alert>
}
<Grid container  spacing={4} my={3}>
    {cartItems.map((item) => (
         <Grid item xs={12} sm={4} key={item._id} >
       <CartItem item={item}/>
        </Grid>
    ))}
      </Grid>
        </div>
    );
}

export default CartPage;
