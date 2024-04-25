import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardMedia, IconButton, Stack, Typography, Box } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { removeFromCart, updateCartQuantity } from '../redux/actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleAddQuantity = (itemId) => {
    dispatch(updateCartQuantity(itemId, item.quantity + 1));
  };

  const handleSubtractQuantity = (itemId) => {
    if(item.quantity > 1) {
      dispatch(updateCartQuantity(itemId, item.quantity - 1));
    }
  };

  return (
    <Card sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', padding: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 88, height: 88, objectFit: 'cover', borderRadius: '4px' }}
        image={item.imageUrl}
        alt={item.title}
      />
      <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${item.price}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ marginTop: 1 }}>
          <IconButton onClick={() => handleSubtractQuantity(item._id)} size="small">
            <Remove />
          </IconButton>
          <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton onClick={() => handleAddQuantity(item._id)} size="small">
            <Add />
          </IconButton>
        </Stack>
      </Box>
      <Box>
        <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Box>
      <IconButton onClick={() => handleRemoveItem(item._id)} size="large">
        <Delete />
      </IconButton>
    </Card>
  );
};

export default CartItem;
